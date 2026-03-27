import { Grid, GridCol, GridRow } from '../../components/Grid';
import { DemoBlock } from '../components/DemoBlock';
import { ApiTable } from '../components/ApiTable';
import styles from './GridDoc.module.css';

const apiRows = [
  {
    name: 'showGuides',
    description: '是否显示 12 列半透明参考竖条，便于与设计稿列宽对齐',
    type: 'boolean',
  },
  {
    name: 'className',
    description: '根节点额外 className',
    type: 'string',
  },
  {
    name: 'children',
    description: '子节点，通常为若干 GridRow',
    type: 'ReactNode',
  },
];

const apiRowRows = [
  {
    name: 'className',
    description: '行容器 className',
    type: 'string',
  },
  {
    name: 'children',
    description: 'GridCol 或其它内容',
    type: 'ReactNode',
  },
];

const apiColRows = [
  {
    name: 'span',
    description: '占据列数（1–12），同一行内各列 span 之和应为 12',
    type: 'number',
  },
  {
    name: 'className',
    description: '列单元格 className',
    type: 'string',
  },
  {
    name: 'children',
    description: '列内容',
    type: 'ReactNode',
  },
];

const DEMO_CODE = `<Grid showGuides>
  <GridRow>
    <GridCol span={12}>12-100%</GridCol>
  </GridRow>
  <GridRow>
    <GridCol span={6}>6-50%</GridCol>
    <GridCol span={6}>6-50%</GridCol>
  </GridRow>
  <GridRow>
    <GridCol span={4}>3-33.33%</GridCol>
    <GridCol span={4}>3-33.33%</GridCol>
    <GridCol span={4}>3-33.33%</GridCol>
  </GridRow>
  <GridRow>
    <GridCol span={2}>6-16.66%</GridCol>
    <GridCol span={2}>6-16.66%</GridCol>
    <GridCol span={2}>6-16.66%</GridCol>
    <GridCol span={2}>6-16.66%</GridCol>
    <GridCol span={2}>6-16.66%</GridCol>
    <GridCol span={2}>6-16.66%</GridCol>
  </GridRow>
</Grid>`;

export function GridDoc() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Grid 栅格</h1>
        <p className={styles.lead}>
          12 列流式栅格，列间距与行间距均为{' '}
          <code className={styles.inlineCode}>--spacing-300</code>（24px），与 Figma
          设计稿一致；配色在业务中通过列内样式或子组件完成。
        </p>
      </header>

      <section className={styles.section} id="when">
        <h2 className={styles.h2}>何时使用</h2>
        <ul className={styles.ul}>
          <li>页面级区块需要按 12 列对齐、等分或组合分栏（如 6+6、4+4+4）。</li>
          <li>需要与设计师在 12 栅格上约定宽度时，可开启 <code className={styles.inlineCode}>showGuides</code> 对照。</li>
        </ul>
      </section>

      <DemoBlock
        title="12 列示例（设计稿结构）"
        titleClassName={styles.gridDemoTitle}
        descClassName={styles.gridDemoDesc}
        demoClassName={styles.demoStretch}
        description={
          <>
            下列示意对应设计稿中「12-100% / 6-50% / 3-33.33% / 6-16.66%」四行；色块与字色使用 Token。
          </>
        }
        code={DEMO_CODE}
      >
        <div className={styles.demoCanvas}>
          <Grid showGuides>
            <GridRow>
              <GridCol span={12} className={styles.demoCell}>
                12-100%
              </GridCol>
            </GridRow>
            <GridRow>
              <GridCol span={6} className={styles.demoCell}>
                6-50%
              </GridCol>
              <GridCol span={6} className={styles.demoCell}>
                6-50%
              </GridCol>
            </GridRow>
            <GridRow>
              <GridCol span={4} className={styles.demoCell}>
                3-33.33%
              </GridCol>
              <GridCol span={4} className={styles.demoCell}>
                3-33.33%
              </GridCol>
              <GridCol span={4} className={styles.demoCell}>
                3-33.33%
              </GridCol>
            </GridRow>
            <GridRow>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
              <GridCol span={2} className={styles.demoCell}>
                6-16.66%
              </GridCol>
            </GridRow>
          </Grid>
        </div>
      </DemoBlock>

      <section className={styles.section} id="api">
        <h2 className={styles.h2}>API</h2>
        <div className={styles.apiBlock}>
          <p className={styles.apiNote}>Grid</p>
          <ApiTable rows={apiRows} />
        </div>
        <div className={styles.apiBlock}>
          <p className={styles.apiNote}>GridRow</p>
          <ApiTable rows={apiRowRows} />
        </div>
        <div className={styles.apiBlock}>
          <p className={styles.apiNote}>GridCol</p>
          <ApiTable rows={apiColRows} />
        </div>
      </section>
    </article>
  );
}
