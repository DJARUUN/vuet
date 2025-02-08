<script setup lang="ts">
import { Dialog } from "@ark-ui/vue/dialog";
import { twMerge } from "tailwind-merge";
import { useDialog as useModal } from "@ark-ui/vue/dialog";
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from "vaul-vue";

const isMobile = false;

defineProps<{
  title: string;
  description?: string;
  class?: string;
}>();
</script>

<template>
  <DrawerRoot v-if="isMobile">
    <slot />

    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-zinc-900/50 backdrop-blur-lg backdrop-saturate-150" />

      <DrawerContent class="dark:bg-zinc-800/80 dark:text-zinc-100 bg-zinc-300/60 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-400/55 border-t-zinc-400/35 rounded-t-xl p-6 flex flex-col gap-6 border backdrop-blur-lg backdrop-saturate-150 mt-24 max-h-[95%] fixed bottom-0 left-0 right-0">
        <div class="h-full overflow-y-auto">
          <div class="mx-auto w-12 h-1 flex-shrink-0 rounded-full dark:bg-zinc-600 mb-5" />

          <div class="flex flex-col gap-6 justify-center h-full flex-1">
            <div class="flex flex-col gap-1.5">
              <h3 class="text-xl font-semibold">{{title}}</h3>
              <p
                v-if="description"
                class="text-sm dark:text-zinc-300"
              >{{description}}</p>
            </div>

            <div class="flex flex-col gap-6 h-full">
              <slot name="content" />

              <div class="inline-flex gap-3">
                <slot name="actions" />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>

  <Dialog.RootProvider v-else>
    <slot />

    <Teleport to="body">
      <Dialog.Backdrop class="absolute top-0 left-0 w-full h-dvh z-40 bg-zinc-900/50 backdrop-blur-sm backdrop-saturate-150" />

      <Dialog.Positioner :class="twMerge('absolute top-0 left-0 z-50 w-full h-dvh flex justify-center items-center', $props.class)">
        <Dialog.Content class="dark:bg-zinc-800/80 dark:text-zinc-100 bg-zinc-300/60 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-400/55 border-t-zinc-400/35 rounded-xl p-6 flex flex-col gap-6 border max-h-dvh backdrop-blur-lg backdrop-saturate-150">
          <div class="flex gap-6 max-w-full min-w-100 max-h-dvh justify-between">
            <Dialog.Title class="flex flex-col gap-1.5">
              <h3 class="text-xl font-semibold">{{title}}</h3>
              <p
                v-if="description"
                class="text-sm dark:text-zinc-300"
              >{{description}}</p>
            </Dialog.Title>

            <Dialog.CloseTrigger class="dark:hover:bg-zinc-700/80 dark:active:bg-zinc-600/80 size-8 grid place-items-center -mr-2 -mt-1 transition-all ease rounded-lg cursor-pointer">
              <svg
                class="size-5 dark:text-zinc-100 text-zinc-900"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </Dialog.CloseTrigger>
          </div>

          <Dialog.Description class="flex flex-col gap-6 overflow-y-auto">
            <slot name="content" />

            <div class="inline-flex gap-3">
              <slot name="actions" />
            </div>
          </Dialog.Description>

        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
