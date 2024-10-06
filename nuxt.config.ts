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
    // baseUrl: 'http://back-pajas-agua-desarrollo-web.test/',
    baseUrl: 'http://base-backend-with-laravel11.test/',
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

// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: true },
//     modules: ["@nuxt/ui", "nuxt-auth-sanctum"],
//
//   srcDir: 'app',
//   ssr: false,
//
//   typescript: {
//     shim: false
//   },
//
//   build: {
//     transpile: ["vuetify"],
//   },
//
//   vite: {
//     define: {
//       "process.env.DEBUG": false,
//     },
//   },
//
//   nitro: {
//     serveStatic: true,
//   },
//
//   devServerHandlers: [],
//
//   hooks: {
//   },
//
//   sanctum: {
//     mode : 'token',
//     baseUrl: 'http://base-backend-with-laravel11.test/',
//     userStateKey: 'sanctum.user.identity',
//
//     redirectIfAuthenticated: true,
//     redirectIfUnauthenticated: true,
//
//     endpoints: {
//       csrf: '/sanctum/csrf-cookie',
//       login: 'api/auth/login',
//       logout: 'api/auth/logout',
//       user: '/api/user' // Endpoint para obtener el usuario autenticado
//     },
//
//     client: {
//       retry: false,
//     },
//
//     csrf: {
//       cookie: 'XSRF-TOKEN',
//       header: 'X-XSRF-TOKEN',
//     },
//
//     redirect: {
//       keepRequestedRoute: false,
//       onLogin: '/',
//       onLogout: '/',
//       onAuthOnly: '/auth/Login',
//       onGuestOnly: '/',
//     },
//
//     globalMiddleware: {
//       enabled: false,
//       allow404WithoutAuth: true,
//     },
//
//     globalMiddleware: {
//       enabled: true,
//     },
//     logLevel: 3,
//   },
//
// })
