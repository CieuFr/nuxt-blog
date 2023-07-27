// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,600;1,400&display=swap'},
      ]
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  content: {
    highlight: {
      theme: 'github-dark',
    }
  }
})
