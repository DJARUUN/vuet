<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const { item } = defineProps<{ item: ContentNavigationItem }>();

const route = useRoute();
const isActive = computed(() => route.path === item.path);
</script>

<template>
  <div class="inline-flex gap-1 ml-1.5 h-full">
    <div class="w-[2px]">
      <div :class="`h-full transition-all ease-out ${isActive ? 'bg-primary w-[2px]' : 'bg-border w-[1px]'}`" />
    </div>

    <VButton :to="item.path" :variant="isActive ? 'soft' : 'ghost'"
      :class="`h-8.5 flex-1 ${isActive ? 'text-fg' : 'text-muted-fg hover:text-fg'}`" innerClass="justify-start">
      {{ item.title }}
    </VButton>
  </div>
</template>
