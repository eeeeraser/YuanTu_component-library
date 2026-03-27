import { forwardRef } from 'react';
import { Icon } from './Icon';
import type { IconProps } from './types';

/** 将 @mdi/js 的路径字符串封装为带 Token 的图标组件 */
export function createMdiIcon(pathData: string, displayName: string) {
  const C = forwardRef<SVGSVGElement, IconProps>(function MdiIconByPath(props, ref) {
    return (
      <Icon ref={ref} {...props}>
        <path d={pathData} />
      </Icon>
    );
  });
  C.displayName = displayName;
  return C;
}
