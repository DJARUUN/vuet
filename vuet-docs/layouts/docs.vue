<script setup lang="ts">
const defaultTheme = "light";

const theme = ref(defaultTheme);
watch(theme, (newTheme) => localStorage.setItem("theme", newTheme));

onMounted(() => (theme.value = localStorage.getItem("theme") || defaultTheme));

const pages = await queryCollectionNavigation("content");

const isMobileNavShown = ref(false);

const route = useRoute();
watch(route, (_) => isMobileNavShown.value = false);
</script>

<template>
  <Html :class="theme">

  </Html>

  <div class="hidden lg:grid grid-cols-[auto_1fr] gap-3 h-dvh overflow-hidden">
    <VSidebar :items="pages">
      <template #header>
        <div class="inline-flex justify-between items-center">
          <VButton link to="/getting-started/introduction" variant="ghost" class="text-xl font-bold -ml-3.5">Vuet
          </VButton>

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
        </div>
      </template>
    </VSidebar>

    <div class="p-6 overflow-auto">
      <slot />
    </div>
  </div>

  <div :class="`hidden not-lg:grid grid-rows-[auto_1fr] h-dvh ${isMobileNavShown && 'gap-3'}`">
    <div
      :class="`inline-flex justify-between items-center px-6 py-4 ${isMobileNavShown ? 'pb-0 -mb-6' : 'border-b dark:border-zinc-600/35 border-zinc-300/45'}`">
      <VButton link to="/getting-started/introduction" variant="ghost" class="text-xl font-bold -ml-3.5">Vuet</VButton>

      <div class="inline-flex gap-3">
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
    </div>

    <VSidebar v-show="isMobileNavShown" :items="pages" />

    <div v-show="!isMobileNavShown" class="p-6 overflow-auto">
      <slot />
    </div>
  </div>
</template>
