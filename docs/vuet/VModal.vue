<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue';
import { Dialog } from "@ark-ui/vue/dialog";
import { twMerge } from "tailwind-merge";

defineProps<{
  title?: string;
  description?: string;
  class?: string;
  contentClass?: string;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });

const showDrawer = ref(false);

function handleResize() {
  if (window.innerWidth < 1024) showDrawer.value = true;
  else showDrawer.value = false;

  isOpen.value = false;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);

  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <template v-if="showDrawer">
    <DrawerRoot v-model:open="isOpen">
      <slot />

      <DrawerPortal>
        <DrawerOverlay class="fixed inset-0 dark:bg-bg/40 bg-fg/15" />

        <DrawerContent
          :class="twMerge(`flex flex-col rounded-t-xl mt-24 max-h-[90%] fixed bottom-0 left-0 right-0 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 text-overlay-fg border-t !border-border dark:!border-[color-mix(in_oklab,var(--color-overlay)_82.5%,white)]`, $props.class)">
          <div :class="twMerge(`p-6 flex-1 flex flex-col gap-6`, contentClass)">
            <div class="mx-auto w-16 h-1.5 flex-shrink-0 rounded-full bg-secondary" />

            <div class="grid grid-cols-[1fr_auto] gap-5 -mb-3">
              <div class="flex flex-col gap-1.5">
                <slot name="title">
                  <h3 class="text-lg font-semibold">{{ title }}</h3>
                </slot>

                <slot name="description">
                  <p v-if="description" class="text-sm text-muted-fg">
                    {{ description }}
                  </p>
                </slot>
              </div>
            </div>

            <div class="flex flex-col gap-6 overflow-y-auto">
              <div class="overflow-y-auto flex flex-col gap-3">
                <slot name="content" />
              </div>

              <div class="inline-flex justify-end gap-2">
                <slot name="actions" />
              </div>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  </template>

  <template v-else>
    <Dialog.Root v-model:open="isOpen">
      <slot />

      <ClientOnly>
        <Teleport to="body">
          <Dialog.Backdrop class="absolute inset-0 dark:bg-bg/40 bg-fg/15 z-20" />

          <Dialog.Positioner
            :class="twMerge('absolute inset-0 flex justify-center items-center p-3 z-50 isolate', $props.class)">

            <Dialog.Content
              :class="twMerge(`bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 text-overlay-fg rounded-xl px-6 py-5 flex flex-col gap-6 border max-h-full not-md:w-full md:min-w-116 shadow-lg dark:shadow-overlay/25 shadow-overlay-fg/5 !border-border dark:!border-t-[color-mix(in_oklab,var(--color-overlay)_82.5%,white)]`, contentClass)">
              <div class="grid grid-cols-[1fr_auto] gap-5 -mb-3">
                <Dialog.Title class="flex flex-col gap-1.5">
                  <slot name="title">
                    <h3 class="text-lg font-semibold">{{ title }}</h3>
                  </slot>

                  <slot name="description">
                    <p v-if="description" class="text-sm text-muted-fg">
                      {{ description }}
                    </p>
                  </slot>
                </Dialog.Title>

                <VButton variant="ghost" size="icon" @click="isOpen = false" class="-mt-1 -mr-1 size-8" title="close">
                  <svg class="size-4.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </VButton>
              </div>

              <Dialog.Description class="flex flex-col gap-6 overflow-y-auto">
                <div class="overflow-y-auto flex flex-col gap-3">
                  <slot name="content" />
                </div>

                <div class="inline-flex justify-end gap-2">
                  <slot name="actions" />
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Teleport>
      </ClientOnly>
    </Dialog.Root>
  </template>
</template>
