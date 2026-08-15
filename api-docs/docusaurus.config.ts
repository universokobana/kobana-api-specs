import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const CURRENT_LOCALE = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'pt-BR';

const LOCALIZED_TITLE: Record<string, string> = {
  'pt-BR': 'Gateway Bancário',
  en: 'Banking Gateway',
  es: 'Gateway Bancario',
};

const LOCALIZED_TAGLINE: Record<string, string> = {
  'pt-BR': 'Documentação da API de automação bancária da Kobana',
  en: 'Documentation for the Kobana banking automation API',
  es: 'Documentación de la API de automatización bancaria de Kobana',
};

type LocalePaths = {pt: string; en: string; es: string};
const KB_BASE = 'https://www.kobana.com.br';
const kb = (paths: LocalePaths | string): string => {
  if (typeof paths === 'string') return `${KB_BASE}${paths}`;
  const key = CURRENT_LOCALE === 'en' ? 'en' : CURRENT_LOCALE === 'es' ? 'es' : 'pt';
  return `${KB_BASE}${paths[key]}`;
};

const config: Config = {
  title: (LOCALIZED_TITLE[CURRENT_LOCALE] ?? LOCALIZED_TITLE['pt-BR']) as string,
  tagline: (LOCALIZED_TAGLINE[CURRENT_LOCALE] ?? LOCALIZED_TAGLINE['pt-BR']) as string,
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

  url: 'https://docs.banking.kobana.com.br',
  baseUrl: (() => {
    const l = process.env.BUILD_LOCALE;
    if (l === 'pt') return '/pt/';
    if (l === 'en') return '/en/';
    if (l === 'es') return '/es/';
    return '/';
  })(),

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
    locales: ['pt-BR', 'en', 'es'],
    localeConfigs: {
      'pt-BR': {label: 'Português', htmlLang: 'pt-BR', path: 'pt'},
      en: {label: 'English', htmlLang: 'en', path: 'en'},
      es: {label: 'Español', htmlLang: 'es', path: 'es'},
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
        siteTitle: 'Gateway Bancário — Documentação',
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
          // `static/openapi/`. The `*En`/`*Es` entries read machine-translated
          // copies produced by `scripts/translate-openapi.mjs` and write
          // straight into each locale's i18n content dir.
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
          v1En: {
            specPath: 'openapi/i18n/kobana-api-v1_0.en.json',
            outputDir: 'i18n/en/docusaurus-plugin-content-docs/current/api/v1',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            hideSendButton: false,
            showSchemas: false,
          },
          v2En: {
            specPath: 'openapi/i18n/kobana-api-v2_0.en.json',
            outputDir: 'i18n/en/docusaurus-plugin-content-docs/current/api/v2',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            hideSendButton: false,
            showSchemas: false,
          },
          v1Es: {
            specPath: 'openapi/i18n/kobana-api-v1_0.es.json',
            outputDir: 'i18n/es/docusaurus-plugin-content-docs/current/api/v1',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            hideSendButton: false,
            showSchemas: false,
          },
          v2Es: {
            specPath: 'openapi/i18n/kobana-api-v2_0.es.json',
            outputDir: 'i18n/es/docusaurus-plugin-content-docs/current/api/v2',
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
      title: 'Gateway Bancário',
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
          href: 'https://app.kobana.com.br/users/sign_in',
          label: 'Entrar',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Kobana',
        src: 'img/kobana-logo-light.png',
        href: kb(''),
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
            {label: 'Visão geral', to: '/api/overview'},
            {label: 'Autenticação', to: '/api/overview/authentication'},
            {label: 'Referência v1', to: '/api/v1'},
            {label: 'Referência v2', to: '/api/v2'},
          ],
        },
        {
          title: 'Kobana',
          items: [
            {label: 'Site', href: kb('')},
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
