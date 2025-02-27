<script setup lang="ts">
import { createError, queryCollectionNavigation, useAsyncData, useTheme } from '#imports';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import VButton from '~/vuet/VButton.vue';
import VSidebar from '~/vuet/VSidebar.vue';
import VSidebarLayout from '~/vuet/VSidebarLayout.vue';
import SearchModal from '~/components/SearchModal.vue';

const theme = useTheme();

const { data: pages } = await useAsyncData(() => queryCollectionNavigation("content"));
if (!pages.value) throw createError({ status: 500, message: "Something went wrong. Try again later." });
</script>

<template>
  <VSidebarLayout>
    <template #sidebar>
      <VSidebar :items="pages ?? []">
        <template #header>
          <div class="inline-flex gap-3 justify-between lg:flex lg:flex-col lg:gap-3 w-full">
            <div class="inline-flex gap-3 justify-between">
              <VButton to="/" variant="ghost" class="font-display text-xl font-bold -ml-3.5 w-fit">
                Vuet
              </VButton>

              <VButton variant="ghost" size="icon" @click="theme = theme === 'dark' ? 'light' : 'dark'"
                class="not-lg:hidden">
                <SunIcon v-if="theme === 'dark'" class="size-4.5" />
                <MoonIcon v-else class="size-4.5" />
              </VButton>
            </div>

            <div class="inline-flex gap-3 flex-1">
              <SearchModal buttonClass="not-lg:flex-1 lg:w-full" />

              <VButton variant="ghost" size="icon" @click="theme = theme === 'dark' ? 'light' : 'dark'"
                class="lg:hidden">
                <SunIcon v-if="theme === 'dark'" class="size-4.5" />
                <MoonIcon v-else class="size-4.5" />
              </VButton>
            </div>
          </div>
        </template>
      </VSidebar>
    </template>

    <div class="grid lg:grid-cols-[1fr_16rem] gap-9 w-full">
      <slot />
    </div>
  </VSidebarLayout>
</template>
