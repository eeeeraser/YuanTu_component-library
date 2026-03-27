import {
  forwardRef,
  type CSSProperties,
  type ReactElement,
  cloneElement,
  isValidElement,
} from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

const variantClass = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  tertiary: styles.variantTertiary,
} as const;

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'default',
    iconOnly = false,
    iconShape = 'square',
    icon,
    suffix,
    loading = false,
    disabled,
    htmlType = 'button',
    className,
    classNames,
    children,
    ...rest
  } = props;

  const isDisabled = Boolean(disabled || loading);

  const rootClass = cx(
    styles.root,
    variantClass[variant],
    sizeClass[size],
    iconOnly && styles.iconOnly,
    iconOnly && (iconShape === 'circle' ? styles.iconCircle : styles.iconSquare),
    !iconOnly && shape === 'pill' && styles.shapePill,
    loading && styles.loading,
    className,
    classNames?.root
  );

  const spinner = (
    <span className={cx(styles.icon, classNames?.iconPrefix)} aria-hidden>
      <span className={styles.spinner} />
    </span>
  );

  if (iconOnly) {
    const body = loading ? spinner : (icon ?? children);
    return (
      <button
        ref={ref}
        type={htmlType}
        className={rootClass}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...rest}
      >
        <span className={cx(styles.content, classNames?.content)}>
          <span className={cx(styles.icon, classNames?.label)}>{body}</span>
        </span>
      </button>
    );
  }

  const showPrefix = loading ? spinner : icon ? (
    <span className={cx(styles.icon, classNames?.iconPrefix)}>{icon}</span>
  ) : null;

  const showSuffix =
    !loading && suffix ? (
      <span className={cx(styles.icon, classNames?.iconSuffix)}>{suffix}</span>
    ) : null;

  return (
    <button
      ref={ref}
      type={htmlType}
      className={rootClass}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={cx(styles.content, classNames?.content)}>
        {showPrefix}
        {children != null && children !== false ? (
          <span className={cx(styles.label, classNames?.label)}>{children}</span>
        ) : null}
        {showSuffix}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

/** 为已有图标元素注入统一尺寸（可选辅助，仍用 token） */
export function withIconSize(
  node: ReactElement<{ className?: string; style?: CSSProperties }>,
  size: 'sm' | 'md' | 'lg'
): ReactElement {
  if (!isValidElement(node)) return node;
  const dim =
    size === 'sm' ? 'var(--spacing-200)' : size === 'lg' ? 'var(--spacing-300)' : 'var(--spacing-250)';
  return cloneElement(node, {
    style: {
      ...(node.props.style ?? {}),
      width: dim,
      height: dim,
    },
  });
}
