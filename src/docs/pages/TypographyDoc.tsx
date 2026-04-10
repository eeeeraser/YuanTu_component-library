import { useCallback, useState } from 'react';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './TypographyDoc.module.css';

const tokenRows = [
  {
    name: '--font-family-body-cn',
    description: '正文字体（中文优先栈中的中文部分）',
    type: 'string',
  },
  {
    name: '--font-family-body-en',
    description: '正文字体（西文优先）',
    type: 'string',
  },
  {
    name: '--font-family-title-cn',
    description: '标题字体（中文）',
    type: 'string',
  },
  {
    name: '--font-family-title-en',
    description: '标题字体（西文，如 SF Pro Display）',
    type: 'string',
  },
  {
    name: '--font-weight-regular',
    description: '常规字重',
    type: 'number',
  },
  {
    name: '--font-weight-semibold',
    description: '半粗，用于标题与强调',
    type: 'number',
  },
];

const textColorRows = [
  {
    name: '--color-text-primary',
    description: '主文案',
    type: 'color',
  },
  {
    name: '--color-text-secondary',
    description: '次要层级、辅助说明',
    type: 'color',
  },
  {
    name: '--color-text-success',
    description: '成功语义',
    type: 'color',
  },
  {
    name: '--color-text-warning',
    description: '警告语义',
    type: 'color',
  },
  {
    name: '--color-text-error',
    description: '错误 / 危险语义',
    type: 'color',
  },
  {
    name: '--color-text-disabled',
    description: '禁用态文案',
    type: 'color',
  },
  {
    name: '--color-text-brand',
    description: '品牌色链接与行内高亮',
    type: 'color',
  },
];

const scaleNote = `本页字阶用 spacing token 表达字号（与 Button 等组件一致），例如
--spacing-400 = 32px。业务侧可在此映射基础上微调 line-height。`;

const titleCode = `<h1 className={\`\${styles.typeTitle} \${styles.level1}\`}>一级标题</h1>
<h2 className={\`\${styles.typeTitle} \${styles.level2}\`}>二级标题</h2>
<h3 className={\`\${styles.typeTitle} \${styles.level3}\`}>三级标题</h3>
<h4 className={\`\${styles.typeTitle} \${styles.level4}\`}>四级标题</h4>
<h5 className={\`\${styles.typeTitle} \${styles.level5}\`}>五级标题</h5>`;

const bodyCode = `<p className={styles.typeBody}>
  正文段落使用 body 字栈与 16px（--spacing-200）字号。
</p>`;

const semanticCode = `<span className={styles.typeSecondary}>辅助</span>
<span className={styles.typeSuccess}>成功</span>
<span className={styles.typeWarning}>警告</span>
<span className={styles.typeDanger}>危险</span>
<span className={styles.typeDisabled} aria-disabled>禁用</span>`;

const inlineCode = `<code className={styles.typeCode}>npm run dev</code>
<kbd className={styles.typeKbd}>⌘</kbd> + <kbd className={styles.typeKbd}>K</kbd>
<mark className={styles.typeMark}>高亮</mark>`;

const emphasisCode = `<span className={styles.typeStrong}>加粗</span>
<span className={styles.typeItalic}>斜体</span>
<span className={styles.typeUnderline}>下划线</span>
<span className={styles.typeDelete}>删除线</span>`;

const listCode = `<ul className={styles.typeList}>
  <li>无序列表项</li>
</ul>`;

function CopyableDemo() {
  const text = '源图组件库 · Typography';
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <div className={styles.copyRow}>
      <span className={styles.copyText}>{text}</span>
      <button type="button" className={styles.copyBtn} onClick={onCopy}>
        {copied ? '已复制' : '复制'}
      </button>
      {copied ? <span className={styles.copyDone}>✓</span> : null}
    </div>
  );
}

