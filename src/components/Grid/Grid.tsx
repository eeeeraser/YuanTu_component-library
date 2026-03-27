import { forwardRef } from 'react';
import styles from './Grid.module.css';
import type { GridColProps, GridProps, GridRowProps } from './types';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

const GRID_COLS = 12;

function clampSpan(span: number): number {
  if (Number.isNaN(span) || span < 1) return 1;
  if (span > GRID_COLS) return GRID_COLS;
  return Math.floor(span);
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { children, showGuides = false, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.root, className)} {...rest}>
      {showGuides ? (
        <div className={styles.guides} aria-hidden>
          {Array.from({ length: GRID_COLS }, (_, i) => (
            <div key={i} className={styles.guide} />
          ))}
        </div>
      ) : null}
      <div className={styles.rows}>{children}</div>
    </div>
  );
});

export const GridRow = forwardRef<HTMLDivElement, GridRowProps>(function GridRow(
  { children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.row, className)} {...rest}>
      {children}
    </div>
  );
});

export const GridCol = forwardRef<HTMLDivElement, GridColProps>(function GridCol(
  { span, children, className, style, ...rest },
  ref,
) {
  const s = clampSpan(span);
  return (
    <div
      ref={ref}
      className={cx(styles.col, className)}
      style={{
        ...style,
        gridColumn: `span ${s} / span ${s}`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
