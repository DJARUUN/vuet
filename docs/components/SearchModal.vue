<script setup lang="ts">
import Fuse from "fuse.js";

const isSearchModalOpen = ref(false);

const searchQuery = ref("Primary");
const { data: searchData } = await useAsyncData("search-data", () =>
	queryCollectionSearchSections("content"),
);

const fuse = new Fuse(searchData.value, {
	keys: ["title", "description", "content"],
});

const searchResults = computed(() =>
	fuse.search(toValue(searchQuery)).slice(0, 10),
);
</script>

<template>
  <VModal v-model="isSearchModalOpen" title="Search documentation">
    <VButton variant="ghost" size="icon" @click="isSearchModalOpen = true">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-4.5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </VButton>

    <template #content>
      <li v-for="link of searchResults" :key="link.item.id">
        <VButton variant="ghost" :to="link.item.id" :nuxt="false">
          {{ link.item.title }}
          <span class="text-gray-500 text-xs">
            {{ link.item.content?.slice(0, 100) }}
          </span>
        </VButton>
      </li>
    </template>
  </VModal>
</template>
