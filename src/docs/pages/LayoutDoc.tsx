import { useState } from 'react';
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
} from '../../components/Layout';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './LayoutDoc.module.css';

const layoutRows = [
  { name: 'direction', description: '子区域排列方向', type: "'vertical' | 'horizontal'" },
  { name: 'classNames', description: '根节点 className', type: 'LayoutRootClassNames' },
  { name: 'className', description: '根节点额外 className', type: 'string' },
  { name: 'children', description: '子节点', type: 'ReactNode' },
];

const regionRows = [
  { name: 'classNames', description: '根节点 className', type: '{ root?: string }' },
  { name: 'className', description: '额外 className', type: 'string' },
  { name: 'children', description: '内容', type: 'ReactNode' },
];

const siderRows = [
  { name: 'width', description: '展开宽度，默认 200px（--layout-sider-width）', type: 'number | string' },
  {
    name: 'collapsedWidth',
    description: '收起宽度，默认 64px（--layout-sider-collapsed-width）',
    type: 'number | string',
  },
  { name: 'collapsible', description: '是否显示底部折叠触发器', type: 'boolean' },
  { name: 'collapsed', description: '受控收起态', type: 'boolean' },
  { name: 'defaultCollapsed', description: '非受控初始收起', type: 'boolean' },
  { name: 'onCollapse', description: '收起/展开回调', type: '(collapsed: boolean) => void' },
  { name: 'theme', description: '侧栏底色档位', type: "'dark' | 'light'" },
  {
    name: 'trigger',
    description: '自定义触发器内容；null 隐藏按钮（仍可通过受控 collapsed 收起）',
    type: 'ReactNode | null',
  },
  { name: 'classNames', description: 'root / inner / trigger', type: 'LayoutSiderClassNames' },
  { name: 'className', description: '根节点额外 className', type: 'string' },
  { name: 'children', description: '侧栏主体', type: 'ReactNode' },
];

function LayoutDemoHeader({ title }: { title: string }) {
  return (
    <div className={styles.headerBar}>
      <span className={styles.headerTitle}>{title}</span>
      <nav className={styles.headerNav} aria-label="顶栏操作">
        <button type="button" className={styles.headerItem}>
          顶栏项 A
        </button>
        <button type="button" className={styles.headerItem}>
          顶栏项 B
        </button>
      </nav>
    </div>
  );
}

function SiderCollapseDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`${styles.shell} ${styles.shellTall}`}>
      <Layout>
        <LayoutHeader>
          <LayoutDemoHeader title="顶栏 · 受控收起示例" />
        </LayoutHeader>
        <Layout direction="horizontal" style={{ flex: 1, minHeight: 0 }}>
          <LayoutSider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            theme="dark"
          >
            <ul className={styles.navList}>
              <li>导航一</li>
              <li>导航二</li>
              <li>导航三</li>
            </ul>
          </LayoutSider>
          <LayoutContent>主工作区：当前 {collapsed ? '已收起' : '已展开'}。</LayoutContent>
        </Layout>
        <LayoutFooter>页脚</LayoutFooter>
      </Layout>
    </div>
  );
}

