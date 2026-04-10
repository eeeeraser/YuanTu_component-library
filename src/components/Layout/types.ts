import type { HTMLAttributes, ReactNode } from 'react';

export type LayoutDirection = 'vertical' | 'horizontal';

export type LayoutSiderTheme = 'dark' | 'light';

export type LayoutRootClassNames = {
  root?: string;
};

export type LayoutProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** vertical：纵向排列（默认）；horizontal：用于侧栏 + 主内容同一行 */
  direction?: LayoutDirection;
  classNames?: LayoutRootClassNames;
  children?: ReactNode;
};

export type LayoutHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  classNames?: { root?: string };
  children?: ReactNode;
};

export type LayoutContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  classNames?: { root?: string };
  children?: ReactNode;
};

export type LayoutFooterProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  classNames?: { root?: string };
  children?: ReactNode;
};

export type LayoutSiderClassNames = {
  root?: string;
  inner?: string;
  trigger?: string;
};

export type LayoutSiderProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** 展开宽度，默认 200px（--layout-sider-width） */
  width?: number | string;
  /** 收起宽度，默认 64px（--layout-sider-collapsed-width） */
  collapsedWidth?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  theme?: LayoutSiderTheme;
  /** null 隐藏默认折叠按钮（仍可受控收起） */
  trigger?: ReactNode | null;
  classNames?: LayoutSiderClassNames;
  children?: ReactNode;
};
