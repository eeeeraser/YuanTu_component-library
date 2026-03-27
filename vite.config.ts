import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** 子路径部署（如 GitHub Pages 项目站）时：`VITE_BASE=/仓库名/ npm run build`（须以 / 结尾或脚本自动补全） */
function viteBase(): string {
  const raw = process.env.VITE_BASE;
  if (!raw || raw === '/') return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

export default defineConfig({
  base: viteBase(),
  plugins: [react()],
  // 便于 Cursor / VS Code 内置预览、局域网与其它网卡访问（默认仅 localhost 时部分环境打不开）
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
});
