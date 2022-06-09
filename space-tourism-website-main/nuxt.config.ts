import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/static/css/global.css"],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "@/static/assets/favicon-32x32.png",
    },
  ],
});
