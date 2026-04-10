import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

export type BreadcrumbSeparatorItem = {
  type: 'separator';
  separator?: ReactNode;
};

export type BreadcrumbRouteItem = {
  title: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
};

export type BreadcrumbItem = BreadcrumbRouteItem | BreadcrumbSeparatorItem;

export type BreadcrumbClassNames = {
  root?: string;
  list?: string;
  item?: string;
  separator?: string;
  link?: string;
  linkButton?: string;
  plain?: string;
  current?: string;
};

export type BreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: BreadcrumbItem[];
  /** 相邻两项之间的默认分隔符；可被条目中的 { type: 'separator' } 覆盖该位置 */
  separator?: ReactNode;
  /**
   * 为 false 时，除末级外的路径项仅展示文案（忽略 href / onClick），不跳转、不响应点击。
   * 适合文档站或纯示意场景；末级仍为当前页样式与 aria-current。
   */
  navigable?: boolean;
  classNames?: BreadcrumbClassNames;
};
