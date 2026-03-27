import { Icon } from '../../components/Icon';
import { IconHome, IconSearch } from '../../components/Icon/action';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import { IconGallery } from '../components/IconGallery';
import styles from './IconDoc.module.css';

const apiRows = [
  {
    name: 'size',
    description: '图标边长：sm=spacing-200，md=spacing-300（默认，与 Figma 24px 一致），lg=spacing-400',
    type: "'sm' | 'md' | 'lg'",
  },
  {
    name: 'color',
    description: '语义色，对应 --color-icon-* / --color-text-*',
    type: 'IconColor',
  },
  {
    name: 'className',
    description: 'svg 根节点 className',
    type: 'string',
  },
  {
    name: 'aria-label',
    description: '有含义时建议填写；未填时视为装饰性图标并 aria-hidden',
    type: 'string',
  },
  {
    name: 'children',
    description: 'path 等 SVG 子节点（预置图标已内置 path）',
    type: 'ReactNode',
  },
];

const USAGE_CODE = `import { IconSearch } from 'yuantu-component-library/action';

<IconSearch size="md" color="brand" aria-label="搜索" />`;

const CUSTOM_CODE = `import { Icon } from 'yuantu-component-library';

<Icon size="md" color="info" aria-label="自定义">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
</Icon>`;

const BULK_CODE = `// Figma「Action」453 个：从 yuantu-component-library/action 按需引入（与图层名对应规则见文档首页）。
import { IconHome, IconSearch } from 'yuantu-component-library/action';

<IconHome aria-label="首页" />
<IconSearch aria-label="搜索" />`;

export function IconDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Icon 图标</h1>
        <p className={styles.lead}>
          设计规范以 Figma 文件中的「Action」画板为准（共 453 个 Material 名称，snake_case）。文档中的图标库使用{' '}
          <a
            className={styles.externalLink}
            href="https://www.figma.com/design/bvVSFMDvoyaVIr7dWomlb4/%E8%AE%BE%E8%AE%A1%E5%B8%88kev?node-id=69-5052"
            target="_blank"
            rel="noreferrer"
          >
            同一组名称与顺序
          </a>
          ，图形为 Material Design Icons <strong>filled</strong>。业务代码请优先使用{' '}
          <code className={styles.inlineCode}>yuantu-component-library/action</code> 中封装的 453 个组件（图层名{' '}
          <code className={styles.inlineCode}>snake_case</code> → <code className={styles.inlineCode}>Icon</code>
          + PascalCase 各段）。另可选 <code className={styles.inlineCode}>/mdi</code>（@mdi/js 全量，命名与 Material
          不完全一致）。尺寸与颜色使用语义 Token。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>导航、按钮前缀、空状态、列表操作等需要统一线框风格时。</li>
          <li>需要与语义色（品牌、禁用、错误等）一致时，使用 <code className={styles.inlineCode}>color</code> 属性。</li>
          <li>
            在入口按需 <code className={styles.inlineCode}>{'import { IconXxx }'}</code>
            ，构建工具会 tree-shake 未使用的分块。
          </li>
        </ul>
      </section>

      <DemoBlock
        title="图标库（Figma Action）"
        description={
          <>
            严格对应 Figma「Action」画板：共 453 个；支持搜索与分页。点击单元格可复制{' '}
            <code className={styles.inlineCode}>yuantu-component-library/action</code> 的 import 语句；命名规则：图层名
            snake_case → <code className={styles.inlineCode}>Icon</code> + 各段首字母大写（如 <code className={styles.inlineCode}>search</code> →{' '}
            <code className={styles.inlineCode}>IconSearch</code>）。
          </>
        }
        code={BULK_CODE}
      >
        <IconGallery />
      </DemoBlock>

      <DemoBlock title="尺寸" description="sm / md / lg 对应 spacing token。">
        <div className={styles.demoRow}>
          <IconHome size="sm" color="brand" aria-label="小" />
          <IconHome size="md" color="brand" aria-label="中" />
          <IconHome size="lg" color="brand" aria-label="大" />
        </div>
      </DemoBlock>

      <DemoBlock title="语义色" code={USAGE_CODE}>
        <div className={styles.demoRow}>
          <IconSearch color="default" aria-label="default" />
          <IconSearch color="brandHover" aria-label="brandHover" />
          <IconSearch color="secondary" aria-label="secondary" />
          <IconSearch color="disabled" aria-label="disabled" />
          <IconSearch color="error" aria-label="error" />
          <IconSearch color="info" aria-label="info" />
          <IconSearch color="success" aria-label="success" />
          <IconSearch color="warning" aria-label="warning" />
        </div>
      </DemoBlock>

      <DemoBlock title="自定义 path" description="与预置组件相同用法。" code={CUSTOM_CODE} codeLanguage="tsx">
        <Icon size="lg" color="info" aria-label="信息">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </Icon>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>
        <div className={styles.apiBlock}>
          <p className={styles.apiNote}>Icon</p>
          <ApiTable rows={apiRows} />
        </div>
      </section>
    </article>
  );
}
