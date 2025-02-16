<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { item } = defineProps<{ item: ContentNavigationItem }>();

const route = useRoute();
const isActive = computed(() => route.path === item.path);
</script>

<template>
  <div class="inline-flex gap-1 ml-1.5 h-full">
    <div class="w-[2px]">
      <div
        :class="`h-full transition-all ease-out ${isActive ? 'dark:bg-primary-600/85 bg-primary-600/85 w-[2px]' : 'dark:bg-zinc-600/35 bg-zinc-300/45 w-[1px]'}`" />
    </div>

    <VButton link :to="item.path" :variant="isActive ? 'soft' : 'ghost'"
      :class="`h-8 flex-1 ${isActive ? 'dark:text-zinc-100 text-zinc-900' : 'dark:text-zinc-400 dark:hover:text-zinc-100 text-zinc-600 hover:text-zinc-900'}`"
      innerClass="justify-start">
      {{ item.title }}
    </VButton>
  </div>
</template>
