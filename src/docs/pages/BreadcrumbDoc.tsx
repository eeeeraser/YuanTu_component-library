import { Breadcrumb } from '../../components/Breadcrumb';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './BreadcrumbDoc.module.css';

const apiRows = [
  {
    name: 'items',
    description:
      '条目数组：普通项为 { title, href?, onClick?, className? }；分隔项为 { type: &quot;separator&quot;, separator? }。相邻两个普通项之间会自动插入 separator。',
    type: 'BreadcrumbItem[]',
  },
  {
    name: 'separator',
    description: '默认分隔符（默认 &quot;/&quot;）；显式 separator 条目可单独覆盖某一格',
    type: 'ReactNode',
  },
  {
    name: 'navigable',
    description:
      '为 false 时上级项仅展示、不渲染链接/按钮（忽略 href/onClick），无跳转；末级仍为当前页。文档站演示默认建议开启。',
    type: 'boolean',
  },
  {
    name: 'classNames',
    description: 'root / list / item / separator / link / linkButton / plain / current',
    type: 'BreadcrumbClassNames',
  },
  {
    name: 'className',
    description: '根节点 &lt;nav&gt;',
    type: 'string',
  },
  {
    name: 'aria-label',
    description: '无障碍标签，默认「面包屑」',
    type: 'string',
  },
];

export function BreadcrumbDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Breadcrumb 面包屑</h1>
        <p className={styles.lead}>
          展示当前页面在层级中的位置，并支持返回上级。默认与深灰底搭配：未选链接、中间文案与分隔符为浅银灰，当前页为品牌青（
          <code className={styles.inlineCode}>--color-teal-primary-500</code>
          ）；可在 <code className={styles.inlineCode}>semantic.css</code> 的 <code className={styles.inlineCode}>--breadcrumb-*</code>{' '}
          中微调。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>系统层级超过两级，需要标明「从哪来、当前在哪」。</li>
          <li>用户可能需要回到上级列表或模块入口。</li>
        </ul>
      </section>

      <DemoBlock
        title="基础"
        description="navigable={false} 时上级仅示意、不跳转；末级为当前页（aria-current=&quot;page&quot;）。业务里需要真实跳转时可省略该属性或设为 true。"
        code={`const items = [
  { title: '首页', href: '/home' },
  { title: '组件', href: '/components' },
  { title: '面包屑' },
];
<Breadcrumb navigable={false} items={items} />`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.inlineRow}>
          <Breadcrumb
            navigable={false}
            items={[
              { title: '首页', href: '/home' },
              { title: '组件', href: '/components' },
              { title: '面包屑' },
            ]}
          />
        </div>
      </DemoBlock>

      <DemoBlock
        title="自定义分隔符"
        description="通过 separator 统一替换相邻项之间的默认分隔符。"
        code={`<Breadcrumb
  navigable={false}
  separator=">"
  items={[
    { title: '工作台', href: '/desk' },
    { title: '项目', href: '/projects' },
    { title: '设置' },
  ]}
/>`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.inlineRow}>
          <Breadcrumb
            navigable={false}
            separator=">"
            items={[
              { title: '工作台', href: '/desk' },
              { title: '项目', href: '/projects' },
              { title: '设置' },
            ]}
          />
        </div>
      </DemoBlock>

      <DemoBlock
        title="插入独立分隔项"
        description="在 items 中加入 { type: &quot;separator&quot;, separator?: ReactNode }，可在某一格使用与其它位置不同的符号。"
        code={`items={[
  { title: '首页', href: '/home' },
  { type: 'separator', separator: ':' },
  { title: '应用', href: '/app' },
  { title: '详情' },
]}
<Breadcrumb navigable={false} items={items} />`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.inlineRow}>
          <Breadcrumb
            navigable={false}
            items={[
              { title: '首页', href: '/home' },
              { type: 'separator', separator: ':' },
              { title: '应用', href: '/app' },
              { title: '详情' },
            ]}
          />
        </div>
      </DemoBlock>

      <DemoBlock
        title="可导航（navigable 默认）"
        description="navigable 为 true（默认）时，上级可带 href 或 onClick；中间级无 href 时为纯文本。"
        code={`items={[
  { title: '首页', href: '/home' },
  { title: '列表', onClick: () => router.push('/list') },
  { title: '当前' },
];
<Breadcrumb items={items} />`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.inlineRow}>
          <Breadcrumb
            items={[
              {
                title: '首页',
                href: '#',
                onClick: (e) => {
                  e.preventDefault();
                },
              },
              {
                title: '列表',
                onClick: () => {
                  /* 演示：可接 router */
                },
              },
              { title: '当前' },
            ]}
          />
        </div>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>
        <h3 className={styles.h3}>Breadcrumb</h3>
        <p className={styles.apiNote}>根节点为 &lt;nav&gt;，列表为有序列表 &lt;ol&gt;，便于读屏与 SEO 语义。</p>
        <ApiTable rows={apiRows} />
      </section>
    </article>
  );
}
