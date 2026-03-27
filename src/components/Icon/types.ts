import type { ReactNode, SVGAttributes } from 'react';

export type IconSize = 'sm' | 'md' | 'lg';

export type IconColor =
  | 'default'
  | 'brand'
  | 'brandHover'
  | 'secondary'
  | 'disabled'
  | 'onAction'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'inherit';

export type IconProps = {
  /** 尺寸对应 spacing token：sm=16 / md=24 / lg=32 */
  size?: IconSize;
  /** 语义色，映射 semantic.css 中的 icon / text token */
  color?: IconColor;
  className?: string;
  /** 无障碍：装饰性图标可设为空；有意义时写清含义 */
  'aria-label'?: string;
  'aria-hidden'?: boolean;
} & Omit<SVGAttributes<SVGSVGElement>, 'width' | 'height' | 'fill' | 'color' | 'children' | 'size'>;

/** 底层 Icon 需传入 path 子节点 */
export type IconRootProps = IconProps & { children: ReactNode };
