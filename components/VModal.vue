<script setup lang="ts">
import { Dialog } from "@ark-ui/vue/dialog";
import { twMerge } from "tailwind-merge";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useDialog as useModal } from "@ark-ui/vue/dialog";
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from "vaul-vue";

defineProps<{
  title: string;
  description?: string;
  class?: string;
}>();

const isOpen = defineModel({ required: true });
</script>

<template>
  <!-- <DrawerRoot v-if="isMobile" class="isolate z-50"> -->
  <!--   <slot /> -->
  <!---->
  <!--   <DrawerPortal> -->
  <!--     <DrawerOverlay class="fixed inset-0 bg-zinc-900/50 backdrop-blur-lg backdrop-saturate-150" /> -->
  <!---->
  <!--     <DrawerContent class="dark:bg-zinc-800/85 dark:text-zinc-100 bg-zinc-300/60 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-400/55 border-t-zinc-400/35 rounded-t-xl p-6 flex flex-col gap-6 border backdrop-blur-lg backdrop-saturate-150 mt-24 max-h-[95%] fixed bottom-0 left-0 right-0"> -->
  <!--       <div class="h-full overflow-y-auto"> -->
  <!--         <div class="mx-auto w-12 h-1 flex-shrink-0 rounded-full dark:bg-zinc-600 mb-5" /> -->
  <!---->
  <!--         <div class="flex flex-col gap-6 justify-center h-full flex-1"> -->
  <!--           <div class="flex flex-col gap-1.5"> -->
  <!--             <h3 class="text-xl font-semibold">{{title}}</h3> -->
  <!--             <p -->
  <!--               v-if="description" -->
  <!--               class="text-sm dark:text-zinc-300" -->
  <!--             >{{description}}</p> -->
  <!--           </div> -->
  <!---->
  <!--           <div class="flex flex-col gap-6 h-full"> -->
  <!--             <slot name="content" /> -->
  <!---->
  <!--             <div class="inline-flex gap-3"> -->
  <!--               <slot name="actions" /> -->
  <!--             </div> -->
  <!--           </div> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--     </DrawerContent> -->
  <!--   </DrawerPortal> -->
  <!-- </DrawerRoot> -->

  <div>
    <Dialog.Root v-model:open="isOpen">
      <slot />

      <Teleport to="body">
        <Dialog.Backdrop class="absolute inset-0 bg-zinc-900/60" />

        <Dialog.Positioner :class="twMerge('absolute inset-0 flex justify-center items-center p-1', $props.class)">

          <Dialog.Content class="dark:bg-zinc-800/85 dark:text-zinc-100 bg-white/85 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-300/55 border-t-zinc-300/35 rounded-xl px-6 py-5 flex flex-col gap-6 border max-h-full backdrop-blur-lg backdrop-saturate-150 max-w-full">
            <div class="grid grid-cols-[1fr_auto] gap-3">
              <Dialog.Title class="flex flex-col gap-1.5 mt-0.5">
                <h3 class="text-lg font-semibold">{{title}}</h3>
                <p
                  v-if="description"
                  class="text-sm dark:text-zinc-300"
                >{{description}}</p>
              </Dialog.Title>

              <Dialog.CloseTrigger class="inline-flex text-sm font-medium items-center justify-center gap-2 rounded-lg cursor-pointer transition-all ease dark:bg-zinc-800/85 dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85 hover:bg-zinc-50/85 active:bg-zinc-100/85 dark:text-zinc-100 text-zinc-900 size-8 -mr-2 -mt-1">
                <svg
                  class="size-5"
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
  </div>
</template>
