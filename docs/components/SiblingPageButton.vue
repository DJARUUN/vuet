<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import type { ContentCollectionItem } from "@nuxt/content";
import VButton from "~/vuet/VButton.vue";

defineProps<{ toPage: ContentCollectionItem | undefined; next: boolean }>();
</script>

<template>
  <VButton v-if="toPage" variant="outline" :to="toPage.path" class="h-fit py-3.5 px-4 rounded-xl group"
    :innerClass="`flex flex-col ${next ? 'items-end' : 'items-start'}`">
    <div :class="`grid gap-2 ${next ? 'grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr]'}`">
      <ArrowLeftIcon v-if="!next" class="size-4 mt-1 group-active:-translate-x-1 transition-[translate] ease-smooth" />

      <div :class="`flex flex-col gap-0.5 ${next ? 'items-end' : 'items-start'}`">
        <h3 class="text-base font-semibold">
          {{ toPage.title }}
        </h3>

        <p :class="`h-[2lh] font-normal overflow-hidden text-muted-fg ${next ? 'text-end' : 'text-start'}`">
          {{ toPage?.description }}
        </p>
      </div>

      <ArrowRightIcon v-if="next" class="size-4 mt-1 group-active:translate-x-1 transition-[translate] ease-smooth" />
    </div>
  </VButton>

  <div v-else class="not-lg:hidden" />
</template>
