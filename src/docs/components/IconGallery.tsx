import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Icon } from '../../components/Icon';
import { IconChevronLeft, IconChevronRight } from '../../components/Icon/mdi';
import { FIGMA_ACTION_ICON_NAMES } from '../../data/figmaActionIcons';
import { materialSnakeToIconComponentName } from '../../data/materialIconName';
import styles from './IconGallery.module.css';

const PAGE_SIZE = 120;

const svgRawGlob = import.meta.glob<string>(
  '../../../node_modules/@material-design-icons/svg/filled/*.svg',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
);

function buildMaterialNameToRaw(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [p, raw] of Object.entries(svgRawGlob)) {
    const m = p.match(/\/([^/]+)\.svg$/);
    if (m) map.set(m[1], raw);
  }
  return map;
}

function parsePathDs(svg: string): string[] {
  const out: string[] = [];
  const re = /\bd\s*=\s*"([^"]+)"/g;
  let x: RegExpExecArray | null;
  while ((x = re.exec(svg))) {
    out.push(x[1]);
  }
  return out;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function IconGallery() {
  const nameToRaw = useMemo(() => buildMaterialNameToRaw(), []);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!deferredQuery) return [...FIGMA_ACTION_ICON_NAMES];
    return FIGMA_ACTION_ICON_NAMES.filter((name) => {
      const lower = name.toLowerCase();
      const spaced = lower.replace(/_/g, ' ');
      return (
        lower.includes(deferredQuery) ||
        spaced.includes(deferredQuery) ||
        deferredQuery.split(/\s+/).every((w) => w && lower.includes(w))
      );
    });
  }, [deferredQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const sliceStart = (safePage - 1) * PAGE_SIZE;
  const pageNames = filtered.slice(sliceStart, sliceStart + PAGE_SIZE);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  };

  const handleCellClick = async (materialName: string) => {
    const comp = materialSnakeToIconComponentName(materialName);
    const snippet = `import { ${comp} } from 'yuantu-component-library/action';
// Figma 图层名：${materialName}`;
    const ok = await copyText(snippet);
    showToast(ok ? `已复制：${comp}` : '复制失败');
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <label className={styles.searchLabel} htmlFor="icon-gallery-search">
          搜索图标
        </label>
        <div className={styles.searchRow}>
          <input
            id="icon-gallery-search"
            className={styles.search}
            type="search"
            placeholder="按 Material 名称过滤，例如 search、account_balance、home…"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          {totalPages > 1 ? (
            <div className={styles.pager}>
              <button
                type="button"
                className={styles.pageBtn}
                aria-label="上一页"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <IconChevronLeft size="sm" color="inherit" aria-hidden />
              </button>
              <span className={styles.pageInfo}>
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                className={styles.pageBtn}
                aria-label="下一页"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <IconChevronRight size="sm" color="inherit" aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
        <p className={styles.meta}>
          共 <strong>{filtered.length}</strong> 个
          {filtered.length !== FIGMA_ACTION_ICON_NAMES.length
            ? `（全部 ${FIGMA_ACTION_ICON_NAMES.length}，与 Figma「Action」画板一致）`
            : '（与 Figma「Action」画板一致）'}
          ，每页 {PAGE_SIZE} 个
        </p>
      </div>

      <div className={styles.grid} role="list">
        {pageNames.map((materialName) => {
          const raw = nameToRaw.get(materialName);
          const paths = raw ? parsePathDs(raw) : [];
          return (
            <button
              key={materialName}
              type="button"
              className={styles.cell}
              role="listitem"
              title={`点击复制 import：${materialSnakeToIconComponentName(materialName)}（${materialName}）`}
              onClick={() => void handleCellClick(materialName)}
            >
              <span className={styles.iconWrap}>
                {paths.length > 0 ? (
                  <Icon size="md" color="default" aria-hidden>
                    {paths.map((d, i) => (
                      <path key={i} d={d} />
                    ))}
                  </Icon>
                ) : (
                  <span className={styles.missing}>?</span>
                )}
              </span>
              <span className={styles.label}>{materialName}</span>
            </button>
          );
        })}
      </div>

      {toast ? <div className={styles.toast} role="status">{toast}</div> : null}
    </div>
  );
}
