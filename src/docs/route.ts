/** 文档站路由（不依赖 react-router-dom，避免未安装依赖时无法预览） */

export const DOC_PATHS = {
  home: '/',
  button: '/components/button',
  grid: '/components/grid',
  icon: '/components/icon',
  typography: '/components/typography',
  divider: '/components/divider',
  layout: '/components/layout',
  splitter: '/components/splitter',
  breadcrumb: '/components/breadcrumb',
} as const;

export type DocPath = (typeof DOC_PATHS)[keyof typeof DOC_PATHS];

/** 去掉 Vite `base`（如 GitHub Pages 项目站 `/repo/`）后的路径 */
function pathnameWithoutBase(): string {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const baseUrl = import.meta.env.BASE_URL;
  const basePath = baseUrl.replace(/\/$/, '');
  if (!basePath) return path;
  if (path === basePath) return '/';
  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length).replace(/\/$/, '') || '/';
  }
  return path;
}

export function normalizePathname(): DocPath {
  const raw = pathnameWithoutBase();
  if (raw === DOC_PATHS.button) return DOC_PATHS.button;
  if (raw === DOC_PATHS.grid) return DOC_PATHS.grid;
  if (raw === DOC_PATHS.icon) return DOC_PATHS.icon;
  if (raw === DOC_PATHS.typography) return DOC_PATHS.typography;
  if (raw === DOC_PATHS.divider) return DOC_PATHS.divider;
  if (raw === DOC_PATHS.layout) return DOC_PATHS.layout;
  if (raw === DOC_PATHS.splitter) return DOC_PATHS.splitter;
  if (raw === DOC_PATHS.breadcrumb) return DOC_PATHS.breadcrumb;
  return DOC_PATHS.home;
}

/** 用于 `<a href>`、`history.pushState`，与 `vite.config` 的 `base` 一致 */
export function hrefForDocPath(to: DocPath): string {
  const base = import.meta.env.BASE_URL;
  if (to === '/') return base;
  return `${base}${to.slice(1)}`;
}
