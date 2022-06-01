import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/static/css/global.css"],
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Bellefair: true,
      "Barlow Condensed": true,
    },
  },
});
