<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { item } = defineProps<{ item: ContentNavigationItem, isNested?: boolean }>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <h4 class="font-medium text-[0.938rem]">{{ item.title }}</h4>

    <div class="flex flex-col">
      <template v-for="item_ in item.children">
        <VSidebarGroup v-if="item_.page === false" :item="item_" isNested />
        <VSidebarItem v-else :item="item_" />
      </template>
    </div>
  </div>
</template>
