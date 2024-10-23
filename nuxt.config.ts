// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
srcDir: 'app',
  ssr: false,

  typescript: {
    shim: false
  },


  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  hooks: {
  },

  modules: ["@nuxt/ui", "nuxt-auth-sanctum"],
  compatibilityDate: "2024-10-01",

  sanctum: {
    mode: 'token',
    baseUrl: 'https://naranjobakend.lat/',
    userStateKey: 'sanctum.user.identity',
    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,
    endpoints: {
      csrf: 'sanctum/csrf-cookie',
      login: 'api/auth/login',
      logout: 'api/auth/logout',
      user: 'api/user',
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },
    client: {
      retry: false,
    },
    redirect: {
      keepRequestedRoute: false,
      onLogin: '/',
      onLogout: '/auth/login',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/',
    },
    globalMiddleware: {
      enabled: true,
    },
    logLevel: 3,
  }
})
