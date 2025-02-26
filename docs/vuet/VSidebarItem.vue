<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import VButton from "./VButton.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { item } = defineProps<{
  item: any;
  class?: string;
}>();

const route = useRoute();
const isActive = computed(() => route.path === item.path);
</script>

<template>
  <div class="inline-flex gap-1 ml-1.5 h-full">
    <div class="w-[2px]">
      <div :class="`h-full transition-all ease-smooth ${isActive ? 'bg-primary w-[2px]' : 'bg-border w-[1px]'}`" />
    </div>

    <VButton :to="item.path" :variant="isActive ? 'soft' : 'ghost'"
      :class="twMerge(`h-8 px-3 flex-1 justify-start ${isActive ? 'text-fg' : 'text-muted-fg hover:text-fg'}`, $props.class)">
      {{ item.title }}
    </VButton>
  </div>
</template>
