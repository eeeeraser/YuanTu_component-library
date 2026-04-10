import { Splitter } from '../../components/Splitter';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './SplitterDoc.module.css';

const splitterRows = [
  { name: 'orientation', description: 'horizontal 为左右分栏；vertical 为上下分栏', type: "'horizontal' | 'vertical'" },
  { name: 'vertical', description: 'true 等价于 orientation=&quot;vertical&quot;', type: 'boolean' },
  { name: 'onDraggerDoubleClick', description: '双击分割条（内置会尝试恢复初次比例）后的额外回调', type: '() => void' },
  { name: 'classNames', description: 'root / panel / dragger', type: 'SplitterClassNames' },
  { name: 'className', description: '根节点', type: 'string' },
  { name: 'children', description: '恰好两个 Splitter.Panel', type: 'ReactNode' },
];

const panelRows = [
  { name: 'defaultSize', description: '初始主轴尺寸：数字为 px，或 &quot;40%&quot;、&quot;200px&quot;', type: 'SplitterSizeValue' },
  { name: 'min', description: '最小尺寸（px 或百分比字符串）', type: 'SplitterSizeValue' },
  { name: 'max', description: '最大尺寸', type: 'SplitterSizeValue' },
  { name: 'resizable', description: '两侧均为 false 时不可拖拽', type: 'boolean' },
  { name: 'classNames', description: '面板根节点', type: '{ root?: string }' },
  { name: 'className', description: '面板根节点 className', type: 'string' },
  { name: 'children', description: '面板内容', type: 'ReactNode' },
];

export function SplitterDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Splitter 分割面板</h1>
        <p className={styles.lead}>
          将区域拆成两块并可拖拽调整比例；样式来自 <code className={styles.inlineCode}>semantic.css</code> 中的{' '}
          <code className={styles.inlineCode}>--splitter-*</code>。当前版本需<strong>恰好两个</strong>
          <code className={styles.inlineCode}>Splitter.Panel</code>。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>编辑器、预览 + 属性面板、主列表 + 详情等需要用户自定义列宽或行高的场景。</li>
          <li>需限制各区最小/最大尺寸，避免拖得过窄或撑破布局。</li>
        </ul>
      </section>

      <DemoBlock
        title="水平分割"
        description="默认 orientation=&quot;horizontal&quot;；拖拽中间分割条。"
        code={`<Splitter>
  <Splitter.Panel defaultSize="40%" min={100}>左</Splitter.Panel>
  <Splitter.Panel min={100}>右</Splitter.Panel>
</Splitter>`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.shell}>
          <Splitter>
            <Splitter.Panel defaultSize="42%" min={90}>
              <div className={styles.panelDemo}>第一区</div>
            </Splitter.Panel>
            <Splitter.Panel min={90}>
              <div className={styles.panelDemo}>第二区</div>
            </Splitter.Panel>
          </Splitter>
        </div>
        <p className={styles.hint}>双击分割条可恢复初次载入时的默认比例。</p>
      </DemoBlock>

      <DemoBlock
        title="垂直分割"
        description="vertical 或 orientation=&quot;vertical&quot;；适合上下分屏。"
        demoClassName={styles.demoStretch}
      >
        <div className={`${styles.shell} ${styles.shellVertical}`}>
          <Splitter vertical>
            <Splitter.Panel defaultSize="45%" min={72}>
              <div className={styles.panelDemo}>上方面板</div>
            </Splitter.Panel>
            <Splitter.Panel min={72}>
              <div className={styles.panelDemo}>下方面板</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </DemoBlock>

      <DemoBlock
        title="禁止拖拽"
        description="任一侧 Panel 设置 resizable={false} 时两侧都不可拖（分割条置灰）。"
        demoClassName={styles.demoStretch}
      >
        <div className={styles.shell}>
          <Splitter>
            <Splitter.Panel defaultSize={160} resizable={false}>
              <div className={styles.panelDemo}>固定不可拖</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div className={styles.panelDemo}>仍占剩余空间</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>

        <h3 className={styles.h3}>Splitter</h3>
        <p className={styles.apiNote}>根容器继承原生 div；子级请使用 compound：Splitter.Panel。</p>
        <ApiTable rows={splitterRows} />

        <h3 className={styles.h3}>Splitter.Panel</h3>
        <p className={styles.apiNote}>
          声明配置与内容；实际 DOM 由 Splitter 统一挂载。也可单独 import{' '}
          <code className={styles.inlineCode}>SplitterPanel</code>。
        </p>
        <ApiTable rows={panelRows} />
      </section>
    </article>
  );
}
