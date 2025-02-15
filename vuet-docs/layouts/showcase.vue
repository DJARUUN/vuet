<script setup lang="ts">
const theme = ref("light");

onMounted(() => (theme.value = localStorage.getItem("theme")));

watch(theme, (newTheme: string) => localStorage.setItem("theme", newTheme));
</script>

<template>
  <div>
    <Html :class="theme">

    </Html>

    <div class="p-6 flex flex-col gap-6">
      <div class="text-xl font-semibold sticky top-6 left-0 -mx-0.5 -mt-0.5 right-0 dark:bg-zinc-800/85 dark:text-zinc-100 bg-white/85 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-300/55 border-t-zinc-300/35 rounded-xl px-6 py-5 inline-flex gap-6 border backdrop-blur-lg backdrop-saturate-150 z-1 justify-between items-center">
        <h1>Vuet</h1>
        <VButton
          variant="ghost"
          size="icon"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        >
          <svg
            v-if="theme === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </VButton>
      </div>

      <slot />
    </div>
  </div>
</template>
