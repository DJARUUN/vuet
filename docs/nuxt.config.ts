import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: {
    enabled: true,
    componentInspector: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },

  components: [],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/fonts", "@nuxt/content"],

  experimental: {
    inlineRouteRules: true,
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
      },
    },
  },

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },

  imports: {
    autoImport: false,
  },
});
