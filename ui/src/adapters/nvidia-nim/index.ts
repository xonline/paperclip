import type { UIAdapterModule } from "../types";
import { SchemaConfigFields, buildSchemaAdapterConfig } from "../schema-config-fields";
import { processUIAdapter } from "../process";

export const nvidiaNimUIAdapter: UIAdapterModule = {
  type: "nvidia_nim",
  label: "NVIDIA NIM",
  parseStdoutLine: processUIAdapter.parseStdoutLine,
  ConfigFields: SchemaConfigFields,
  buildAdapterConfig: buildSchemaAdapterConfig,
};
