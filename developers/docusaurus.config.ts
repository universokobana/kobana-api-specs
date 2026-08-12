import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Kobana para Desenvolvedores',
  tagline: 'Documentação da API da Kobana',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      ssgWorkerThreads: true,
    },
  },

  url: 'https://developers.kobana.com.br',
  baseUrl: '/',

  organizationName: 'universokobana',
  projectName: 'kobana-api-specs',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
    localeConfigs: {
      'pt-BR': {label: 'Português', htmlLang: 'pt-BR'},
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/img/site.webmanifest',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          docItemComponent: '@theme/ApiItem',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'Kobana para Desenvolvedores',
        siteDescription:
          'Documentação da API da Kobana: autenticação, bancos suportados, webhooks e a referência completa das APIs v1 e v2.',
        depth: 3,
        logLevel: 0,
        content: {
          enableMarkdownFiles: true,
          enableLlmsFullTxt: true,
          relativePaths: false,
          // 300+ generated endpoint pages would drown the guides; the OpenAPI
          // documents themselves are the machine-readable form of that content
          // and are published under /openapi/.
          excludeRoutes: ['**/api/v1/**', '**/api/v2/**'],
        },
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          // `openapi/*` is produced by `npm run prepare-specs` from the specs
          // at the repo root: the same documents, with an explicit
          // `operationId` on every operation so no two pages collide. The
          // untouched originals are published under `/openapi/` from
          // `static/openapi/`.
          v1: {
            specPath: 'openapi/kobana-api-v1_0.json',
            outputDir: 'docs/api/v1',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            hideSendButton: false,
            showSchemas: false,
          },
          v2: {
            specPath: 'openapi/kobana-api-v2_0.json',
            outputDir: 'docs/api/v2',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            hideSendButton: false,
            showSchemas: false,
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs', '@docusaurus/theme-mermaid'],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Desenvolvedores',
      logo: {
        alt: 'Kobana',
        src: 'img/kobana-logo-hor-positivo.png',
        srcDark: 'img/kobana-logo-hor-negativo.png',
        width: 144,
        height: 28,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/universokobana/kobana-api-specs',
          label: 'Specs',
          position: 'right',
        },
        {
          href: 'https://app.kobana.com.br',
          label: 'Entrar',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Kobana',
        src: 'img/kobana-logo-light.png',
        href: 'https://www.kobana.com.br',
        width: 120,
      },
      links: [
        {
          title: 'Documentação',
          items: [
            {label: 'Começando', to: '/comecando'},
            {label: 'Sandbox', to: '/comecando/sandbox'},
            {label: 'SDKs e Bibliotecas', to: '/comecando/bibliotecas'},
          ],
        },
        {
          title: 'API',
          items: [
            {label: 'Visão geral', to: '/api/visao-geral'},
            {label: 'Autenticação', to: '/api/autenticacao'},
            {label: 'Referência v1', to: '/api/v1'},
            {label: 'Referência v2', to: '/api/v2'},
          ],
        },
        {
          title: 'Kobana',
          items: [
            {label: 'Site', href: 'https://www.kobana.com.br'},
            {label: 'Central de Ajuda', href: 'https://ajuda.kobana.com.br'},
            {label: 'Status', href: 'https://status.kobana.com.br'},
            {label: 'GitHub', href: 'https://github.com/universokobana'},
          ],
        },
      ],
      copyright: `© 2008/${new Date().getFullYear()} Kobana Tecnologia Ltda. | CNPJ: 05.813.794/0001-26 | Calçada das Margaridas, 163, Sala 02 — Centro Comercial Alphaville — Barueri, SP — 06453-038`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash', 'ruby', 'php', 'python', 'java', 'csharp', 'http'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
