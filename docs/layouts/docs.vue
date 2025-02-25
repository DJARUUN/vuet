<script setup lang="ts">
import { queryCollectionNavigation, useHead } from '#imports';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, watch } from 'vue';
import TOC from '~/components/TOC.vue';
import VButton from '~/vuet/VButton.vue';
import VSidebar from '~/vuet/VSidebar.vue';
import VSidebarLayout from '~/vuet/VSidebarLayout.vue';
import SearchModal from '~/components/SearchModal.vue';

declare global {
  var theme: string;
}

useHead({
  script: [{
    children: `
      globalThis.theme = localStorage.getItem("theme") ?? "light";
      document.documentElement.classList.add(globalThis.theme);
    `}],
});

const theme = ref();
watch(theme, (newTheme) => localStorage.setItem("theme", newTheme));

onMounted(() => (theme.value = globalThis.theme));

const pages = await queryCollectionNavigation("content");
</script>

<template>
  <Html :class="theme">

  </Html>

  <VSidebarLayout>
    <template #sidebar>
      <VSidebar :items="pages">
        <template #headerLeft>
          <div class="inline-flex items-center gap-1 lg:flex-col lg:items-start group">
            <VButton to="/getting-started/introduction" variant="ghost"
              class="font-display text-xl font-bold -ml-3.5 w-fit">
              Vuet
            </VButton>

            <div
              class="grid not-lg:grid-cols-[0fr] not-lg:group-hover:grid-cols-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] opacity-50  group-hover:opacity-100 transition-[grid-template-columns,grid-template-rows,opacity] ease-smooth">
              <p class="text-sm text-muted-fg not-lg:overflow-x-hidden not-lg:text-nowrap lg:overflow-y-hidden">
                The components you need for the <span class="italic">modern</span> Vue ecosystem.
              </p>
            </div>
          </div>
        </template>

        <template #headerRight>
          <SearchModal />

          <VButton variant="ghost" size="icon" @click="theme = theme === 'dark' ? 'light' : 'dark'">
            <SunIcon v-if="theme === 'dark'" class="size-4.5" />
            <MoonIcon v-else class="size-4.5" />
          </VButton>
        </template>
      </VSidebar>
    </template>

    <div class="grid lg:grid-cols-[1fr_16rem] gap-9">
      <slot />

      <div class="lg:block hidden">
        <TOC />
      </div>
    </div>
  </VSidebarLayout>
</template>
