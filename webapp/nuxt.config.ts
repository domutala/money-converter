// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  ssr: true,

  components: [{ path: "@/components/ui", global: true, prefix: "ui" }],

  css: ["~/styles/index.scss", "@flaticon/flaticon-uicons/css/all/all.css"],

  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/svg-sprite",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "dayjs-nuxt",
  ],

  i18n: {
    strategy: "prefix",
    customRoutes: "config",
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
    ],

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
