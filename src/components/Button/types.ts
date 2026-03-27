import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonSize = 'sm' | 'md' | 'lg';

/** default：方角；pill：胶囊；icon 专用见 iconShape */
export type ButtonShape = 'default' | 'pill';

/** 仅 icon 模式：方形圆角 vs 正圆 */
export type ButtonIconShape = 'square' | 'circle';

export type ButtonSlotClassNames = {
  root?: string;
  content?: string;
  label?: string;
  iconPrefix?: string;
  iconSuffix?: string;
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 视觉变体：主按钮 / 描边 / 纯文字 */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 文本按钮外形；iconOnly 时仍可用于 pill */
  shape?: ButtonShape;
  /** 仅展示图标（来自 Figma 的方形/圆形 icon 按钮） */
  iconOnly?: boolean;
  /** iconOnly 时控制方/圆 */
  iconShape?: ButtonIconShape;
  /** 左侧图标/装饰 */
  icon?: ReactNode;
  /** 右侧图标/装饰 */
  suffix?: ReactNode;
  loading?: boolean;
  /** 原生 button 类型 */
  htmlType?: 'button' | 'submit' | 'reset';
  /** 各节点 className，便于主题与业务覆盖 */
  classNames?: ButtonSlotClassNames;
}
