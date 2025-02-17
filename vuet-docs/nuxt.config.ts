import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  components: [
    { path: "~/vuet", pathPrefix: false },
    { path: "~/components", pathPrefix: false },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/fonts", "@nuxt/content"],

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
      },
    },
  },
});