export function LayoutDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Layout 布局</h1>
        <p className={styles.lead}>
          页面级骨架：顶栏、侧栏、主区、底栏；基于 Flex 组合。颜色、间距与侧栏尺寸来自{' '}
          <code className={styles.inlineCode}>semantic.css</code> 中的{' '}
          <code className={styles.inlineCode}>--layout-*</code> Token。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>后台、控制台等需要顶栏 + 侧栏 + 主内容区的经典结构。</li>
          <li>需要可收起侧栏以腾出横向空间时，使用 LayoutSider 的 collapsible。</li>
        </ul>
      </section>

      <section className={styles.section} id="tokens">
        <h2 className={styles.h2}>相关 Token</h2>
        <ul className={styles.tokenList}>
          <li>
            <code className={styles.inlineCode}>--layout-header-min-height</code>、
            <code className={styles.inlineCode}>--layout-header-bg</code>、
            <code className={styles.inlineCode}>--layout-header-padding-inline</code>
          </li>
          <li>
            <code className={styles.inlineCode}>--layout-content-bg</code>、
            <code className={styles.inlineCode}>--layout-content-padding</code>
          </li>
          <li>
            <code className={styles.inlineCode}>--layout-footer-*</code>、
            <code className={styles.inlineCode}>--layout-sider-width</code>、
            <code className={styles.inlineCode}>--layout-sider-collapsed-width</code>、
            <code className={styles.inlineCode}>--layout-sider-bg</code> 等
          </li>
          <li>
            Layout 内边线使用 <code className={styles.inlineCode}>--layout-border-subtle</code>（由{' '}
            <code className={styles.inlineCode}>--color-border-divider</code> 混合透明，可调比例）
          </li>
        </ul>
      </section>

      <DemoBlock
        title="顶栏 · 主区 · 底栏"
        description="纵向 Layout：Header / Content / Footer。"
        code={`<Layout>
  <LayoutHeader>
    <nav aria-label="顶栏操作">
      <button type="button">顶栏项 A</button>
      <button type="button">顶栏项 B</button>
    </nav>
  </LayoutHeader>
  <LayoutContent>…</LayoutContent>
  <LayoutFooter>…</LayoutFooter>
</Layout>`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.shell}>
          <Layout>
            <LayoutHeader>
              <LayoutDemoHeader title="顶栏" />
            </LayoutHeader>
            <LayoutContent>主内容区</LayoutContent>
            <LayoutFooter>页脚</LayoutFooter>
          </Layout>
        </div>
      </DemoBlock>

      <DemoBlock
        title="顶栏 + 侧栏 + 主区"
        description="中间一层使用 direction=&quot;horizontal&quot;，左侧 LayoutSider，右侧 LayoutContent。"
        code={`<LayoutHeader>…顶栏项 A、B（文档站带 hover 样式）</LayoutHeader>
<Layout direction="horizontal">
  <LayoutSider theme="dark">…</LayoutSider>
  <LayoutContent>…</LayoutContent>
</Layout>`}
        demoClassName={styles.demoStretch}
      >
        <div className={styles.shell}>
          <Layout>
            <LayoutHeader>
              <LayoutDemoHeader title="顶栏" />
            </LayoutHeader>
            <Layout direction="horizontal" style={{ flex: 1, minHeight: 0 }}>
              <LayoutSider theme="dark">
                <ul className={styles.navList}>
                  <li>侧栏项 A</li>
                  <li>侧栏项 B</li>
                </ul>
              </LayoutSider>
              <LayoutContent>主工作区</LayoutContent>
            </Layout>
          </Layout>
        </div>
      </DemoBlock>

      <DemoBlock
        title="可收起侧栏"
        description="collapsible 展示底部触发器；可用 collapsed + onCollapse 受控。"
        demoClassName={styles.demoStretch}
      >
        <SiderCollapseDemo />
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>

        <h3 className={styles.h3}>Layout</h3>
        <p className={styles.apiNote}>根容器；继承原生 div 属性。</p>
        <ApiTable rows={layoutRows} />

        <h3 className={styles.h3}>LayoutHeader</h3>
        <p className={styles.apiNote}>渲染为 <code className={styles.inlineCode}>header</code>。</p>
        <ApiTable rows={regionRows} />

        <h3 className={styles.h3}>LayoutContent</h3>
        <p className={styles.apiNote}>渲染为 <code className={styles.inlineCode}>div</code>（避免文档内多个 main）。</p>
        <ApiTable rows={regionRows} />

        <h3 className={styles.h3}>LayoutFooter</h3>
        <p className={styles.apiNote}>渲染为 <code className={styles.inlineCode}>footer</code>。</p>
        <ApiTable rows={regionRows} />

        <h3 className={styles.h3}>LayoutSider</h3>
        <p className={styles.apiNote}>渲染为 <code className={styles.inlineCode}>aside</code>。</p>
        <ApiTable rows={siderRows} />
      </section>
    </article>
  );
}
