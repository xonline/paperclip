export const type = "nvidia_nim";
export const label = "NVIDIA NIM (direct API)";

export const DEFAULT_NVIDIA_NIM_MODEL = "minimaxai/minimax-m2.7";
export const DEFAULT_NVIDIA_NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";

export const models: Array<{ id: string; label: string }> = [
  { id: "minimaxai/minimax-m2.7", label: "MiniMax M2.7" },
  { id: "meta/llama-3.3-70b-instruct", label: "Llama 3.3 70B Instruct" },
  { id: "nvidia/llama-3.1-nemotron-ultra-253b-v1", label: "Nemotron Ultra 253B" },
  { id: "mistralai/mistral-large-2-instruct", label: "Mistral Large 2" },
];

export const agentConfigurationDoc = `# nvidia_nim agent configuration

Adapter: nvidia_nim

Calls NVIDIA NIM's OpenAI-compatible API directly — no CLI dependency required.
Best for text generation, analysis, planning, and writing tasks.

Note: This adapter makes a single LLM call per run. It does not support
multi-turn tool use or agentic file operations. For agents that need to
read/write files or run shell commands, use opencode_local or claude_local instead.

Core fields:
- apiKey (string, required): NVIDIA NIM API key (nvapi-...). Use secret reference: {{secrets.NVIDIA_API_KEY}}
- model (string, optional): Model ID (default: minimaxai/minimax-m2.7). See https://build.nvidia.com for available models.
- baseUrl (string, optional): API base URL (default: https://integrate.api.nvidia.com/v1)
- maxTokens (number, optional): Maximum output tokens (default: 4096)
- temperature (number, optional): Sampling temperature 0–1 (default: 0.7)
- systemPrompt (string, optional): System prompt override
- promptTemplate (string, optional): Run prompt template

Operational fields:
- timeoutSec (number, optional): Request timeout in seconds (default: 120)
`;
