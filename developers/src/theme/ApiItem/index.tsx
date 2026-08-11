import React from 'react';
import Loadable from 'react-loadable';
import DocItem from '@theme/DocItem';
import type {Props} from '@theme/DocItem';

// SSR-safe lazy load of the openapi theme's ApiItem so that non-API docs
// (home, plain pages) don't drag in ~1MB of Redux + faker-driven code.
// react-loadable is what Docusaurus itself uses for route splitting: the
// server records which dynamic modules were rendered and the client
// pre-loads them before hydration, so SSR (with the Redux <Provider>)
// matches the first client render. Plain React.lazy + Suspense produced
// a hydration mismatch and crashed with
// "Cannot destructure 'store' of t(...) as it is null".
const OriginalApiItem = Loadable({
  loader: () => import('@theme-original/ApiItem' as string),
  loading: () => null,
  modules: ['@theme-original/ApiItem'],
  webpack: () => [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    (require as any).resolveWeak('@theme-original/ApiItem'),
  ],
} as any) as React.ComponentType<any>;

export default function ApiItem(props: Props) {
  const fm =
    (props as any)?.content?.frontMatter ??
    (props as any)?.content?.metadata?.frontMatter ??
    {};
  const isApi = Boolean(fm.api || fm.schema || fm.sample || fm.info_path);
  if (!isApi) return <DocItem {...props} />;
  return <OriginalApiItem {...(props as any)} />;
}
