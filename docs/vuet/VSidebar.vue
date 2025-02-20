<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const { items } = defineProps<{ items: ContentNavigationItem[] }>();

const isMobileNavShown = ref(false);

const route = useRoute();
watch(route, () => (isMobileNavShown.value = false));
</script>

<template>
  <aside
    class="hidden lg:flex flex-col gap-5 p-6 border-r border-border min-w-[18rem] overflow-auto bg-overlay/90 backdrop-blur-xl backdrop-saturate-150">
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

  <div class="hidden not-lg:flex flex-col fixed isolate z-60 inset-x-0 max-h-full">
    <nav
      class="gap-5 px-6 inline-flex items-center overflow-auto min-h-18 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border">
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

    <VModal v-model="isMobileNavShown" contentClass="px-0 py-3">
      <template #content>
        <div class="flex flex-col gap-5 px-6">
          <template v-for="item in items" :key="item">
            <VSidebarGroup v-if="item.page === false" :item="item" />
            <VSidebarItem v-else :item="item" />
          </template>

          <DevOnly>
            <template v-for="item in items" :key="item">
              <VSidebarGroup v-if="item.page === false" :item="item" />
              <VSidebarItem v-else :item="item" />
            </template>

            <template v-for="item in items" :key="item">
              <VSidebarGroup v-if="item.page === false" :item="item" />
              <VSidebarItem v-else :item="item" />
            </template>

            <template v-for="item in items" :key="item">
              <VSidebarGroup v-if="item.page === false" :item="item" />
              <VSidebarItem v-else :item="item" />
            </template>

            <template v-for="item in items" :key="item">
              <VSidebarGroup v-if="item.page === false" :item="item" />
              <VSidebarItem v-else :item="item" />
            </template>
          </DevOnly>
        </div>
      </template>
    </VModal>
  </div>
</template>
