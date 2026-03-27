import { forwardRef } from 'react';
import styles from './Icon.module.css';
import type { IconRootProps } from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const colorClass = {
  default: styles.colorDefault,
  brand: styles.colorBrand,
  brandHover: styles.colorBrandHover,
  secondary: styles.colorSecondary,
  disabled: styles.colorDisabled,
  onAction: styles.colorOnAction,
  error: styles.colorError,
  info: styles.colorInfo,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  inherit: styles.colorInherit,
} as const;

/**
 * 图标容器：viewBox 24×24，与设计稿 Action 图标网格一致；尺寸与颜色来自语义 Token。
 */
export const Icon = forwardRef<SVGSVGElement, IconRootProps>(function Icon(
    {
      size = 'md',
      color = 'default',
      className,
      children,
      'aria-hidden': ariaHidden,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) {
    const decorative = !ariaLabel;
    return (
      <svg
        ref={ref}
        className={cx(styles.root, sizeClass[size], colorClass[color], className)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden={decorative ? true : ariaHidden}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </svg>
    );
  });
