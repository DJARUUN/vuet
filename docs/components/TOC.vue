<script setup lang="ts">
import { queryCollection, useLoadingIndicator } from '#imports';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import VCollapsible from '~/vuet/VCollapsible.vue';
import TOCItems from './TOCItems.vue';

const route = useRoute();
const page = ref(await queryCollection("content").path(route.path).first());

const loadingIndicator = useLoadingIndicator();

async function getPathContent(path: string) {
  return await queryCollection("content").path(path).first();
}

watch(route, async ({ path }) => {
  setTimeout(async () => {
    if (!loadingIndicator.isLoading.value)
      page.value = await getPathContent(path);
  }, 200);
});

watch(loadingIndicator.isLoading, async (isLoading) => {
  if (!isLoading)
    page.value = await getPathContent(route.path);
});
</script>

<template>
  <div class="flex flex-col gap-3 lg:min-w-[16rem] lg:fixed lg:top-0 lg:pt-9.5 lg:right-6 lg:p-3">
    <VCollapsible title="On this page">
      <div class="flex flex-col gap-1">
        <TOCItems :links="page?.body.toc?.links || []" />
      </div>
    </VCollapsible>
  </div>
</template>
