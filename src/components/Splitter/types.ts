import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type SplitterOrientation = 'horizontal' | 'vertical';

/** 像素数字，或带单位的字符串如 "40%"、"200px" */
export type SplitterSizeValue = number | string;

export type SplitterClassNames = {
  root?: string;
  panel?: string;
  dragger?: string;
};

export type SplitterProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  /** 分割方向；与 vertical 同时存在时以此为准 */
  orientation?: SplitterOrientation;
  /** true 等价于 orientation="vertical" */
  vertical?: boolean;
  /** 双击分割条恢复初次测量后的默认比例 */
  onDraggerDoubleClick?: () => void;
  classNames?: SplitterClassNames;
};

export type SplitterPanelClassNames = {
  root?: string;
};

export type SplitterPanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  defaultSize?: SplitterSizeValue;
  min?: SplitterSizeValue;
  max?: SplitterSizeValue;
  /** 为 false 时与另一块均为 false 则不可拖拽 */
  resizable?: boolean;
  classNames?: SplitterPanelClassNames;
};

export type SplitterPanelElement = ReactElement<SplitterPanelProps>;
