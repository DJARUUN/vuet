<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";
import VButton from "~/vuet/VButton.vue";

defineProps<{ toPage: ContentCollectionItem | undefined; next: boolean }>();
</script>

<template>
  <VButton v-if="toPage" variant="outline" :to="toPage.path" class="h-fit py-3.5 px-4 rounded-xl group"
    :innerClass="`flex flex-col ${next ? 'items-end' : 'items-start'}`">
    <div :class="`grid gap-2 ${next ? 'grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr]'}`">
      <svg v-if="!next" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="size-4 mt-1 group-active:-translate-x-1 transition-[translate] ease-smooth">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>

      <div :class="`flex flex-col gap-0.5 ${next ? 'items-end' : 'items-start'}`">
        <h3 class="text-base font-semibold">
          {{ toPage.title }}
        </h3>

        <p :class="`h-[2lh] font-normal overflow-hidden text-muted-fg ${next ? 'text-end' : 'text-start'}`">
          {{ toPage?.description }}
        </p>
      </div>

      <svg v-if="next" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="size-4 mt-1 group-active:translate-x-1 transition-[translate] ease-smooth">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </div>
  </VButton>

  <div v-else class="not-lg:hidden" />
</template>
