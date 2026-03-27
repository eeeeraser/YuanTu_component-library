/**
 * 从 @material-design-icons/svg/filled 读取路径，生成 Figma「Action」453 图标组件。
 * 运行：node scripts/generate-action-icons.mjs
 * 命名规则须与 src/data/materialIconName.ts 中 materialSnakeToIconComponentName 一致。
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const names = readFileSync(join(root, 'scripts/figma-symbols-csl.txt'), 'utf8')
  .trim()
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/** Material 图层名 snake_case → IconAccountBalance */
function materialToComponentName(materialName) {
  const parts = materialName.split('_');
  const pascal = parts
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      if (!part) return '';
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
  return `Icon${pascal}`;
}

function parsePathDs(svg) {
  const ds = [];
  const re = /\bd\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(svg))) ds.push(m[1]);
  return ds;
}

const CHUNK = 230;
const outDir = join(root, 'src/components/Icon/action');
mkdirSync(outDir, { recursive: true });

const chunks = [];
for (let i = 0; i < names.length; i += CHUNK) {
  chunks.push(names.slice(i, i + CHUNK));
}

const header = `/* eslint-disable */
/**
 * 自动生成：node scripts/generate-action-icons.mjs
 * 来源：@material-design-icons/svg/filled，与 Figma「Action」画板一致。
 */
import { createMaterialIcon } from '../createMaterialIcon';
`;

chunks.forEach((chunk, idx) => {
  const body = chunk
    .map((name) => {
      const svgPath = join(root, 'node_modules/@material-design-icons/svg/filled', `${name}.svg`);
      const svg = readFileSync(svgPath, 'utf8');
      const pathDs = parsePathDs(svg);
      if (pathDs.length === 0) throw new Error(`No paths in ${name}`);
      const comp = materialToComponentName(name);
      return `export const ${comp} = /*#__PURE__*/ createMaterialIcon(${JSON.stringify(pathDs)}, '${comp}');`;
    })
    .join('\n');

  const file = `chunk${String(idx).padStart(2, '0')}.tsx`;
  writeFileSync(join(outDir, file), `${header}\n${body}\n`, 'utf8');
});

const indexExports = chunks
  .map((_, i) => `export * from './chunk${String(i).padStart(2, '0')}';`)
  .join('\n');

writeFileSync(
  join(outDir, 'index.ts'),
  `/**
 * Figma「Action」453 个图标（Material filled），命名：图层名 snake_case → Icon + PascalCase 各段。
 * 按需 import：import { IconHome, IconSearch } from 'yuantu-component-library/action';
 */
${indexExports}
`,
  'utf8',
);

console.log(`Generated ${chunks.length} chunks, ${names.length} icons in ${outDir}`);
