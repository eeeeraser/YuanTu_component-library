import styles from './ApiTable.module.css';

export type ApiRow = {
  name: string;
  description: string;
  type: string;
};

type ApiTableProps = {
  rows: ApiRow[];
};

export function ApiTable({ rows }: ApiTableProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colParam} />
          <col className={styles.colDesc} />
          <col className={styles.colType} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.th}>参数</th>
            <th className={styles.th}>说明</th>
            <th className={styles.th}>类型</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className={styles.td}>
                <code className={styles.name}>{row.name}</code>
              </td>
              <td className={styles.td}>{row.description}</td>
              <td className={styles.td}>
                <code className={styles.type}>{row.type}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
