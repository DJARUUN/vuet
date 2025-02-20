<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const { items } = defineProps<{ items: ContentNavigationItem[] }>();

const isMobileNavShown = ref(false);

const route = useRoute();
watch(route, () => (isMobileNavShown.value = false));
</script>

<template>
  <aside
    class="hidden lg:flex flex-col gap-5 p-6 border-r border-border min-w-[18rem] overflow-auto bg-overlay/85 backdrop-blur-xl backdrop-saturate-150">
    <div class="inline-flex justify-between items-center">
      <slot name="header">
        <div class="inline-flex gap-3">
          <slot name="headerLeft" />
        </div>

        <div class="inline-flex gap-3">
          <slot name="headerRight" />
        </div>
      </slot>
    </div>

    <template v-for="item in items" :key="item">
      <VSidebarGroup v-if="item.page === false" :item="item" />
      <VSidebarItem v-else :item="item" />
    </template>

    <slot name="footer" />
  </aside>

  <div
    :class="`lg:hidden absolute inset-0 dark:bg-bg/60 bg-fg/40 z-[5] ${isMobileNavShown ? 'opacity-100 transition-opacity ease-out duration-150' : 'opacity-0 pointer-events-none'}`"
    @click="isMobileNavShown = false" />

  <div
    :class="`hidden not-lg:flex flex-col overflow-hidden fixed isolate z-10 inset-x-0 bg-overlay/85 backdrop-blur-xl backdrop-saturate-150 border-b border-border max-h-full ${isMobileNavShown && 'shadow-lg dark:shadow-overlay/25 shadow-overlay-fg/5 rounded-b-xl'}`">
    <nav class="gap-5 px-6 inline-flex items-center overflow-auto min-h-18">
      <div class="grid grid-cols-[1fr_auto] gap-3 flex-1">
        <div class="inline-flex justify-between items-center">
          <slot name="header">
            <div class="inline-flex gap-3">
              <slot name="headerLeft" />
            </div>

            <div class="inline-flex gap-3">
              <slot name="headerRight" />
            </div>
          </slot>
        </div>

        <VButton variant="ghost" size="icon" @click="isMobileNavShown = !isMobileNavShown">
          <svg v-if="!isMobileNavShown" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-4.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-4.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </VButton>
      </div>
    </nav>

    <Transition>
      <div v-show="isMobileNavShown" class="block p-6 pt-0 overflow-auto h-full">
        <div class="flex flex-col gap-5 transition-[translate,opacity] ease-bounce duration-300">
          <template v-for="item in items" :key="item">
            <VSidebarGroup v-if="item.page === false" :item="item" />
            <VSidebarItem v-else :item="item" />
          </template>
        </div>

        <slot name="footer" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  div {
    opacity: 50%;
    translate: 0 -0.75rem;
  }
}
</style>