export function TypographyDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Typography 字体排印</h1>
        <p className={styles.lead}>
          基础文字规范：标题层级、正文、语义色与行内样式。颜色与字栈来自本库{' '}
          <code className={styles.inlineCode}>semantic.css</code>。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>文章、说明、设置页等需要统一标题与段落层级时。</li>
          <li>需要区分主文案、辅助说明以及成功 / 警告 / 错误语义时。</li>
          <li>需要链接、键盘提示、行内代码、高亮等行内排印时。</li>
        </ul>
      </section>

      <DemoBlock
        title="标题层级"
        description="五级标题对应 h1–h5；使用 title 字栈与 semibold。"
        code={titleCode}
      >
        <h1 className={`${styles.typeTitle} ${styles.level1}`}>一级标题 · h1</h1>
        <h2 className={`${styles.typeTitle} ${styles.level2}`}>二级标题 · h2</h2>
        <h3 className={`${styles.typeTitle} ${styles.level3}`}>三级标题 · h3</h3>
        <h4 className={`${styles.typeTitle} ${styles.level4}`}>四级标题 · h4</h4>
        <h5 className={`${styles.typeTitle} ${styles.level5}`}>五级标题 · h5</h5>
      </DemoBlock>

      <DemoBlock
        title="段落"
        description="正文默认 16px（--spacing-200）、行高约 1.65。"
        code={bodyCode}
      >
        <p className={styles.typeBody}>
          设计体系中的正文应易读、对比充足。中文与西文混排时，使用 body
          字栈：西文在前可优化标点与比例；长文建议控制行宽（约 45–75 字符）以减轻阅读疲劳。
        </p>
        <p className={styles.typeBody}>
          第二段用于展示段落间距：段间距略小于行高，保持区块感而不松散。
        </p>
      </DemoBlock>

      <DemoBlock
        title="文本类型"
        description="语义色：辅助、成功、警告、危险、禁用，绑定对应文案色 Token。"
        code={semanticCode}
      >
        <div className={styles.typeRow}>
          <span className={styles.typeBody}>默认主色</span>
          <span className={`${styles.typeBody} ${styles.typeSecondary}`}>辅助</span>
          <span className={`${styles.typeBody} ${styles.typeSuccess}`}>成功</span>
          <span className={`${styles.typeBody} ${styles.typeWarning}`}>警告</span>
          <span className={`${styles.typeBody} ${styles.typeDanger}`}>危险</span>
          <span className={`${styles.typeBody} ${styles.typeDisabled}`} aria-disabled>
            禁用
          </span>
        </div>
      </DemoBlock>

      <DemoBlock title="链接" description="使用品牌色；hover 加深并显示下划线。">
        <p className={styles.typeBody}>
          外链请使用品牌色并保留 hover 反馈；站内可跳转到{' '}
          <a
            className={styles.typeLink}
            href="#token-font"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('token-font')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            下方 Token 表
          </a>
          查看文案色变量。
        </p>
      </DemoBlock>

      <DemoBlock
        title="行内 code / keyboard / mark"
        description="行内代码、键盘键帽样式与高亮标记。"
        code={inlineCode}
      >
        <p className={styles.typeBody}>
          执行 <code className={styles.typeCode}>npm run dev</code> 启动文档站；在 macOS 上可用{' '}
          <kbd className={styles.typeKbd}>⌘</kbd> + <kbd className={styles.typeKbd}>K</kbd> 唤起搜索（示例）。
          重要提示可用 <mark className={styles.typeMark}>高亮背景</mark> 标出。
        </p>
      </DemoBlock>

      <DemoBlock
        title="strong / italic / underline / delete"
        description="加粗、斜体、下划线与删除线。"
        code={emphasisCode}
      >
        <p className={`${styles.typeBody} ${styles.typeRow}`}>
          <span className={styles.typeStrong}>Semibold 强调</span>
          <span className={styles.typeItalic}>Italic 斜体</span>
          <span className={styles.typeUnderline}>下划线</span>
          <span className={styles.typeDelete}>删除线</span>
        </p>
      </DemoBlock>

      <DemoBlock title="列表" description="列表字号与正文一致，适当缩进。" code={listCode}>
        <ul className={styles.typeList}>
          <li>用无序列表陈列并列信息。</li>
          <li>嵌套不宜过深，超过两级时考虑拆成段落或小标题。</li>
        </ul>
      </DemoBlock>

      <DemoBlock
        title="可拷贝（示例）"
        description="一键复制可用 Clipboard API 在业务侧自行封装。"
        code={`const text = '源图组件库 · Typography';
await navigator.clipboard.writeText(text);`}
      >
        <CopyableDemo />
      </DemoBlock>

      <section className={styles.section} id="token-font">
        <h2 className={styles.h2}>Design Token</h2>
        <p className={styles.apiNote}>{scaleNote}</p>
        <h3 className={styles.h3}>字族与字重</h3>
        <ApiTable rows={tokenRows} />
        <h3 className={styles.h3}>语义色（文案）</h3>
        <ApiTable rows={textColorRows} />
        <h3 className={styles.h3}>推荐字阶映射</h3>
        <ApiTable
          rows={[
            { name: 'level 1 / h1', description: '页面主标题', type: 'font-size: var(--spacing-400) (32px)' },
            { name: 'level 2 / h2', description: '章节标题', type: 'var(--spacing-300) (24px)' },
            { name: 'level 3 / h3', description: '小节标题', type: 'var(--spacing-250) (20px)' },
            { name: 'level 4 / h4', description: '卡片标题等', type: 'var(--spacing-200) (16px)' },
            { name: 'level 5 / h5', description: '弱标题 / 标签区', type: 'var(--spacing-150) (12px)' },
            { name: 'body', description: '正文', type: 'var(--spacing-200)，line-height 1.6–1.7' },
          ]}
        />
      </section>

      <section className={styles.section} id="extend">
        <h2 className={styles.h2}>扩展与封装</h2>
        <ul className={styles.ul}>
          <li>可编辑文案、多行省略与展开收起等交互需在业务中按需实现为独立组件或组合件。</li>
          <li>本库当前提供 Token 与文档站演示样式类，可将同类样式提取为共享 CSS Module 或封装为 Typography 子组件。</li>
        </ul>
      </section>
    </article>
  );
}
