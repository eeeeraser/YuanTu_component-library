import type { DocPath } from '../route';
import { DOC_PATHS, hrefForDocPath } from '../route';
import { CodeBlock } from '../components/CodeBlock';
import styles from './Home.module.css';

type HomeProps = {
  onNavigate: (to: DocPath) => void;
};

const PKG_JSON = `{
  "dependencies": {
    "yuantu-component-library": "file:../源图组件库"
  }
}`;

const ENTRY_CSS = `import 'yuantu-component-library/semantic.css';
// semantic.css 已 @import primitives.css，无需重复引入 primitives`;

const USAGE_TSX = `import { Button } from 'yuantu-component-library';

export function Demo() {
  return (
    <Button variant="primary" size="md">
      提交
    </Button>
  );
}`;

const ACTION_ICON_TSX = `import { IconHome, IconSearch, IconAccountBalance } from 'yuantu-component-library/action';

export function Demo() {
  return (
    <>
      <IconHome size="md" color="brand" aria-label="首页" />
      <IconSearch aria-label="搜索" />
      <IconAccountBalance aria-label="账户" />
    </>
  );
}`;

export function Home({ onNavigate }: HomeProps) {
  return (
    <article className={styles.article}>
      <h1 className={styles.h1}>源图组件库</h1>
      <p className={styles.lead}>
        基于 Design Tokens（<code className={styles.code}>semantic.css</code>）的 React
        组件，交互与样式遵循项目内 Design System Rules。
      </p>

      <section className={styles.section} id="install">
        <h2 className={styles.h2}>安装</h2>

        <h3 className={styles.h3}>方式一：npm 本地路径（推荐）</h3>
        <p className={styles.p}>
          在<strong>业务项目</strong>的 <code className={styles.code}>package.json</code>{' '}
          中加入依赖，将 <code className={styles.code}>file:</code> 后的路径改为本仓库在你电脑上的相对或绝对路径。
        </p>
        <CodeBlock code={PKG_JSON} language="json" />
        <p className={styles.p}>然后在业务项目根目录执行：</p>
        <CodeBlock code="npm install" language="bash" />

        <h3 className={styles.h3}>方式二：复制源码</h3>
        <p className={styles.p}>
          将本仓库中的 <code className={styles.code}>src/components</code>、根目录{' '}
          <code className={styles.code}>semantic.css</code> 与{' '}
          <code className={styles.code}>primitives.css</code> 拷贝到业务工程中，按相对路径自行{' '}
          <code className={styles.code}>import</code>。样式与组件需保持相对路径关系（与仓库一致）。
        </p>
      </section>

      <section className={styles.section} id="usage">
        <h2 className={styles.h2}>调用</h2>

        <h3 className={styles.h3}>1. 引入全局样式（必须）</h3>
        <p className={styles.p}>在应用入口（如 <code className={styles.code}>main.tsx</code>）最先引入：</p>
        <CodeBlock code={ENTRY_CSS} language="tsx" />

        <h3 className={styles.h3}>2. 使用组件</h3>
        <CodeBlock code={USAGE_TSX} language="tsx" />

        <h3 className={styles.h3}>3. 图标（推荐：与 Figma「Action」一致）</h3>
        <p className={styles.p}>
          从 <code className={styles.code}>yuantu-component-library/action</code> 按需引入，共 453 个，图形为 Material
          Design Icons <strong>filled</strong>。命名：把 Figma 图层名{' '}
          <code className={styles.code}>snake_case</code> 各段首字母大写后拼成{' '}
          <code className={styles.code}>Icon</code> 前缀，例如 <code className={styles.code}>home</code> →{' '}
          <code className={styles.code}>IconHome</code>，<code className={styles.code}>account_balance</code> →{' '}
          <code className={styles.code}>IconAccountBalance</code>，<code className={styles.code}>3d_rotation</code> →{' '}
          <code className={styles.code}>Icon3dRotation</code>。
        </p>
        <CodeBlock code={ACTION_ICON_TSX} language="tsx" />

        <h3 className={styles.h3}>4. 图标（可选：MDI 全量）</h3>
        <p className={styles.p}>
          子路径 <code className={styles.code}>yuantu-component-library/mdi</code> 提供 @mdi/js 生成的
          7000+ 个 <code className={styles.code}>IconXxx</code>，命名与 Material 图层名不完全一致时可用此套。
        </p>

        <h3 className={styles.h3}>5. 对等依赖</h3>
        <p className={styles.p}>
          请确保业务项目已安装 <code className={styles.code}>react</code> 与{' '}
          <code className={styles.code}>react-dom</code>（建议 React 18 或 19），版本需满足本库的{' '}
          <code className={styles.code}>peerDependencies</code>。
        </p>
      </section>

      <section className={styles.section} id="start">
        <h2 className={styles.h2}>本地开发文档站</h2>
        <p className={styles.p}>在本仓库根目录执行：</p>
        <CodeBlock code="npm install\nnpm run dev" language="bash" />
        <p className={styles.p}>浏览器访问终端提示的本地地址即可预览组件与文档。</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>组件索引</h2>
        <ul className={styles.list}>
          <li>
            <a
              href={hrefForDocPath(DOC_PATHS.button)}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(DOC_PATHS.button);
              }}
            >
              Button 按钮
            </a>
            — 主按钮、次按钮、文字按钮、尺寸与图标。
          </li>
          <li>
            <a
              href={hrefForDocPath(DOC_PATHS.grid)}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(DOC_PATHS.grid);
              }}
            >
              Grid 栅格
            </a>
            — 12 列布局、行/列间距与列参考条。
          </li>
          <li>
            <a
              href={hrefForDocPath(DOC_PATHS.icon)}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(DOC_PATHS.icon);
              }}
            >
              Icon 图标
            </a>
            — 24×24 视口、语义色；Figma Action 453 个见 <code className={styles.code}>action</code> 子路径。
          </li>
        </ul>
      </section>
    </article>
  );
}
