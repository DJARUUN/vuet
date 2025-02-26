<script setup lang="ts">
import { queryCollectionNavigation, useHead, useTheme } from '#imports';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import VButton from '~/vuet/VButton.vue';
import VSidebar from '~/vuet/VSidebar.vue';
import VSidebarLayout from '~/vuet/VSidebarLayout.vue';
import SearchModal from '~/components/SearchModal.vue';

const theme = useTheme();

const pages = await queryCollectionNavigation("content");
</script>

<template>
  <VSidebarLayout>
    <template #sidebar>
      <VSidebar :items="pages">
        <template #headerLeft>
          <VButton to="/" variant="ghost" class="font-display text-xl font-bold -ml-3.5 w-fit">
            Vuet
          </VButton>
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

    <div class="grid lg:grid-cols-[1fr_16rem] gap-9 w-full">
      <slot />
    </div>
  </VSidebarLayout>
</template>
