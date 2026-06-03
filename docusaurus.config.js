import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Notes',
  tagline: 'DSA & Deep Learning',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://wurstdieb.github.io',
  baseUrl: '/Notes/',

  organizationName: 'wurstdieb',
  projectName: 'Notes',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'dsaSidebar',
          position: 'left',
          label: 'DSA',
        },
        {
          href: 'https://github.com/wurstdieb/Notes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Built with Docusaurus`,
    },
    prism: {
  theme: prismThemes.nightOwlLight,
  darkTheme: prismThemes.nightOwl,
  additionalLanguages: ['cpp', 'python'],
},
  }),
};

export default config;