<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { items } = defineProps<{ items: ContentNavigationItem[] }>();

const isMobileNavShown = ref(false);

const route = useRoute();
watch(route, () => isMobileNavShown.value = false);
</script>

<template>
  <aside
    class="hidden lg:flex flex-col gap-5 p-6 border-r dark:border-zinc-500/35 border-zinc-400/30 min-w-[18rem] overflow-auto">
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

  <nav
    class="hidden not-lg:flex flex-col gap-5 px-6 py-4 border-b dark:border-zinc-500/35 border-zinc-400/30 min-w-[18rem] overflow-auto">
    <div class="grid grid-cols-[1fr_auto] gap-3">
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
    <div v-show="isMobileNavShown"
      class="lg:hidden block fixed z-[100] top-16 dark:bg-zinc-900 bg-zinc-100 p-6 bottom-0 inset-x-0 pt-0 overflow-auto">
      <div class="flex flex-col gap-5 transition-[scale] origin-top ease-bounce duration-300">
        <template v-for="item in items" :key="item">
          <VSidebarGroup v-if="item.page === false" :item="item" />
          <VSidebarItem v-else :item="item" />
        </template>
      </div>

      <slot name="footer" />
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-from {
  div {
    scale: 100% 90%;
  }
}
</style>
