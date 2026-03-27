import { Button } from '../../components/Button';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import { IconBolt, IconPlus } from '../icons';
import styles from './ButtonDoc.module.css';

const apiRows = [
  {
    name: 'variant',
    description: '按钮视觉类型：主按钮、描边、纯文字',
    type: "'primary' | 'secondary' | 'tertiary'",
  },
  {
    name: 'size',
    description: '尺寸',
    type: "'sm' | 'md' | 'lg'",
  },
  {
    name: 'shape',
    description: '外形：默认圆角或胶囊（非 iconOnly 时）',
    type: "'default' | 'pill'",
  },
  {
    name: 'iconOnly',
    description: '是否仅展示图标',
    type: 'boolean',
  },
  {
    name: 'iconShape',
    description: 'iconOnly 时图标容器为方形圆角或正圆',
    type: "'square' | 'circle'",
  },
  {
    name: 'icon',
    description: '左侧图标/前缀',
    type: 'ReactNode',
  },
  {
    name: 'suffix',
    description: '右侧图标/后缀',
    type: 'ReactNode',
  },
  {
    name: 'loading',
    description: '加载中（禁用点击并展示占位）',
    type: 'boolean',
  },
  {
    name: 'htmlType',
    description: '原生 button 的 type（避免与视觉 variant 混淆）',
    type: "'button' | 'submit' | 'reset'",
  },
  {
    name: 'classNames',
    description: '为根节点、内容区、文案、前后图标槽分别传入 className',
    type: 'ButtonSlotClassNames',
  },
  {
    name: 'className',
    description: '根节点额外 className',
    type: 'string',
  },
  {
    name: 'disabled',
    description: '禁用',
    type: 'boolean',
  },
  {
    name: 'children',
    description: '按钮文案（iconOnly 时可作为唯一图标内容）',
    type: 'ReactNode',
  },
];

export function ButtonDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Button 按钮</h1>
        <p className={styles.lead}>
          用于触发操作或导航；样式与间距来自语义 Token，交互动效为 200ms ease-in-out。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>用户需要触发即时操作时（提交、打开弹窗、下一步等）。</li>
          <li>需要区分主次：主按钮突出主路径，次按钮与文字按钮降低视觉权重。</li>
          <li>表单内提交请配合 <code className={styles.inlineCode}>htmlType=&quot;submit&quot;</code>。</li>
        </ul>
      </section>

      <DemoBlock
        title="按钮类型"
        description="primary 使用品牌面与行动态文字色；secondary 为描边；tertiary 为纯文字。"
        code={`<Button variant="primary">主按钮</Button>
<Button variant="secondary">次按钮</Button>
<Button variant="tertiary">文字按钮</Button>`}
      >
        <Button variant="primary">主按钮</Button>
        <Button variant="secondary">次按钮</Button>
        <Button variant="tertiary">文字按钮</Button>
      </DemoBlock>

      <DemoBlock
        title="按钮尺寸"
        description="sm / md / lg 对应不同内边距与字阶（由 spacing token 表达）。"
        code={`<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>`}
      >
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="primary" size="md">
          Medium
        </Button>
        <Button variant="primary" size="lg">
          Large
        </Button>
      </DemoBlock>

      <DemoBlock
        title="图标按钮"
        description="通过 icon / suffix 插槽组合；iconOnly 用于仅图标场景。"
        code={`<Button variant="primary" icon={<IconPlus />} suffix={<IconBolt />}>
  Button
</Button>
<Button variant="primary" iconOnly iconShape="square" icon={<IconPlus />} />
<Button variant="primary" iconOnly iconShape="circle" icon={<IconPlus />} />`}
      >
        <Button variant="primary" icon={<IconPlus />} suffix={<IconBolt />}>
          Button
        </Button>
        <Button variant="primary" iconOnly iconShape="square" icon={<IconPlus />} />
        <Button variant="primary" iconOnly iconShape="circle" icon={<IconPlus />} />
      </DemoBlock>

      <DemoBlock
        title="胶囊形状"
        description="shape=&quot;pill&quot; 用于胶囊外形（文本按钮）。"
        code={`<Button variant="primary" shape="pill" icon={<IconPlus />}>
  Button
</Button>`}
      >
        <Button variant="primary" shape="pill" icon={<IconPlus />}>
          Button
        </Button>
        <Button variant="secondary" shape="pill">
          Button
        </Button>
      </DemoBlock>

      <DemoBlock
        title="加载与禁用"
        code={`<Button variant="primary" loading>Loading</Button>
<Button variant="primary" disabled>Disabled</Button>`}
      >
        <Button variant="primary" loading>
          Loading
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>
        <h3 className={styles.h3}>ButtonProps</h3>
        <p className={styles.apiNote}>
          除下表外，继承原生 <code className={styles.inlineCode}>button</code> 属性（已 Omit{' '}
          <code className={styles.inlineCode}>type</code>，请使用 <code className={styles.inlineCode}>htmlType</code>{' '}
          表示 submit 等）。
        </p>
        <ApiTable rows={apiRows} />
      </section>
    </article>
  );
}
