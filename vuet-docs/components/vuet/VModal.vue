<script setup lang="ts">
import { Dialog } from "@ark-ui/vue/dialog";
import { twMerge } from "tailwind-merge";

defineProps<{
  title: string;
  description?: string;
  class?: string;
}>();

const isOpen = defineModel({ required: true });
</script>

<template>
  <Dialog.Root v-model:open="isOpen">
    <slot />

    <Teleport to="body">
      <Dialog.Backdrop class="absolute inset-0 bg-zinc-900/60 z-40 backdrop-blur-xs backdrop-saturate-150" />

      <Dialog.Positioner :class="twMerge('absolute inset-0 flex justify-center items-center p-3 z-50', $props.class)">

        <Dialog.Content
          class="dark:bg-zinc-800/85 dark:text-zinc-100 bg-white/85 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-300/55 border-t-zinc-300/35 rounded-xl px-6 py-5 flex flex-col gap-6 border max-h-full backdrop-blur-lg backdrop-saturate-150 max-w-full shadow-xl dark:shadow-black/20 shadow-black/10">
          <div class="grid grid-cols-[1fr_auto] gap-3">
            <Dialog.Title class="flex flex-col gap-1.5">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <p v-if="description" class="text-sm dark:text-zinc-300">{{ description }}</p>
            </Dialog.Title>

            <VButton variant="ghost" size="icon" @click="isOpen = false">
              <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18 6L6 18M6 6l12 12" />
              </svg>
            </VButton>
          </div>

          <Dialog.Description class="flex flex-col gap-6 overflow-y-auto">
            <div class="overflow-y-auto">
              <slot name="content" />
            </div>

            <div class="inline-flex justify-end gap-2">
              <slot name="actions" />
            </div>
          </Dialog.Description>

        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<style>
@import "tailwindcss";

@utility ease-bounce {
  --ease: cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-timing-function: var(--ease);
  animation-timing-function: var(--ease);
}

[data-scope="dialog"] {

  &[data-part="backdrop"] {
    &:is([open], [data-open], [data-state="open"]) {
      animation: modal-backdrop-in 200ms;
      @apply ease-out;
    }
  }

  &[data-part="content"] {
    &:is([open], [data-open], [data-state="open"]) {
      animation: modal-content-in 300ms;
      @apply ease-bounce;
    }

    &:is([closed], [data-closed], [data-state="closed"]) {
      animation: modal-content-out 200ms;
      @apply ease-out;
    }
  }
}

@keyframes modal-backdrop-in {
  from {
    opacity: 0;
  }
}

@keyframes modal-backdrop-out {
  to {
    opacity: 0;
  }
}

@keyframes modal-content-in {
  from {
    filter: blur(10px);
    opacity: 0;
    scale: 90%;
  }
}

@keyframes modal-content-out {
  to {
    filter: blur(2.5px);
    opacity: 0;
    scale: 90%;
  }
}
</style>
