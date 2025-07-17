import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";

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

  components: [
    {
      path: "~/vuet",
      global: true,
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["./assets/css/main.css"],

  modules: ["@nuxt/fonts", "@nuxtjs/seo", "@nuxt/content"],

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
    families: [
      { name: "Bricolage Grotesque", weights: ["200 800"] },
      { name: "Geist", weights: ["100 900"] },
      { name: "Instrument Serif", weights: ["400"] },
    ],
  },

  imports: {
    autoImport: false,
  },

  ogImage: {
    fonts: ["Bricolage+Grotesque:700", "Geist:400"],
  },

  site: {
    url: "https://vuet-docs.vercel.app",
    name: "Vuet",
  },

  hooks: {
    async "nitro:build:before"({
      options: {
        prerender: { routes: nuxtRoutes },
      },
    }) {
      console.log("Finding content pages to prerender");

      const dirname = fileURLToPath(new URL(".", import.meta.url));
      const contentDir = resolve(dirname, "content");

      try {
        const contentFiles = await globby(
          ["**/*.md", "**/*.yaml", "**/*.json"],
          {
            cwd: contentDir,
          },
        );

        const routes = contentFiles.map((f) => {
          const path =
            "/" +
            f.replace(/\.(md|yaml|json)$/, "").replaceAll(/([0-9])\./g, "");
          return path.endsWith("/index") ? path.replace(/\/index$/, "/") : path;
        });

        console.log(`Found ${routes.length} content routes to prerender`);

        routes.forEach((r) => nuxtRoutes.push(r));
      } catch (error) {
        console.error("Error finding content files:", error);
      }
    },
  },
});
