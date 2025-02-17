<script setup lang="ts">
definePageMeta({
  layout: "docs",
  // pageTransition: { name: "page", mode: "out-in" },
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("content").path(route.path).first()
);
if (!page.value)
  throw createError({
    status: 404,
    message: `${route.fullPath} is not a page`,
  });

useSeoMeta({
  title: page.value?.title + " - Vuet",
  description: page.value?.description,
});
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    class="prose prose-h1:font-bold prose-h1:text-3xl prose-headings:**:no-underline dark:prose-invert min-w-full"
  />
</template>
