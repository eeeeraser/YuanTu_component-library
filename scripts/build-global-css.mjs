/**
 * 从 design-tokens.json 生成 global.css
 * 用法: node scripts/build-global-css.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function slugifySegment(seg) {
  let s = String(seg).trim().toLowerCase();
  s = s.replace(/\(([^)]+)\)/g, '-$1');
  s = s.replace(/&/g, '');
  return s
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function figmaPathToVar(figmaPath) {
  const parts = String(figmaPath).split('/').map(slugifySegment).filter(Boolean);
  return '--' + parts.join('-');
}

function colorToCss(val) {
  if (!val || typeof val !== 'object') return null;
  if (val.hex) {
    const a = val.alpha;
    if (a != null && a !== 1 && a !== undefined) {
      const h = val.hex.replace(/^#/, '');
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return val.hex;
  }
  const c = val.components;
  if (Array.isArray(c) && c.length >= 3) {
    const r = Math.round(c[0] * 255);
    const g = Math.round(c[1] * 255);
    const b = Math.round(c[2] * 255);
    const a = val.alpha != null ? val.alpha : 1;
    if (a !== 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return null;
}

function walkPrimitives(obj, pathParts, out) {
  if (obj === null || typeof obj !== 'object') return;
  if ('$type' in obj && '$value' in obj) {
    if (obj.$type !== 'color') return;
    const cssVal = colorToCss(obj.$value);
    if (cssVal === null) return;
    const nameParts = pathParts.map(slugifySegment).filter(Boolean);
    out.push({ key: nameParts.join('-'), cssVal });
    return;
  }
  for (const k of Object.keys(obj)) {
    if (k.startsWith('$')) continue;
    walkPrimitives(obj[k], [...pathParts, k], out);
  }
}

function semanticPathToKey(pathParts) {
  return pathParts.map(slugifySegment).filter(Boolean).join('-');
}

function walkSemantic(obj, pathParts, out) {
  if (obj === null || typeof obj !== 'object') return;
  if ('$type' in obj && '$value' in obj) {
    const t = obj.$type;
    const v = obj.$value;
    const ext = obj.$extensions || {};
    const alias = ext['com.figma.aliasData'];
    const cssKey = semanticPathToKey(pathParts);
    let cssVal = null;

    if (t === 'color') {
      if (alias?.targetVariableSetName === 'Primitives' && alias.targetVariableName) {
        cssVal = `var(${figmaPathToVar(alias.targetVariableName)})`;
      } else {
        cssVal = colorToCss(v);
      }
    } else if (t === 'number') {
      cssVal = `${v}px`;
    } else if (t === 'string') {
      if (pathParts.join('/').toLowerCase().includes('font/weight')) {
        const map = { regular: '400', normal: '400', medium: '500', semibold: '600', bold: '700' };
        const key = String(v).toLowerCase();
        cssVal = map[key] != null ? map[key] : `"${String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
      } else {
        const s = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        cssVal = `"${s}"`;
      }
    } else cssVal = String(v);

    if (cssVal === null) return;
    out.push({ key: cssKey, cssVal });
    return;
  }
  for (const k of Object.keys(obj)) {
    if (k.startsWith('$')) continue;
    walkSemantic(obj[k], [...pathParts, k], out);
  }
}

const data = JSON.parse(fs.readFileSync(path.join(root, 'design-tokens.json'), 'utf8'));
const primList = [];
walkPrimitives(data.primitives, [], primList);
primList.sort((a, b) => a.key.localeCompare(b.key));

const semList = [];
walkSemantic(data.semantic, [], semList);
semList.sort((a, b) => a.key.localeCompare(b.key));

let css = `/**
 * Global design tokens — 自 design-tokens.json 生成
 * primitives：色板基元；semantic：语义层（颜色引用 var(--color-*)）
 */

:root {
`;

css += `  /* —— Primitives（基础色） —— */\n`;
for (const { key, cssVal } of primList) {
  css += `  --${key}: ${cssVal};\n`;
}

css += `\n  /* —— Semantic（语义 Token） —— */\n`;
for (const { key, cssVal } of semList) {
  css += `  --${key}: ${cssVal};\n`;
}

css += `}
`;

fs.writeFileSync(path.join(root, 'global.css'), css, 'utf8');
console.log(`Wrote global.css (primitives: ${primList.length}, semantic: ${semList.length})`);
