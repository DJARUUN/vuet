<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';

defineProps<{ toPage: ContentCollectionItem | undefined, next: boolean }>();
</script>

<template>
  <VButton :disabled="!toPage" variant="outline" :to="toPage && toPage.path" class="h-fit py-3 rounded-xl"
    :innerClass="`flex flex-col ${next ? 'items-end' : 'items-start'}`">
    <div :class="`grid gap-3 ${next ? 'grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr]'}`">
      <svg v-if="!next" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="size-4 mt-1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>

      <div :class="`flex flex-col gap-0.5 ${next ? 'items-end' : 'items-start'}`">
        <h3 class="text-lg font-semibold">
          {{ toPage ? toPage.title : (next ? "Last page" : "First page") }}
        </h3>

        <p
          :class="`text-sm font-base line-clamp-2 min-h-[2lh] dark:text-zinc-400 text-zinc-600 ${next ? 'text-end' : 'text-start'}`">
          {{ toPage?.description || (next ? "This is the last page" : "This is the first page") }}
        </p>
      </div>

      <svg v-if="next" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="size-4 mt-1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </div>
  </VButton>
</template>
