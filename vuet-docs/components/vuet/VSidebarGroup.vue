<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { item } = defineProps<{ item: ContentNavigationItem, isNested?: boolean }>();

const isCollapsed = ref(false);
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <VButton variant="ghost"
      :class="`text-[0.938rem] -mx-2.5 px-2.5 h-7 ${isCollapsed && 'dark:text-zinc-400 text-zinc-600'}`"
      innerClass="justify-between" @click="isCollapsed = !isCollapsed">
      <span>{{ item.title }}</span>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        :class="`size-4 transition-[rotate] ease-out ${!isCollapsed && 'rotate-180'}`">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </VButton>

    <div
      :class="`grid transition-[grid-template-rows] ease-out ${isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`">
      <div class="overflow-hidden">
        <div class="flex flex-col">
          <template v-for="item_ in item.children" :key="item_">
            <VSidebarGroup v-if="item_.page === false" :item="item_" isNested />
            <VSidebarItem v-else :item="item_" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
