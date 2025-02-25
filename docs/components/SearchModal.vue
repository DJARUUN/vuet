<script setup lang="ts">
import { navigateTo, useAsyncData } from "#app";
import { queryCollectionSearchSections } from "#imports";
import Fuse from "fuse.js";
import { ref } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import VButton from "~/vuet/VButton.vue";
import VCommandPalette from "~/vuet/VCommandPalette.vue";

const isSearchModalOpen = ref(false);

const { data: searchData } = await useAsyncData("search-data", () =>
  queryCollectionSearchSections("content"),
);
const fuse = new Fuse(searchData.value || [], {
  keys: ["title", "description", "content"],
});
</script>

<template>
  <VCommandPalette v-model:open="isSearchModalOpen" :onSearch="(query) => fuse.search(query)"
    @select="(item) => navigateTo(item.item.id)">
    <VButton variant="ghost" size="icon" @click="isSearchModalOpen = true">
      <MagnifyingGlassIcon class="size-4.5" />
    </VButton>

    <template #item="{ item: link }">
      <div class="items-start flex flex-col gap-1">
        <span>{{ link.item.title }}</span>
        <span v-if="link.item.content" class="text-muted-fg text-xs clamp-2">
          {{ link.item.content?.slice(0, 100) }}
        </span>
      </div>
    </template>
  </VCommandPalette>
</template>
