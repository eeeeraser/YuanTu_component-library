import { forwardRef, useCallback, useId, useState, type ReactNode } from 'react';
import styles from './Layout.module.css';
import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSiderProps,
} from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

function toCssSize(value: number | string | undefined, fallbackVar: string): string {
  if (value === undefined) return fallbackVar;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { direction = 'vertical', className, classNames, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        styles.root,
        direction === 'horizontal' && styles.horizontal,
        className,
        classNames?.root
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(function LayoutHeader(
  { className, classNames, children, ...rest },
  ref
) {
  return (
    <header ref={ref} className={cx(styles.header, className, classNames?.root)} {...rest}>
      {children}
    </header>
  );
});

export const LayoutContent = forwardRef<HTMLDivElement, LayoutContentProps>(function LayoutContent(
  { className, classNames, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx(styles.content, className, classNames?.root)} {...rest}>
      {children}
    </div>
  );
});

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(function LayoutFooter(
  { className, classNames, children, ...rest },
  ref
) {
  return (
    <footer ref={ref} className={cx(styles.footer, className, classNames?.root)} {...rest}>
      {children}
    </footer>
  );
});

function DefaultTrigger({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      className={styles.triggerIcon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {collapsed ? (
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export const LayoutSider = forwardRef<HTMLElement, LayoutSiderProps>(function LayoutSider(
  {
    width,
    collapsedWidth,
    collapsible = false,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapse,
    theme = 'dark',
    trigger,
    className,
    classNames,
    children,
    style,
    ...rest
  },
  ref
) {
  const isControlled = collapsedProp !== undefined;
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const collapsed = isControlled ? Boolean(collapsedProp) : innerCollapsed;

  const setCollapsed = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerCollapsed(next);
      onCollapse?.(next);
    },
    [isControlled, onCollapse]
  );

  const wExpanded = toCssSize(width, 'var(--layout-sider-width)');
  const wCollapsed = toCssSize(collapsedWidth, 'var(--layout-sider-collapsed-width)');
  const currentW = collapsed ? wCollapsed : wExpanded;

  const showTrigger = collapsible && trigger !== null;
  const triggerNode: ReactNode =
    trigger === undefined ? <DefaultTrigger collapsed={collapsed} /> : trigger;

  const labelId = useId();

  return (
    <aside
      ref={ref}
      className={cx(
        styles.sider,
        theme === 'dark' ? styles.siderDark : styles.siderLight,
        className,
        classNames?.root
      )}
      style={{
        ...style,
        width: currentW,
        minWidth: currentW,
      }}
      aria-expanded={collapsible ? !collapsed : undefined}
      {...rest}
    >
      <div className={cx(styles.siderInner, classNames?.inner)} id={labelId}>
        {children}
      </div>
      {showTrigger ? (
        <button
          type="button"
          className={cx(styles.trigger, classNames?.trigger)}
          aria-controls={labelId}
          aria-label={collapsed ? '展开侧栏' : '收起侧栏'}
          onClick={() => setCollapsed(!collapsed)}
        >
          {triggerNode}
        </button>
      ) : null}
    </aside>
  );
});
