import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

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

  hooks: {
    "nitro:build:before": async ({ options: nitroConfig }) => {
      console.log("Finding content pages to prerender");

      const __dirname = fileURLToPath(new URL('.', import.meta.url));
      const contentDir = resolve(__dirname, 'content');

      try {
        const contentFiles = await globby(['**/*.md', '**/*.yaml', '**/*.json'], {
          cwd: contentDir
        });

        const routes = contentFiles.map(file => {
          const path = '/' + file.replace(/\.(md|yaml|json)$/, '').replaceAll(/([0-9])\./g, "");
          return path.endsWith('/index') ? path.replace(/\/index$/, '/') : path;
        });

        console.log(`Found ${routes.length} content routes to prerender`);

        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes || []),
          ...routes
        ];
      } catch (error) {
        console.error("Error finding content files:", error);
      }
    },
  }
});
