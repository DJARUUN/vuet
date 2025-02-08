import { HstNuxt } from "@histoire/plugin-nuxt";
import { HstVue } from "@histoire/plugin-vue";
import { defineConfig, defaultColors } from "histoire";

export default defineConfig({
  plugins: [HstVue(), HstNuxt()],
  storyMatch: ["components/_stories/**/*.story.vue"],
  defaultStoryProps: {
    layout: {
      type: "single",
      iframe: true,
      // width: "100%",
    },
  },
  theme: {
    colors: {
      gray: defaultColors.zinc,
      primary: defaultColors.violet,
    },
  },
  backgroundPresets: [{ label: "Default", color: "var(--color-zinc-900)" }],
});
