<script setup lang="ts">
import { Dialog } from "@ark-ui/vue/dialog";
import { twMerge } from "tailwind-merge";
import VButton from "./VButton.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";

defineProps<{
  title?: string;
  description?: string;
  class?: string;
  containerClass?: string;

  // Needed for API consistency with Drawer
  noHandle?: boolean;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });

const mounted = ref(false);
onMounted(() => (mounted.value = true));
</script>

<template>
  <Dialog.Root v-model:open="isOpen">
    <slot />

    <Teleport to="body">
      <template v-if="mounted">
        <Dialog.Backdrop class="absolute inset-0 dark:bg-bg/40 bg-fg/15 z-20" />

        <Dialog.Positioner
          class="absolute inset-0 flex justify-center items-center p-2 z-50 isolate"
        >
          <Dialog.Content
            :class="
              twMerge(
                `flex flex-col bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 text-overlay-fg rounded-xl border max-h-[80%] not-md:w-full md:min-w-116 shadow-lg dark:shadow-overlay/25 shadow-overlay-fg/5 !border-border dark:!border-t-[color-mix(in_oklab,var(--color-overlay)_82.5%,white)]`,
                containerClass,
              )
            "
          >
            <div
              :class="
                twMerge('flex flex-col px-4 py-4 gap-4 min-h-0', $props.class)
              "
            >
              <slot name="header">
                <div class="grid grid-cols-[1fr_auto] gap-2 -mb-2 shrink-0">
                  <Dialog.Title
                    v-if="
                      $slots.title || $slots.description || title || description
                    "
                    class="flex flex-col gap-1.5"
                  >
                    <slot name="title">
                      <h3 class="text-lg font-semibold">{{ title }}</h3>
                    </slot>

                    <slot name="description">
                      <p v-if="description" class="text-sm text-muted-fg">
                        {{ description }}
                      </p>
                    </slot>
                  </Dialog.Title>
                  <div v-else />

                  <VButton
                    variant="ghost"
                    size="icon"
                    @click="isOpen = false"
                    class="-mt-1 -mr-1 size-8"
                    title="close"
                  >
                    <XMarkIcon class="size-4.5" />
                  </VButton>
                </div>
              </slot>

              <div
                v-if="$slots.content"
                class="flex flex-col gap-2 flex-1 overflow-y-auto"
              >
                <slot name="content" />
              </div>

              <div
                v-if="$slots.actions"
                class="inline-flex justify-end gap-2 shrink-0"
              >
                <slot name="actions" />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </template>
    </Teleport>
  </Dialog.Root>
</template>
