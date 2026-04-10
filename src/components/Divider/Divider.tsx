import { forwardRef } from 'react';
import styles from './Divider.module.css';
import type { DividerProps } from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

const variantClass = {
  solid: styles.solid,
  dashed: styles.dashed,
  dotted: styles.dotted,
} as const;

const horizontalSizeClass = {
  sm: styles.horizontalSm,
  md: styles.horizontalMd,
  lg: styles.horizontalLg,
} as const;

const verticalSizeClass = {
  sm: styles.verticalSm,
  md: styles.verticalMd,
  lg: styles.verticalLg,
} as const;

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(props, ref) {
  const {
    orientation: orientationProp,
    vertical: verticalProp,
    variant = 'solid',
    size = 'md',
    titlePlacement = 'center',
    plain = true,
    className,
    classNames,
    children,
    ...rest
  } = props;

  const orientation =
    orientationProp ?? (verticalProp ? 'vertical' : 'horizontal');

  const vCls = variantClass[variant];

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cx(
          styles.root,
          styles.vertical,
          vCls,
          verticalSizeClass[size],
          className,
          classNames?.root
        )}
        {...rest}
      />
    );
  }

  const hasTitle = children != null && children !== false;

  if (!hasTitle) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          styles.root,
          styles.horizontal,
          horizontalSizeClass[size],
          vCls,
          className,
          classNames?.root
        )}
        {...rest}
      >
        <span className={cx(styles.rail, classNames?.rail)} aria-hidden />
      </div>
    );
  }

  if (titlePlacement === 'start') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          styles.root,
          styles.horizontal,
          horizontalSizeClass[size],
          vCls,
          className,
          classNames?.root
        )}
        {...rest}
      >
        <span className={cx(styles.content, !plain && styles.contentEmphasis, classNames?.content)}>
          {children}
        </span>
        <span className={cx(styles.rail, classNames?.rail)} aria-hidden />
      </div>
    );
  }

  if (titlePlacement === 'end') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          styles.root,
          styles.horizontal,
          horizontalSizeClass[size],
          vCls,
          className,
          classNames?.root
        )}
        {...rest}
      >
        <span className={cx(styles.rail, classNames?.rail)} aria-hidden />
        <span className={cx(styles.content, !plain && styles.contentEmphasis, classNames?.content)}>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cx(
        styles.root,
        styles.horizontal,
        horizontalSizeClass[size],
        vCls,
        className,
        classNames?.root
      )}
      {...rest}
    >
      <span className={cx(styles.rail, classNames?.rail)} aria-hidden />
      <span className={cx(styles.content, !plain && styles.contentEmphasis, classNames?.content)}>
        {children}
      </span>
      <span className={cx(styles.rail, classNames?.rail)} aria-hidden />
    </div>
  );
});
