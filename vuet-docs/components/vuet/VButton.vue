<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const {
  type = "button",
  variant = "default",
  size = "default",
  link = false,
  nuxt = true,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variantStyles;
  size?: "default" | "icon";
  link?: boolean;
  nuxt?: boolean;
  to?: string;
  class?: string;
  innerClass?: string;
}>();

const sharedStyles = `flex text-sm font-medium rounded-lg cursor-pointer transition-[background-color,color,border] ease-out`;

const sizeStyles = {
  default: `h-8.5 px-3`,

  icon: `size-8.5`,
};

const variantStyles = {
  default: `
    dark:bg-zinc-800/85 dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         bg-white            hover:bg-zinc-50/85       active:bg-zinc-100/85

    dark:text-zinc-100
         text-zinc-900

    dark:border-zinc-600/35 dark:border-t-zinc-600/95 dark:hover:border-zinc-500/35 dark:hover:border-t-zinc-500/95
         border-zinc-300/55      border-t-zinc-300/35      hover:border-zinc-300/55      hover:border-t-zinc-300/35

    border backdrop-blur-lg backdrop-saturate-150
  `,

  primary: `
    dark:bg-primary-600/85 dark:hover:bg-primary-500/85 dark:active:bg-primary-400/85
         bg-primary-600/85      hover:bg-primary-500/85      active:bg-primary-400/85

    dark:text-zinc-100
         text-zinc-100

    dark:border-primary-400/35 dark:border-t-primary-400/95 dark:hover:border-primary-300/35 dark:hover:border-t-primary-300/95
         border-zinc-400/55         border-t-zinc-400/35         hover:border-zinc-300/55         hover:border-t-zinc-300/35

    border backdrop-blur-lg backdrop-saturate-150
  `,

  soft: `
    dark:bg-zinc-800/85 dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         bg-zinc-200/85      hover:bg-zinc-300/85      active:bg-zinc-400/85

    dark:text-zinc-400 dark:hover:text-zinc-100
         text-zinc-600      hover:text-zinc-900

    backdrop-blur-lg backdrop-saturate-150
  `,

  outline: `
    dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         hover:bg-zinc-50/85       active:bg-zinc-100/85

    dark:text-zinc-100
         text-zinc-900

    dark:border-zinc-500/35 dark:hover:border-zinc-500/35
         border-zinc-400/45      hover:border-zinc-400/45

    border hover:backdrop-blur-lg hover:backdrop-saturate-150 active:backdrop-blur-lg active:backdrop-saturate-150
  `,

  ghost: `
    dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85
         hover:bg-zinc-300/85      active:bg-zinc-400/85

    dark:hover:text-zinc-100
         hover:text-zinc-900

    hover:backdrop-blur-lg hover:backdrop-saturate-150 active:backdrop-blur-lg active:backdrop-saturate-150
  `,
};

const innerStyles = "inline-flex gap-2 items-center justify-center size-full";
</script>

<template>
  <button v-if="!link" :type="type"
    :class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)">
    <div :class="twMerge(innerStyles, innerClass)">
      <slot />
    </div>
  </button>

  <NuxtLink v-else-if="nuxt && link"
    :class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)" :to="to">
    <div :class="twMerge(innerStyles, innerClass)">
      <slot />
    </div>
  </NuxtLink>

  <a v-else :class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)" :href="to">
    <div :class="twMerge(innerStyles, innerClass)">
      <slot />
    </div>
  </a>
</template>
