<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const variantStyles = {
  default: `
    dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 dark:active:bg-zinc-600/80 dark:text-zinc-100 dark:border-zinc-600/35 dark:border-t-zinc-600/95 dark:hover:border-zinc-500/35 dark:hover:border-t-zinc-500/95
         bg-zinc-300/60      hover:bg-zinc-200/60      active:bg-zinc-100/60      text-zinc-900      border-zinc-400/55      border-t-zinc-400/35      hover:border-zinc-300/55      hover:border-t-zinc-300/35
    border font-medium inline-flex items-center justify-center gap-x-2 text-base rounded-lg cursor-pointer h-11 px-4.5 transition-all ease backdrop-blur-lg backdrop-saturate-150
  `,
  primary: `
    dark:bg-violet-600/80 dark:hover:bg-violet-500/80 dark:active:bg-violet-400/80 dark:text-zinc-100 dark:border-violet-400/35 dark:border-t-violet-400/95 dark:hover:border-violet-300/35 dark:hover:border-t-violet-300/95
         bg-violet-600/80      hover:bg-violet-500/80      active:bg-violet-400/80      text-zinc-100      border-zinc-400/55        border-t-zinc-400/35        hover:border-zinc-300/55        hover:border-t-zinc-300/35
    border font-medium inline-flex items-center justify-center gap-x-2 text-base rounded-lg cursor-pointer h-11 px-4.5 transition-all ease backdrop-blur-lg backdrop-saturate-150
  `,
};

const { type = "button", variant = "default" } = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary";
  class?: string;
}>();
</script>

<template>
  <button
    :type="type"
    :class="twMerge(variantStyles[variant], $props.class)"
  >
    <slot />
  </button>
</template>
