<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { useSlots } from "vue";

defineProps<{
  noPlus?: boolean;
  class?: string;
}>();

const slots = useSlots();
// @ts-ignore It does exist
const children = slots.default?.();
</script>

<template>
  <kbd
    :class="
      twMerge(
        `inline-flex gap-1 h-5 px-1.5 font-medium bg-bg text-muted-fg text-xs border-border border rounded-md justify-center items-center shrink-0`,
        $props.class,
      )
    "
  >
    <template v-for="(child, idx) in children" :key="child">
      <component :is="child.type" v-bind="child.props">
        {{ child.children }}
      </component>

      <span v-if="!noPlus && idx < children!.length - 1">+</span>
    </template>
  </kbd>
</template>
