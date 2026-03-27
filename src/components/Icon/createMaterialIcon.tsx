import { forwardRef } from 'react';
import { Icon } from './Icon';
import type { IconProps } from './types';

/** 将 Material filled SVG 中的一条或多条 path 封装为带 Token 的图标组件 */
export function createMaterialIcon(pathDs: readonly string[], displayName: string) {
  const C = forwardRef<SVGSVGElement, IconProps>(function MaterialIconByPath(props, ref) {
    return (
      <Icon ref={ref} {...props}>
        {pathDs.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </Icon>
    );
  });
  C.displayName = displayName;
  return C;
}
