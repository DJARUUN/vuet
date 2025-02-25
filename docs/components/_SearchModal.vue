<script setup lang="ts">
import { useAsyncData } from "#app";
import { queryCollectionSearchSections } from "#imports";
import Fuse from "fuse.js";
import { computed, ref, toValue, watch } from "vue";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import VButton from "~/vuet/VButton.vue";
import { useRoute } from "vue-router";
import VResponsiveModal from "~/vuet/VResponsiveModal.vue";

const isSearchModalOpen = ref(false);

const searchQuery = ref("");
const { data: searchData } = await useAsyncData("search-data", () =>
  queryCollectionSearchSections("content"),
);

const fuse = new Fuse(searchData.value, {
  keys: ["title", "description", "content"],
});

const searchResults = computed(() =>
  fuse.search(toValue(searchQuery)).slice(0, 10),
);

const route = useRoute();
watch(route, () => (isSearchModalOpen.value = false));
</script>

<template>
  <VResponsiveModal v-model="isSearchModalOpen" containerClass="not-lg:min-h-[85%]" class="gap-3">
    <VButton variant="ghost" size="icon" @click="isSearchModalOpen = true">
      <MagnifyingGlassIcon class="size-4.5" />
    </VButton>

    <template #header>
      <div class="w-full relative h-10">
        <input type="text"
          class="h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-70 transition-[border] ease-smooth shrink-0 w-full"
          placeholder="e.g. ResponsiveModal" v-model="searchQuery">

        <VButton variant="ghost" size="icon" class="absolute right-0.5 top-[50%] -translate-y-[50%]"
          @click="isSearchModalOpen = false">
          <XMarkIcon class="size-4.5" />
        </VButton>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-1 flex-1 overflow-y-auto" tabindex="-1">
        <li v-if="searchResults.length > 0" v-for="link of searchResults" :key="link.item.id">
          <VButton variant="ghost" :to="link.item.id" :nuxt="false"
            class="h-fit py-2.5 border-2 border-transparent focus:outline-none focus:border-2 focus:border-primary"
            innerClass="items-start flex-col gap-1 ">
            <span>{{ link.item.title }}</span>
            <span class="text-muted-fg text-xs clamp-2">
              {{ link.item.content?.slice(0, 100) }}
            </span>
          </VButton>
        </li>
        <p v-else class="text-muted-fg text-sm">No search results found.</p>
      </div>
    </template>
  </VResponsiveModal>
</template>
