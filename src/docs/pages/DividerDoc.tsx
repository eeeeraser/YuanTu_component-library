import { Divider } from '../../components/Divider';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './DividerDoc.module.css';

const apiRows = [
  {
    name: 'orientation',
    description: '水平或垂直；与 vertical 同时存在时以此为准',
    type: "'horizontal' | 'vertical'",
  },
  {
    name: 'vertical',
    description: '为 true 时等价于 orientation=&quot;vertical&quot;',
    type: 'boolean',
  },
  {
    name: 'variant',
    description: '实线、虚线或点线',
    type: "'solid' | 'dashed' | 'dotted'",
  },
  {
    name: 'size',
    description: '水平时控制上下外边距；垂直时控制左右外边距',
    type: "'sm' | 'md' | 'lg'",
  },
  {
    name: 'titlePlacement',
    description: '有 children 时文案在轴线上的位置',
    type: "'start' | 'center' | 'end'",
  },
  {
    name: 'plain',
    description: 'true 为常规字重；false 为半粗（小节标题感）；文案色均为品牌青 (#00FFE3 / --color-teal-primary-500)',
    type: 'boolean',
  },
  {
    name: 'classNames',
    description: '根节点、线条轨、文案区域 className',
    type: 'DividerSlotClassNames',
  },
  {
    name: 'className',
    description: '根节点额外 className',
    type: 'string',
  },
  {
    name: 'children',
    description: '中间文案；省略时为纯分割线',
    type: 'ReactNode',
  },
];

export function DividerDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Divider 分割线</h1>
        <p className={styles.lead}>
          区分内容区块或行内操作区；线条与间距使用 <code className={styles.inlineCode}>semantic.css</code> 边框与
          spacing Token。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>长文、设置页中分隔章节或表单项组。</li>
          <li>表格操作列、工具条内分隔文字与链接。</li>
        </ul>
      </section>

      <DemoBlock
        title="水平分割线"
        description="默认水平、实线；无 children 时为通栏线。"
        code={`<Divider />
<Divider>带文案</Divider>`}
      >
        <div className={`${styles.demoColumn} ${styles.demoStretch}`}>
          <p className={styles.prose}>上一段说明或列表结束位置。</p>
          <Divider />
          <p className={styles.prose}>下一段内容从此开始。</p>
        </div>
      </DemoBlock>

      <DemoBlock
        title="文案位置"
        description="titlePlacement：start / center / end。"
        code={`<Divider titlePlacement="start">左侧标题</Divider>
<Divider titlePlacement="center">居中</Divider>
<Divider titlePlacement="end">右侧标题</Divider>`}
      >
        <div className={`${styles.demoColumn} ${styles.demoStretch}`}>
          <Divider titlePlacement="start">左侧标题</Divider>
          <Divider titlePlacement="center">居中</Divider>
          <Divider titlePlacement="end">右侧标题</Divider>
        </div>
      </DemoBlock>

      <DemoBlock
        title="plain 与强调文案"
        description="中间文案使用品牌青色（--color-teal-primary-500）；plain 默认 true，false 时半粗。"
        code={`<Divider plain>正文风格</Divider>
<Divider plain={false}>小节标题</Divider>`}
      >
        <div className={`${styles.demoColumn} ${styles.demoStretch}`}>
          <Divider plain>正文风格</Divider>
          <Divider plain={false}>小节标题</Divider>
        </div>
      </DemoBlock>

      <DemoBlock
        title="线条样式 variant"
        description="solid / dashed / dotted。"
        code={`<Divider variant="solid" />
<Divider variant="dashed">虚线</Divider>
<Divider variant="dotted">点线</Divider>`}
      >
        <div className={`${styles.demoColumn} ${styles.demoStretch}`}>
          <Divider variant="solid" />
          <Divider variant="dashed">虚线</Divider>
          <Divider variant="dotted">点线</Divider>
        </div>
      </DemoBlock>

      <DemoBlock
        title="间距 size"
        description="水平时 margin-block；垂直时 margin-inline。"
        code={`<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />`}
      >
        <div className={`${styles.demoColumn} ${styles.demoStretch}`}>
          <Divider size="sm" />
          <Divider size="md" />
          <Divider size="lg" />
        </div>
      </DemoBlock>

      <DemoBlock
        title="垂直分割线"
        description="orientation=&quot;vertical&quot; 或 vertical；适合行内排列。"
        code={`<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>文本</span>
  <Divider vertical />
  <a href="#">链接</a>
</div>`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.inlineRow}>
          <span>文本</span>
          <Divider vertical />
          <a href="#vertical" style={{ color: 'var(--color-text-brand)' }}>
            链接
          </a>
          <Divider vertical variant="dashed" />
          <span>更多</span>
        </div>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>
        <h3 className={styles.h3}>DividerProps</h3>
        <p className={styles.apiNote}>
          继承原生 <code className={styles.inlineCode}>div</code> 属性（垂直形态同样渲染为{' '}
          <code className={styles.inlineCode}>div</code>，并带 <code className={styles.inlineCode}>role=&quot;separator&quot;</code>
          ）。
        </p>
        <ApiTable rows={apiRows} />
      </section>
    </article>
  );
}
