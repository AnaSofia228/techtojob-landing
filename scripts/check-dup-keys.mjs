/**
 * Detector de claves de objeto duplicadas en los JSON del repositorio.
 *
 * Motivo: `JSON.parse` acepta claves duplicadas y se queda con la última en
 * silencio; ni `tsc` ni `eslint` revisan los `.json`, así que solo el editor
 * las marcaba. Este script las caza e imprime su número de línea.
 *
 * Uso: `npm run check:json` → sale con código 1 si hay duplicados.
 * Cero dependencias: usa solo módulos nativos de Node.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const IGNORED_DIRS = new Set(["node_modules", ".next", ".git"]);
const IGNORED_FILES = new Set(["package-lock.json"]);

/** Recopila los ficheros .json del repo (sin dependencias ni build). */
function listJsonFiles(dir, rel = "") {
  const files = [];
  for (const name of fs.readdirSync(path.join(dir, rel))) {
    if (IGNORED_DIRS.has(name)) continue;
    const relPath = rel ? `${rel}/${name}` : name;
    if (fs.statSync(path.join(dir, relPath)).isDirectory()) {
      files.push(...listJsonFiles(dir, relPath));
    } else if (name.endsWith(".json") && !IGNORED_FILES.has(name)) {
      files.push(relPath);
    }
  }
  return files;
}

/** Devuelve las claves duplicadas del fichero con su línea de aparición. */
function findDuplicates(file) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const stack = [];
  const dup = [];
  let i = 0;
  let line = 1;

  while (i < src.length) {
    const ch = src[i];
    if (ch === "\n") {
      line += 1;
      i += 1;
      continue;
    }
    if (ch === '"') {
      const startLine = line;
      let j = i + 1;
      let str = "";
      while (j < src.length) {
        if (src[j] === "\\") {
          str += src[j + 1];
          j += 2;
          continue;
        }
        if (src[j] === '"') break;
        if (src[j] === "\n") line += 1;
        str += src[j];
        j += 1;
      }
      let k = j + 1;
      while (k < src.length && /[ \t\r\n]/.test(src[k])) k += 1;
      const top = stack[stack.length - 1];
      if (src[k] === ":" && top && top.type === "object") {
        if (top.keys.has(str)) {
          dup.push(`${file}:${startLine} -> clave duplicada "${str}"`);
        }
        top.keys.add(str);
      }
      i = j + 1;
      continue;
    }
    if (ch === "{") {
      stack.push({ type: "object", keys: new Set() });
      i += 1;
      continue;
    }
    if (ch === "[") {
      stack.push({ type: "array", keys: new Set() });
      i += 1;
      continue;
    }
    if (ch === "}" || ch === "]") {
      stack.pop();
      i += 1;
      continue;
    }
    i += 1;
  }
  return dup;
}

const files = listJsonFiles(ROOT).sort();
let total = 0;
for (const file of files) {
  const dup = findDuplicates(file);
  if (dup.length === 0) {
    console.log(`OK   ${file}`);
  } else {
    total += dup.length;
    dup.forEach((d) => console.log(`DUP  ${d}`));
  }
}
if (total > 0) {
  console.error(`\nFALLO: ${total} clave(s) duplicada(s) en ${files.length} JSON revisados.`);
  process.exit(1);
}
console.log(`\nSin claves duplicadas (${files.length} JSON revisados).`);
