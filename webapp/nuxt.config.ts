// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["~/styles/index.scss", "@flaticon/flaticon-uicons/css/all/all.css"],

  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/svg-sprite",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],

  i18n: { vueI18n: "./i18n.config.ts" },
});
