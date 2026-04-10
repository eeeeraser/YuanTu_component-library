import type { HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export type DividerSize = 'sm' | 'md' | 'lg';

/** 有文案时，标题与分割线的相对位置 */
export type DividerTitlePlacement = 'start' | 'center' | 'end';

export type DividerSlotClassNames = {
  root?: string;
  rail?: string;
  content?: string;
};

export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  /** 方向；与 `vertical` 同时存在时以 `orientation` 为准 */
  orientation?: DividerOrientation;
  /** 为 true 时等价于 `orientation="vertical"` */
  vertical?: boolean;
  /** 线条样式 */
  variant?: DividerVariant;
  /** 水平分割线上下外边距；垂直时为左右外边距 */
  size?: DividerSize;
  /** 存在 children 时，文案在轴线上的位置 */
  titlePlacement?: DividerTitlePlacement;
  /** false 时文案使用半粗（小标题感）；true 为正文字重 */
  plain?: boolean;
  classNames?: DividerSlotClassNames;
};
