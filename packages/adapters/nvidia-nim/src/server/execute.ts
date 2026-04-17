import {
  type AdapterExecutionContext,
  type AdapterExecutionResult,
} from "@paperclipai/adapter-utils";
import {
  asString,
  asNumber,
  parseObject,
  buildPaperclipEnv,
  renderTemplate,
  renderPaperclipWakePrompt,
  joinPromptSections,
  stringifyPaperclipWakePayload,
} from "@paperclipai/adapter-utils/server-utils";
import { DEFAULT_NVIDIA_NIM_BASE_URL, DEFAULT_NVIDIA_NIM_MODEL } from "../index.js";

interface NimChoice {
  message?: { content?: string | null };
  finish_reason?: string | null;
}

interface NimUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
}

interface NimResponse {
  choices?: NimChoice[];
  usage?: NimUsage;
  error?: { message?: string };
}

export async function execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
  const { runId, agent, runtime, config, context, onLog, onMeta, authToken } = ctx;

  const apiKey = (asString(config.apiKey, "") || process.env.NVIDIA_NIM_API_KEY || "").trim();
  const model = asString(config.model, DEFAULT_NVIDIA_NIM_MODEL).trim();
  const baseUrl = asString(config.baseUrl, DEFAULT_NVIDIA_NIM_BASE_URL).trim().replace(/\/$/, "");
  const maxTokens = asNumber(config.maxTokens, 4096);
  const temperature = asNumber(config.temperature, 0.7);
  const timeoutSec = asNumber(config.timeoutSec, 120);
  const promptTemplate = asString(
    config.promptTemplate,
    "You are agent {{agent.id}} ({{agent.name}}). Continue your Paperclip work.",
  );
  const systemPromptOverride = asString(config.systemPrompt, "").trim();

  if (!apiKey) {
    return {
      exitCode: 1,
      signal: null,
      timedOut: false,
      errorMessage: "nvidia_nim: apiKey is required. Set it in the agent config as {{secrets.NVIDIA_API_KEY}}.",
    };
  }

  const workspaceContext = parseObject(context.paperclipWorkspace);
  const wakePayloadJson = stringifyPaperclipWakePayload(context.paperclipWake);
  const wakeReason =
    typeof context.wakeReason === "string" && context.wakeReason.trim().length > 0
      ? context.wakeReason.trim()
      : null;

  const templateData = {
    agentId: agent.id,
    companyId: agent.companyId,
    runId,
    company: { id: agent.companyId },
    agent,
    run: { id: runId, source: "on_demand" },
    context,
  };

  const bootstrapPromptTemplate = asString(config.bootstrapPromptTemplate, "");
  const hasSession = Boolean(runtime.sessionParams);
  const wakePrompt = renderPaperclipWakePrompt(context.paperclipWake, { resumedSession: hasSession });
  const sessionHandoffNote = asString(context.paperclipSessionHandoffMarkdown, "").trim();
  const renderedBootstrapPrompt =
    !hasSession && bootstrapPromptTemplate.trim().length > 0
      ? renderTemplate(bootstrapPromptTemplate, templateData).trim()
      : "";
  const renderedPrompt =
    wakePrompt.length > 0 && hasSession ? "" : renderTemplate(promptTemplate, templateData);

  const userPrompt = joinPromptSections([
    renderedBootstrapPrompt,
    wakePrompt,
    sessionHandoffNote,
    renderedPrompt,
  ]);

  const systemPrompt =
    systemPromptOverride ||
    `You are ${agent.name}, an AI agent running inside the Paperclip platform. ` +
    `Company ID: ${agent.companyId}. Agent ID: ${agent.id}. ` +
    `Run ID: ${runId}. ` +
    (wakeReason ? `Wake reason: ${wakeReason}. ` : "") +
    "Complete the task described by the user. Be thorough and practical.";

  const endpoint = `${baseUrl}/chat/completions`;

  if (onMeta) {
    await onMeta({
      adapterType: "nvidia_nim",
      command: endpoint,
      commandNotes: [`model: ${model}`, `maxTokens: ${maxTokens}`, `temperature: ${temperature}`],
      prompt: userPrompt,
      promptMetrics: {
        promptChars: userPrompt.length,
        systemPromptChars: systemPrompt.length,
      },
      context,
    });
  }

  await onLog("stdout", `[nvidia_nim] Calling ${model} at ${baseUrl}\n`);

  const controller = new AbortController();
  const timeoutHandle = timeoutSec > 0
    ? setTimeout(() => controller.abort(), timeoutSec * 1000)
    : null;

  let nimResponse: NimResponse;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (timeoutHandle) clearTimeout(timeoutHandle);

    nimResponse = await response.json() as NimResponse;

    if (!response.ok) {
      const errMsg = nimResponse.error?.message ?? `HTTP ${response.status}`;
      await onLog("stderr", `[nvidia_nim] API error: ${errMsg}\n`);
      return {
        exitCode: 1,
        signal: null,
        timedOut: false,
        errorMessage: `nvidia_nim API error: ${errMsg}`,
      };
    }
  } catch (err) {
    if (timeoutHandle) clearTimeout(timeoutHandle);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    if (isTimeout) {
      return { exitCode: null, signal: null, timedOut: true, errorMessage: `Timed out after ${timeoutSec}s` };
    }
    const msg = err instanceof Error ? err.message : String(err);
    await onLog("stderr", `[nvidia_nim] Fetch error: ${msg}\n`);
    return { exitCode: 1, signal: null, timedOut: false, errorMessage: `nvidia_nim fetch error: ${msg}` };
  }

  const content = nimResponse.choices?.[0]?.message?.content ?? "";
  const inputTokens = nimResponse.usage?.prompt_tokens ?? 0;
  const outputTokens = nimResponse.usage?.completion_tokens ?? 0;

  await onLog("stdout", content + "\n");
  await onLog("stdout", `\n[nvidia_nim] Done. Input tokens: ${inputTokens}, Output tokens: ${outputTokens}\n`);

  return {
    exitCode: 0,
    signal: null,
    timedOut: false,
    usage: { inputTokens, outputTokens },
    provider: "minimaxai",
    biller: "nvidia_nim",
    model,
    billingType: "credits",
    summary: content.slice(0, 500) || undefined,
    resultJson: {
      content,
      usage: nimResponse.usage ?? null,
    },
  };
}
