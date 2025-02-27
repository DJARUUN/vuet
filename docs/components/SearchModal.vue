<script setup lang="ts">
import { navigateTo, useAsyncData } from "#app";
import { queryCollectionSearchSections } from "#imports";
import Fuse from "fuse.js";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ChevronRightIcon, CubeIcon, HashtagIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import VButton from "~/vuet/VButton.vue";
import VCommandPalette from "~/vuet/VCommandPalette.vue";
import VKbd from "~/vuet/VKbd.vue";
import { twMerge } from "tailwind-merge";

defineProps<{
  buttonClass?: string;
}>();

const isSearchModalOpen = ref(false);

const { data: searchData } = await useAsyncData("search-data", () =>
  queryCollectionSearchSections("content"),
);
const fuse = new Fuse(searchData.value || [], {
  keys: [
    { name: "title", weight: 4 },
    { name: "description", weight: 3 },
    { name: "id", weight: 2 },
    { name: "content", weight: 1 }
  ],
});

function handleSearch(query: string) {
  return fuse.search(query);
}

function slugToWords(slug: string) {
  return slug
    .split("/")
    .slice(1, -1)
    .map((segment) => segment
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "));
}

function handleKeyDown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    isSearchModalOpen.value = !isSearchModalOpen.value;
    console.log("TOGGLED OPEN SEARCH MODAL");
  }
}

onMounted(() => window.addEventListener("keydown", handleKeyDown));

onBeforeUnmount(() => window.removeEventListener("keydown", handleKeyDown));
</script>

<template>
  <VCommandPalette v-model:open="isSearchModalOpen" placeholder="e.g. Button" :onSearch="handleSearch"
    @select="(item) => navigateTo(item.item.id)">
    <VButton variant="outline" @click="isSearchModalOpen = true"
      :class="twMerge(`@container text-muted-fg relative justify-start`, buttonClass)">
      <MagnifyingGlassIcon
        class="size-4.5 shrink-0 @max-[5.5rem]:absolute @max-[5.5rem]:left-[50%] @max-[5.5rem]:-translate-x-[50%]" />

      <span class="@max-[5.5rem]:hidden">Search<span class="@max-[7.5rem]:hidden"> docs</span>...</span>

      <VKbd noPlus class="not-md:hidden absolute right-1.5">
        <span>⌘</span><span>K</span>
      </VKbd>
    </VButton>

    <template #item="{ item: link }">
      <div class="items-start flex flex-col gap-1">
        <div class="inline-flex gap-1 items-center">
          <template v-for="word in slugToWords(link.item.id)" :key="word">
            <span class="text-muted-fg font-[450]">{{ word }}</span>
            <ChevronRightIcon class="text-muted-fg size-3.5" />
          </template>

          <div class="inline-flex gap-2 items-center">
            <HashtagIcon v-if="link.item.id.includes('#')" class="size-4 text-muted-fg shrink-0" />
            <CubeIcon v-else class="size-4 text-muted-fg shrink-0" />

            <span>{{ link.item.title }}</span>
          </div>
        </div>

        <span v-if="link.item.content" class="text-muted-fg font-normal text-xs line-clamp-1 overflow-ellipsis">
          {{ link.item.content?.slice(0, 100) }}
        </span>
      </div>
    </template>
  </VCommandPalette>
</template>
