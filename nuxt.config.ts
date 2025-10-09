import { repositoryName, apiEndpoint } from './slicemachine.config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Prismic + Nuxt Minimal Starter',
      htmlAttrs: { lang: 'en' },
      meta: [{ charset: 'utf-8' },
        { name: 'apple-mobile-web-app-title', content: 'Farbe'},
      ],

      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {rel: 'apple-touch-icon', href: '/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', href: '/favicon-96x096.png', sizes: '96x96'},
        {rel: 'icon', type: 'image/svg+xml', href: '/favicon-svg'},
        {rel: 'manifest', href: '(site.manifest'}
      ],
    }
  },

  modules: ['@nuxt/eslint', '@nuxtjs/prismic'],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'page',
          uid: 'home',
          path: '/',
        },
      ]
    }
  },

  compatibilityDate: '2025-07-16',
})