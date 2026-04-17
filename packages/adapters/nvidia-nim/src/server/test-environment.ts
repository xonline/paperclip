import {
  type AdapterEnvironmentTestContext,
  type AdapterEnvironmentTestResult,
} from "@paperclipai/adapter-utils";
import { asString } from "@paperclipai/adapter-utils/server-utils";
import { DEFAULT_NVIDIA_NIM_BASE_URL, DEFAULT_NVIDIA_NIM_MODEL } from "../index.js";

export async function testEnvironment(
  ctx: AdapterEnvironmentTestContext,
): Promise<AdapterEnvironmentTestResult> {
  const { config } = ctx;
  const apiKey = asString(config.apiKey, "").trim();
  const baseUrl = asString(config.baseUrl, DEFAULT_NVIDIA_NIM_BASE_URL).trim().replace(/\/$/, "");
  const model = asString(config.model, DEFAULT_NVIDIA_NIM_MODEL).trim();

  const checks: AdapterEnvironmentTestResult["checks"] = [];

  if (!apiKey) {
    checks.push({
      code: "nvidia_nim_api_key_missing",
      level: "error",
      message: "NVIDIA NIM API key is not configured.",
      hint: "Set apiKey in the agent config. Get a free key at https://build.nvidia.com",
    });
    return { adapterType: "nvidia_nim", status: "fail", checks, testedAt: new Date().toISOString() };
  }

  checks.push({
    code: "nvidia_nim_api_key_present",
    level: "info",
    message: "API key is configured.",
  });

  try {
    const response = await fetch(`${baseUrl}/models`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      checks.push({
        code: "nvidia_nim_api_reachable",
        level: "info",
        message: `NVIDIA NIM API is reachable at ${baseUrl}. Model: ${model}`,
      });
    } else {
      checks.push({
        code: "nvidia_nim_api_auth_failed",
        level: "error",
        message: `NVIDIA NIM API returned HTTP ${response.status}.`,
        hint: "Check that your API key is valid and not expired.",
      });
      return { adapterType: "nvidia_nim", status: "fail", checks, testedAt: new Date().toISOString() };
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    checks.push({
      code: "nvidia_nim_api_unreachable",
      level: "error",
      message: `Could not reach NVIDIA NIM API: ${msg}`,
      hint: "Check network connectivity to integrate.api.nvidia.com",
    });
    return { adapterType: "nvidia_nim", status: "fail", checks, testedAt: new Date().toISOString() };
  }

  return { adapterType: "nvidia_nim", status: "pass", checks, testedAt: new Date().toISOString() };
}
