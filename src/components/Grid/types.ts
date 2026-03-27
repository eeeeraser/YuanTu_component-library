import type { HTMLAttributes, ReactNode } from 'react';

export type GridProps = {
  children: ReactNode;
  /** 是否显示 12 列参考竖条（与设计稿列对齐示意一致） */
  showGuides?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type GridRowProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type GridColProps = {
  children?: ReactNode;
  /** 占据列数，1–12，同一行各列 span 之和应为 12 */
  span: number;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'span'>;
