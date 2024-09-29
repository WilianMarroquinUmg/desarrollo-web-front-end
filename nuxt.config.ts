// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],

  // modules: ['@nuxt/ui'],
  build: {
    transpile: ['bootstrap-vue-next'],
  },

  plugins: [
    '~/plugins/bootstrap-vue.js',
  ],

  modules: ['@nuxt/scripts'],
})
