<script setup lang="ts">
import { queryCollectionNavigation, useHead } from '#imports';
import { onMounted, ref, watch } from 'vue';
import TOC from '~/components/TOC.vue';
import VButton from '~/vuet/VButton.vue';
import VSidebar from '~/vuet/VSidebar.vue';
import VSidebarLayout from '~/vuet/VSidebarLayout.vue';

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
      <VSidebar :items="pages" groupClass="font-display">
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
          <!-- <SearchModal /> -->

          <VButton variant="ghost" size="icon" @click="theme = theme === 'dark' ? 'light' : 'dark'">
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-4.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          </VButton>
        </template>
      </VSidebar>
    </template>

    <div class="lg:grid lg:grid-cols-[1fr_16rem] not-lg:flex not-lg:flex-col-reverse lg:gap-9 not-lg:gap-6">
      <slot />

      <div class="not-lg:w-[clamp(0px,100%,70ch)] not-lg:mx-auto">
        <TOC />
      </div>
    </div>
  </VSidebarLayout>
</template>
