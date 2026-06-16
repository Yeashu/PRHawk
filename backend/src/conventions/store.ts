import { promises as fs } from "node:fs";
import path from "node:path";
import { config } from "../config.js";
import type { ConventionRule } from "../types.js";

export async function loadConventions(): Promise<ConventionRule[]> {
  try {
    const raw = await fs.readFile(config.conventionsPath, "utf-8");
    const parsed = JSON.parse(raw) as { rules?: ConventionRule[] };
    return parsed.rules ?? [];
  } catch {
    return [];
  }
}

export async function saveCoventions(rules: ConventionRule[]): Promise<void> {
  await fs.mkdir(path.dirname(config.conventionsPath), { recursive: true });
  await fs.writeFile(
    config.conventionsPath,
    JSON.stringify({ rules }, null, 2),
    "utf-8",
  );
}
