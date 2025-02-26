<script setup lang="ts">
import { useTheme } from '#imports'
import {
  SparklesIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/outline'
import VButton from '~/vuet/VButton.vue'
import SearchModal from '~/components/SearchModal.vue'

const theme = useTheme();
</script>

<template>
  <div class="h-dvh bg-bg text-fg">
    <div class="flex flex-col fixed isolate z-10 inset-x-0 max-h-full">
      <nav
        class="gap-5 px-6 inline-flex items-center overflow-auto min-h-18 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border">
        <div class="inline-flex justify-between items-center w-full">
          <slot name="header">
            <div class="inline-flex gap-3 items-center">
              <SparklesIcon class="h-6 w-6 text-primary" />
              <span class="font-display font-bold text-xl">Vuet</span>
            </div>

            <div class="inline-flex gap-3 items-center">
              <SearchModal />
              <VButton variant="ghost" size="icon" @click="theme = theme === 'dark' ? 'light' : 'dark'">
                <SunIcon v-if="theme === 'dark'" class="size-4.5" />
                <MoonIcon v-else class="size-4.5" />
              </VButton>
            </div>
          </slot>
        </div>
      </nav>
    </div>

    <main class="pt-16 h-full">
      <slot />
    </main>
  </div>
</template>
