/**
 * 从 @mdi/js 生成 Icon + mdi 路径的封装组件，按文件分块以利于按需打包。
 * 运行：node scripts/generate-mdi-chunks.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dtsPath = join(root, 'node_modules/@mdi/js/mdi.d.ts');
const outDir = join(root, 'src/components/Icon/mdi');

const dts = readFileSync(dtsPath, 'utf8');
const re = /export declare const (mdi[A-Za-z0-9]+): string/g;
const mdiNames = [];
let m;
while ((m = re.exec(dts))) mdiNames.push(m[1]);

mdiNames.sort();

const CHUNK = 250;
const chunks = [];
for (let i = 0; i < mdiNames.length; i += CHUNK) {
  chunks.push(mdiNames.slice(i, i + CHUNK));
}

mkdirSync(outDir, { recursive: true });

const header = `/* eslint-disable */
/**
 * 自动生成：node scripts/generate-mdi-chunks.mjs
 * 来源：@mdi/js（Material Design Icons），与 Figma Action 图标命名可对照 mdiXxx。
 */
import { createMdiIcon } from '../createMdiIcon';
`;

function mdiToExportName(mdiKey) {
  return 'Icon' + mdiKey.slice(3);
}

chunks.forEach((names, idx) => {
  const imports = `import { ${names.join(', ')} } from '@mdi/js';`;
  const body = names
    .map((n) => {
      const ex = mdiToExportName(n);
      return `export const ${ex} = /*#__PURE__*/ createMdiIcon(${n}, '${ex}');`;
    })
    .join('\n');
  const file = `chunk${String(idx).padStart(2, '0')}.tsx`;
  writeFileSync(join(outDir, file), `${header}\n${imports}\n\n${body}\n`, 'utf8');
});

const indexExports = chunks
  .map((_, idx) => `export * from './chunk${String(idx).padStart(2, '0')}';`)
  .join('\n');

writeFileSync(
  join(outDir, 'index.ts'),
  `/**
 * 全部 MDI 图标组件（Icon + 名称），命名规则：mdiHome → IconHome，mdiAccountBalance → IconAccountBalance
 * 按需 import 单个组件即可 tree-shake 未使用的分块。
 */
${indexExports}
`,
  'utf8',
);

console.log(`Generated ${chunks.length} chunks, ${mdiNames.length} icons in ${outDir}`);
