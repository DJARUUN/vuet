<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { items } = defineProps<{ items: ContentNavigationItem[] }>();
</script>

<template>
  <aside
    class="flex flex-col gap-5 p-6 lg:border-r dark:border-zinc-600/35 border-zinc-300/45 min-w-[18rem] overflow-auto">
    <slot name="header" />

    <template v-for="item in items" :key="item">
      <VSidebarGroup v-if="item.page === false" :item="item" />
      <VSidebarItem v-else :item="item" />
    </template>

    <slot name="footer" />
  </aside>
</template>
