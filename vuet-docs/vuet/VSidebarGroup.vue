<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const { item } = defineProps<{
	item: ContentNavigationItem;
	isNested?: boolean;
}>();
</script>

<template>
  <div :class="`inline-flex gap-1 ml-1.5 ${isNested && '-mb-0.5'}`">
    <div v-if="isNested" class="w-[2px]">
      <div class="h-8.5 transition-all ease-out dark:bg-zinc-500/35 bg-zinc-400/30 w-[1px]" />
    </div>

    <VCollapsible :title="item.title"
      :class="`text-[0.938rem] ${isNested && 'mx-0 dark:text-zinc-400 text-zinc-600 h-8.5 px-3.5'}`"
      :defaultCollapsed="isNested">
      <div :class="`flex flex-col ${isNested && 'px-2.5'}`">
        <template v-for="item_ in item.children" :key="item_">
          <VSidebarGroup v-if="item_.page === false" :item="item_" isNested />
          <VSidebarItem v-else :item="item_" />
        </template>
      </div>
    </VCollapsible>
  </div>
</template>
