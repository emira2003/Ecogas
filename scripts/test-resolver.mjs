import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

const srcDir = resolvePath(dirname(fileURLToPath(import.meta.url)), "../src");

const withExtension = (filePath) => {
  for (const candidate of [filePath, `${filePath}.ts`, `${filePath}.tsx`, resolvePath(filePath, "index.ts")]) {
    if (existsSync(candidate) && !candidate.endsWith("/")) return candidate;
  }
  return null;
};

export async function resolve(specifier, context, next) {
  let filePath = null;
  if (specifier.startsWith("@/")) {
    filePath = resolvePath(srcDir, specifier.slice(2));
  } else if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    filePath = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier);
  }
  if (filePath) {
    const found = withExtension(filePath);
    if (found) return next(pathToFileURL(found).href, context);
  }
  return next(specifier, context);
}
