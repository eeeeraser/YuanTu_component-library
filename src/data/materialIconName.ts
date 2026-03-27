/**
 * Figma / Material 图层名 snake_case → action 子路径导出的组件名（与 generate-action-icons.mjs 一致）。
 * 例：home → IconHome，account_balance → IconAccountBalance，3d_rotation → Icon3dRotation，123 → Icon123
 */
export function materialSnakeToIconComponentName(materialName: string): string {
  const parts = materialName.split('_');
  const pascal = parts
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      if (!part) return '';
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
  return `Icon${pascal}`;
}
