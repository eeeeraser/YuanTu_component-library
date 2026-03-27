import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import docsLogo from '../assets/docs-logo.png';
import { ShapeGrid } from './components/ShapeGrid';
import { DOC_PATHS, hrefForDocPath, type DocPath } from './route';
import styles from './DocsLayout.module.css';

const WIDTH_STORAGE_KEY = 'docs-sidebar-width-px';

/** 默认宽度 ≈ spacing-300 × 9（216px） */
const DEFAULT_WIDTH = 216;
const MIN_WIDTH = 160;
const MAX_WIDTH = 420;

function clampWidth(px: number): number {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(px)));
}

const nav: { to: DocPath; label: string }[] = [
  { to: DOC_PATHS.home, label: '首页' },
  { to: DOC_PATHS.button, label: 'Button 按钮' },
  { to: DOC_PATHS.grid, label: 'Grid 栅格' },
  { to: DOC_PATHS.icon, label: 'Icon 图标' },
];

type DocsLayoutProps = {
  activePath: DocPath;
  onNavigate: (to: DocPath) => void;
  children: ReactNode;
};

export function DocsLayout({ activePath, onNavigate, children }: DocsLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const widthRef = useRef(DEFAULT_WIDTH);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WIDTH_STORAGE_KEY);
      if (raw != null) {
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n)) {
          const w = clampWidth(n);
          widthRef.current = w;
          setSidebarWidth(w);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const startResize = useCallback((downEvent: React.MouseEvent) => {
    downEvent.preventDefault();
    const startX = downEvent.clientX;
    const startW = widthRef.current;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const next = clampWidth(startW + delta);
      widthRef.current = next;
      setSidebarWidth(next);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
      try {
        localStorage.setItem(WIDTH_STORAGE_KEY, String(widthRef.current));
      } catch {
        /* ignore */
      }
    };

    document.body.style.setProperty('user-select', 'none');
    document.body.style.setProperty('cursor', 'col-resize');
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  return (
    <div className={styles.layout}>
      <ShapeGrid
        className={styles.bgGrid}
        direction="right"
        speed={0.45}
        borderColor="#2a2a2a"
        squareSize={44}
        hoverFillColor="#2e2e2e"
        shape="square"
        hoverTrailAmount={0}
      />
      <aside
        className={styles.aside}
        style={{ width: sidebarWidth, flexShrink: 0 }}
      >
        <div className={styles.brand}>
          <img
            src={docsLogo}
            alt=""
            className={styles.brandLogo}
            width={37}
            height={37}
            decoding="async"
          />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>源图组件库</span>
            <span className={styles.brandSub}>Design System</span>
          </div>
        </div>
        <nav className={styles.nav} aria-label="组件导航">
          {nav.map((item) => {
            const isActive = activePath === item.to;
            return (
              <a
                key={item.to}
                href={hrefForDocPath(item.to)}
                className={isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.to);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>

      <div
        className={styles.resizeHandle}
        onMouseDown={startResize}
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={sidebarWidth}
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        aria-label="拖动调整侧栏宽度"
        tabIndex={0}
        onKeyDown={(e) => {
          const step = 16;
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setSidebarWidth((w) => {
              const next = clampWidth(w - step);
              widthRef.current = next;
              try {
                localStorage.setItem(WIDTH_STORAGE_KEY, String(next));
              } catch {
                /* ignore */
              }
              return next;
            });
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setSidebarWidth((w) => {
              const next = clampWidth(w + step);
              widthRef.current = next;
              try {
                localStorage.setItem(WIDTH_STORAGE_KEY, String(next));
              } catch {
                /* ignore */
              }
              return next;
            });
          }
        }}
      />

      <div className={styles.mainWrap}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
