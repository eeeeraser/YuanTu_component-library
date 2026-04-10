import { useCallback, useEffect, useState } from 'react';
import { DocsLayout } from './docs/DocsLayout';
import { Home } from './docs/pages/Home';
import { ButtonDoc } from './docs/pages/ButtonDoc';
import { GridDoc } from './docs/pages/GridDoc';
import { IconDoc } from './docs/pages/IconDoc';
import { TypographyDoc } from './docs/pages/TypographyDoc';
import { DividerDoc } from './docs/pages/DividerDoc';
import { LayoutDoc } from './docs/pages/LayoutDoc';
import { SplitterDoc } from './docs/pages/SplitterDoc';
import { BreadcrumbDoc } from './docs/pages/BreadcrumbDoc';
import { DOC_PATHS, hrefForDocPath, normalizePathname, type DocPath } from './docs/route';

export function App() {
  const [path, setPath] = useState<DocPath>(() => normalizePathname());

  useEffect(() => {
    const onPop = () => setPath(normalizePathname());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: DocPath) => {
    window.history.pushState({}, '', hrefForDocPath(to));
    setPath(to);
  }, []);

  return (
    <DocsLayout activePath={path} onNavigate={navigate}>
      {path === DOC_PATHS.home ? (
        <Home onNavigate={navigate} />
      ) : path === DOC_PATHS.grid ? (
        <GridDoc />
      ) : path === DOC_PATHS.icon ? (
        <IconDoc />
      ) : path === DOC_PATHS.typography ? (
        <TypographyDoc />
      ) : path === DOC_PATHS.divider ? (
        <DividerDoc />
      ) : path === DOC_PATHS.layout ? (
        <LayoutDoc />
      ) : path === DOC_PATHS.splitter ? (
        <SplitterDoc />
      ) : path === DOC_PATHS.breadcrumb ? (
        <BreadcrumbDoc />
      ) : (
        <ButtonDoc />
      )}
    </DocsLayout>
  );
}
