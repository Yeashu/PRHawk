import type { ParsedFile } from "../types.js";

const headers = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

export function parsePatch(
  path: string,
  patch: string | undefined,
): ParsedFile {
  const addedLines: number[] = [];

  if (!patch) {
    return { path, patch: "", addedLines};
  }

  let newLine = 0;

  for (const line of patch.split("\n")) {
    if (line === "") continue;
    if (line.startsWith("\\")) continue;

    const header = line.match(headers);
    if(header) { 
        newLine = parseInt(header[1] ,10);
        continue;
    }

    if(line.startsWith("+")){
        addedLines.push(newLine)
        newLine++;
    }
    else if(!line.startsWith("-")){
        newLine++;
    }
  }
  return {path , patch , addedLines}
}
