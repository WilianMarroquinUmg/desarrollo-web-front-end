// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/plugins/simplebar/css/simplebar.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/plugins/metismenu/css/metisMenu.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/pace.min.css"'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/bootstrap-extended.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/app.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/icons.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/dark-theme.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/semi-dark.css'
        },
        {
          rel: 'stylesheet',
          href: 'assets/css/header-colors.css'
        },

      ],
      script: [
        {
          src: 'https://cdnassets/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/js/jquery.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/plugins/simplebar/js/simplebar.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/plugins/metismenu/js/metisMenu.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'assets/js/index.js',
          tagPosition: 'bodyClose'
        }
      ],
    }
  },


})
