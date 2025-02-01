import { HstNuxt } from '@histoire/plugin-nuxt'
import { HstVue } from '@histoire/plugin-vue'
import { defineConfig, defaultColors } from 'histoire'

export default defineConfig({
  plugins: [
    HstVue(),
    HstNuxt(),
  ],
  storyMatch: [
    "components/_stories/**/*.story.vue",
  ],
  tree: {
    file: "path",
  },
  defaultStoryProps: {
    layout: {
      type: "single",
      iframe: true,
    },
  },
  theme: {
    colors: {
      gray: defaultColors.zinc,
      primary: defaultColors.violet
    }
  },
})
