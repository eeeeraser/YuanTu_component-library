import type { ReactNode } from 'react';
import { CodeBlock, type CodeLanguage } from './CodeBlock';
import styles from './DemoBlock.module.css';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

type DemoBlockProps = {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** 展示用代码（静态字符串） */
  code?: string;
  /** 语法高亮语言，默认 tsx */
  codeLanguage?: CodeLanguage;
  /** 标题额外 className（用于单页内压缩字号等） */
  titleClassName?: string;
  /** 说明区域额外 className */
  descClassName?: string;
  /** 演示区容器额外 className（如栅格需铺满宽度） */
  demoClassName?: string;
};

export function DemoBlock({
  title,
  description,
  children,
  code,
  codeLanguage = 'tsx',
  titleClassName,
  descClassName,
  demoClassName,
}: DemoBlockProps) {
  return (
    <section className={styles.block}>
      <h3 className={cx(styles.title, titleClassName)}>{title}</h3>
      {description ? <div className={cx(styles.desc, descClassName)}>{description}</div> : null}
      <div className={cx(styles.demo, demoClassName)}>{children}</div>
      {code ? (
        <div className={styles.codeWrap}>
          <CodeBlock code={code} language={codeLanguage} />
        </div>
      ) : null}
    </section>
  );
}
