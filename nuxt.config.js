export default {

  mode: 'spa',

  css: [
    '~/assets/css/main.less',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  head: {
    title: 'word-keeper',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ]
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  plugins: [
    {src: '~/plugins/api', ssr: false},
    {src: '~/plugins/iview', ssr: false},
    {src: '~/plugins/fontawesome', ssr: false}
  ],

  build: {
    extend(config, ctx) {
      ctx.loaders.less.javascriptEnabled = true
    },
    cache: true,
  },

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    retry: false,
    baseURL: 'https://wordsapiv1.p.rapidapi.com/',
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": ""
    }
  }
}

