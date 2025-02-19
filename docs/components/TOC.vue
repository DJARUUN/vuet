<script setup lang="ts">
const route = useRoute();
const page = ref(await queryCollection("content").path(route.path).first());

const loadingIndicator = useLoadingIndicator();

watch(route, async ({ path }) => {
  setTimeout(async () => {
    if (!loadingIndicator.isLoading.value)
      page.value = await queryCollection("content").path(path).first();
  }, 200);
});

watch(loadingIndicator.isLoading, async (isLoading) => {
  if (!isLoading)
    page.value = await queryCollection("content").path(route.path).first();
});
</script>

<template>
  <div class="flex flex-col gap-3 lg:min-w-[16rem] lg:fixed lg:top-0 lg:pt-9 lg:right-6 lg:p-3">
    <VCollapsible title="On this page" defaultCollapsed autoCloseOnMobile>
      <div class="flex flex-col gap-1">
        <TOCItems :links="page?.body.toc?.links || []" />
      </div>
    </VCollapsible>
  </div>
</template>
