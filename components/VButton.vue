<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const sharedStyles =
  "border inline-flex text-sm font-medium items-center justify-center gap-2 rounded-lg cursor-pointer h-8.5 px-3 transition-all ease";

const variantStyles = {
  default: `
    dark:bg-zinc-800/85 dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         bg-white            hover:bg-zinc-50/85       active:bg-zinc-100/85

    dark:text-zinc-100
         text-zinc-900

    dark:border-zinc-600/35 dark:border-t-zinc-600/95 dark:hover:border-zinc-500/35 dark:hover:border-t-zinc-500/95
         border-zinc-300/55      border-t-zinc-300/35      hover:border-zinc-300/55      hover:border-t-zinc-300/35

    backdrop-blur-lg backdrop-saturate-150
  `,

  primary: `
    dark:bg-primary-600/85 dark:hover:bg-primary-500/85 dark:active:bg-primary-400/85
         bg-primary-600/85      hover:bg-primary-500/85      active:bg-primary-400/85

    dark:text-zinc-100
         text-zinc-100

    dark:border-primary-400/35 dark:border-t-primary-400/95 dark:hover:border-primary-300/35 dark:hover:border-t-primary-300/95
         border-zinc-400/55         border-t-zinc-400/35         hover:border-zinc-300/55         hover:border-t-zinc-300/35

    backdrop-blur-lg backdrop-saturate-150
  `,

  outline: `
    dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         hover:bg-zinc-50/85       active:bg-zinc-100/85

    dark:text-zinc-100
         text-zinc-900

    dark:border-zinc-500/35 dark:hover:border-zinc-500/35
         border-zinc-400/55      hover:border-zinc-400/55
  `,
};

const { type = "button", variant = "default" } = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variantStyles;
  class?: string;
}>();
</script>

<template>
  <button
    :type="type"
    :class="twMerge(sharedStyles, variantStyles[variant], $props.class)"
  >
    <slot />
  </button>
</template>
