import { forwardRef, useMemo, type ReactElement, type ReactNode } from 'react';
import styles from './Breadcrumb.module.css';
import type {
  BreadcrumbItem,
  BreadcrumbProps,
  BreadcrumbRouteItem,
  BreadcrumbSeparatorItem,
} from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

function isSeparatorItem(item: BreadcrumbItem): item is BreadcrumbSeparatorItem {
  return 'type' in item && item.type === 'separator';
}

function isRouteItem(item: BreadcrumbItem): item is BreadcrumbRouteItem {
  return !isSeparatorItem(item) && item != null && 'title' in item;
}

function lastRouteIndex(items: BreadcrumbItem[]): number {
  for (let i = items.length - 1; i >= 0; i--) {
    if (isRouteItem(items[i])) return i;
  }
  return -1;
}

function defaultSeparatorNode(separator: ReactNode): ReactNode {
  if (separator === undefined || separator === null) return '/';
  return separator;
}

function renderSeparator(
  key: string,
  content: ReactNode,
  classNames: BreadcrumbProps['classNames']
): ReactElement {
  return (
    <li key={key} className={cx(styles.item, classNames?.item)} aria-hidden>
      <span className={cx(styles.separator, classNames?.separator)}>{content}</span>
    </li>
  );
}

function CrumbBody({
  item,
  isLast,
  classNames,
}: {
  item: BreadcrumbRouteItem;
  isLast: boolean;
  classNames: BreadcrumbProps['classNames'];
}): ReactElement {
  if (isLast) {
    return (
      <span className={cx(styles.current, classNames?.current)} aria-current="page">
        {item.title}
      </span>
    );
  }

  if (item.href) {
    const external = /^https?:\/\//i.test(item.href);
    return (
      <a
        href={item.href}
        className={cx(styles.link, classNames?.link)}
        onClick={item.onClick}
        {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
      >
        {item.title}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        className={cx(styles.linkButton, classNames?.linkButton)}
        onClick={item.onClick}
      >
        {item.title}
      </button>
    );
  }

  return <span className={cx(styles.plain, classNames?.plain)}>{item.title}</span>;
}

function effectiveRouteItem(
  item: BreadcrumbRouteItem,
  isLast: boolean,
  navigable: boolean
): BreadcrumbRouteItem {
  if (isLast || navigable !== false) return item;
  return { title: item.title, className: item.className };
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    items,
    separator = '/',
    navigable = true,
    className,
    classNames,
    'aria-label': ariaLabel = '面包屑',
    ...rest
  },
  ref
) {
  const lastIdx = useMemo(() => lastRouteIndex(items), [items]);
  const sep = defaultSeparatorNode(separator);

  const cells: ReactElement[] = [];
  let lastWasRoute = false;

  items.forEach((item, i) => {
    if (isSeparatorItem(item)) {
      cells.push(
        renderSeparator(`sep-${i}`, item.separator !== undefined ? item.separator : sep, classNames)
      );
      lastWasRoute = false;
      return;
    }

    if (!isRouteItem(item)) return;

    if (lastWasRoute) {
      cells.push(renderSeparator(`autosep-${i}`, sep, classNames));
    }

    const isLast = i === lastIdx;
    const crumb = effectiveRouteItem(item, isLast, navigable);
    cells.push(
      <li key={`crumb-${i}`} className={cx(styles.item, classNames?.item, item.className)}>
        <CrumbBody item={crumb} isLast={isLast} classNames={classNames} />
      </li>
    );
    lastWasRoute = true;
  });

  return (
    <nav ref={ref} className={cx(styles.root, className, classNames?.root)} aria-label={ariaLabel} {...rest}>
      <ol className={cx(styles.list, classNames?.list)}>{cells}</ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
