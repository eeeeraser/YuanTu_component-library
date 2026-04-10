import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './Splitter.module.css';
import type {
  SplitterPanelProps,
  SplitterProps,
  SplitterSizeValue,
} from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

const DEFAULT_MIN_PX = 48;

function parseSizeToPx(raw: SplitterSizeValue | undefined, inner: number, fallbackPx: number): number {
  if (raw === undefined) return fallbackPx;
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  const s = String(raw).trim();
  if (s.endsWith('%')) {
    const n = parseFloat(s);
    return Number.isFinite(n) ? (n / 100) * inner : fallbackPx;
  }
  if (s.endsWith('px')) {
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : fallbackPx;
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : fallbackPx;
}

function panelBounds(
  inner: number,
  rawMin: SplitterSizeValue | undefined,
  rawMax: SplitterSizeValue | undefined,
  fallbackMin: number
): [number, number] {
  const minPx = parseSizeToPx(rawMin, inner, fallbackMin);
  const maxPx = rawMax === undefined ? inner : parseSizeToPx(rawMax, inner, inner);
  return [Math.min(minPx, maxPx), Math.max(minPx, maxPx)];
}

function clampSplit0(
  inner: number,
  s0: number,
  min0: number,
  max0: number,
  min1: number,
  max1: number
): number {
  const maxS0 = Math.min(max0, inner - min1);
  const minS0 = Math.max(min0, inner - max1);
  if (minS0 > maxS0) return inner / 2;
  return Math.min(maxS0, Math.max(minS0, s0));
}

function readCssPxVar(el: Element, name: string, fallback: number): number {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const v = parseFloat(raw);
  return Number.isFinite(v) ? v : fallback;
}

/** 跨重复打包 / HMR 等场景下仍能被识别（勿用引用相等判断 Panel） */
const SPLITTER_PANEL_BRAND = Symbol.for('yuantu.SplitterPanel');

function isSplitterPanelType(type: unknown): boolean {
  if (type === SplitterPanel) return true;
  if (typeof type !== 'function') return false;
  const desc = Object.getOwnPropertyDescriptor(type, SPLITTER_PANEL_BRAND);
  if (desc?.value === true) return true;
  return (type as { displayName?: string }).displayName === 'SplitterPanel';
}

function collectPanels(node: ReactNode, out: ReactElement<SplitterPanelProps>[]): void {
  Children.forEach(node, (ch) => {
    if (ch == null || ch === false) return;
    if (!isValidElement(ch)) return;
    if (isSplitterPanelType(ch.type)) {
      out.push(ch as ReactElement<SplitterPanelProps>);
      return;
    }
    if (ch.type === Fragment) {
      collectPanels((ch.props as { children?: ReactNode }).children, out);
    }
  });
}

function getPanelList(children: ReactNode): ReactElement<SplitterPanelProps>[] {
  const out: ReactElement<SplitterPanelProps>[] = [];
  collectPanels(children, out);
  return out;
}

export function SplitterPanel(_props: SplitterPanelProps): null {
  return null;
}

SplitterPanel.displayName = 'SplitterPanel';
Reflect.defineProperty(SplitterPanel, SPLITTER_PANEL_BRAND, { value: true, enumerable: false });

const SplitterBase = forwardRef<HTMLDivElement, SplitterProps>(function SplitterBase(
  {
    orientation: orientationProp,
    vertical: verticalProp,
    onDraggerDoubleClick,
    className,
    classNames,
    children,
    ...rest
  },
  ref
) {
  const vertical = verticalProp || orientationProp === 'vertical';
  const panels = useMemo(() => getPanelList(children), [children]);

  const rootRef = useRef<HTMLDivElement>(null);
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const initialSizeRef = useRef<number | null>(null);
  const dragLastRef = useRef(0);
  const [innerPx, setInnerPx] = useState(0);
  const [sizePx, setSizePx] = useState(0);

  const p0 = panels[0]?.props;
  const p1 = panels[1]?.props;

  const [min0, max0] = useMemo(
    () => panelBounds(innerPx, p0?.min, p0?.max, DEFAULT_MIN_PX),
    [innerPx, p0?.min, p0?.max]
  );
  const [min1, max1] = useMemo(
    () => panelBounds(innerPx, p1?.min, p1?.max, DEFAULT_MIN_PX),
    [innerPx, p1?.min, p1?.max]
  );

  const bothResizable = p0?.resizable !== false && p1?.resizable !== false;

  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const g = readCssPxVar(el, '--splitter-gutter-hit', 8);
    const total = vertical ? rect.height : rect.width;
    const inner = Math.max(0, total - g);
    setInnerPx(inner);
  }, [vertical]);

  useLayoutEffect(() => {
    measure();
  }, [measure, panels.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  useLayoutEffect(() => {
    if (innerPx <= 0 || !p0 || !p1) return;
    const def = parseSizeToPx(p0.defaultSize, innerPx, innerPx * 0.4);
    const clamped = clampSplit0(innerPx, def, min0, max0, min1, max1);
    setSizePx((prev) => {
      if (prev <= 0) {
        if (initialSizeRef.current === null) initialSizeRef.current = clamped;
        return clamped;
      }
      return clampSplit0(innerPx, prev, min0, max0, min1, max1);
    });
  }, [innerPx, min0, max0, min1, max1, p0, p1]);

  const dragRef = useRef<{ start: number; startSize: number } | null>(null);

  useLayoutEffect(() => {
    dragLastRef.current = sizePx;
  }, [sizePx]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (!bothResizable || innerPx <= 0) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      const startSize = sizePx;
      dragRef.current = {
        start: vertical ? e.clientY : e.clientX,
        startSize,
      };
      dragLastRef.current = startSize;
    },
    [bothResizable, innerPx, sizePx, vertical]
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (!dragRef.current || innerPx <= 0) return;
      const pos = vertical ? e.clientY : e.clientX;
      const delta = pos - dragRef.current.start;
      const next = clampSplit0(
        innerPx,
        dragRef.current.startSize + delta,
        min0,
        max0,
        min1,
        max1
      );
      dragLastRef.current = next;
      setSizePx(next);
    },
    [innerPx, max0, max1, min0, min1, vertical]
  );

  const endDrag = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (dragRef.current) {
        dragRef.current = null;
      }
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    },
    []
  );

  const onDoubleClick = useCallback(() => {
    if (initialSizeRef.current != null && innerPx > 0) {
      const v = clampSplit0(
        innerPx,
        initialSizeRef.current,
        min0,
        max0,
        min1,
        max1
      );
      dragLastRef.current = v;
      setSizePx(v);
    }
    onDraggerDoubleClick?.();
  }, [innerPx, max0, max1, min0, min1, onDraggerDoubleClick]);

  if (panels.length !== 2) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(
        `[Splitter] 需要恰好 2 个 Splitter.Panel，当前为 ${panels.length} 个。`
      );
    }
  }

  const a = panels[0];
  const b = panels[1];

  const rootClass = cx(
    styles.root,
    vertical ? styles.vertical : styles.horizontal,
    className,
    classNames?.root
  );

  if (!a || !b) {
    return (
      <div ref={setRefs} className={rootClass} {...rest}>
        <div className={styles.panel}>请放入两个 Splitter.Panel</div>
      </div>
    );
  }

  const panel0Style = vertical
    ? { height: sizePx, flexShrink: 0 as const, flexGrow: 0 as const }
    : { width: sizePx, flexShrink: 0 as const, flexGrow: 0 as const };
  const panel1Style =
    vertical
      ? { flex: '1 1 auto', minHeight: 0 }
      : { flex: '1 1 auto', minWidth: 0 };

  return (
    <div ref={setRefs} className={rootClass} {...rest}>
      <div
        className={cx(styles.panel, classNames?.panel, a.props.className, a.props.classNames?.root)}
        style={panel0Style}
      >
        {a.props.children}
      </div>
      <button
        type="button"
        className={cx(
          styles.dragger,
          !bothResizable && styles.draggerDisabled,
          classNames?.dragger
        )}
        aria-orientation={vertical ? 'horizontal' : 'vertical'}
        role="separator"
        aria-valuenow={Math.round(sizePx)}
        aria-valuemin={Math.round(min0)}
        aria-valuemax={Math.round(innerPx - min1)}
        disabled={!bothResizable}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onDoubleClick}
      >
        <span className={styles.draggerInner} aria-hidden />
      </button>
      <div
        className={cx(styles.panel, classNames?.panel, b.props.className, b.props.classNames?.root)}
        style={panel1Style}
      >
        {b.props.children}
      </div>
    </div>
  );
});

SplitterBase.displayName = 'Splitter';

export const Splitter = Object.assign(SplitterBase, { Panel: SplitterPanel });
