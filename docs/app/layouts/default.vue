<script setup lang="ts">
import { useTheme } from "#imports";
import { CubeIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import VButton from "~/vuet/VButton.vue";
import SearchModal from "~/components/SearchModal.vue";

const theme = useTheme();
</script>

<template>
  <div class="h-dvh">
    <div class="flex flex-col fixed isolate z-10 inset-x-0 max-h-full">
      <nav
        class="gap-3 px-4 inline-flex items-center overflow-auto min-h-16 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border"
      >
        <div class="inline-flex justify-between items-center w-full gap-2">
          <VButton
            to="/"
            variant="ghost"
            class="font-display text-xl font-bold -ml-3 w-fit"
          >
            Vuet
          </VButton>

          <div class="inline-flex gap-2 items-center flex-1 justify-end">
            <SearchModal
              buttonClass="not-md:aspect-square md:w-66 not-md:justify-center md:justify-start"
              textClass="not-md:hidden"
            />

            <VButton to="/primitives/button" variant="outline">
              <CubeIcon class="size-4.5" />
              All Components
            </VButton>

            <VButton
              variant="ghost"
              size="icon"
              @click="theme = theme === 'dark' ? 'light' : 'dark'"
            >
              <SunIcon v-if="theme === 'dark'" class="size-4.5" />
              <MoonIcon v-else class="size-4.5" />
            </VButton>
          </div>
        </div>
      </nav>
    </div>

    <main class="h-full overflow-x-hidden scroll-smooth scroll-pt-24">
      <slot />
    </main>
  </div>
</template>
