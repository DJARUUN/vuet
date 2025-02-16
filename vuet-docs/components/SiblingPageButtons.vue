<script setup lang="ts">
const route = useRoute();

const siblingPages = ref(await queryCollectionItemSurroundings("content", route.path));

const prevPage = ref(await queryCollection("content").path(siblingPages.value[0]?.path).first())
const nextPage = ref(await queryCollection("content").path(siblingPages.value[1]?.path).first())

watch(route, async ({ path }) => {
  siblingPages.value = await queryCollectionItemSurroundings("content", path);

  prevPage.value = await queryCollection("content").path(siblingPages.value[0]?.path).first();
  nextPage.value = await queryCollection("content").path(siblingPages.value[1]?.path).first();
})
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-3">
    <SiblingPageButton :toPage="prevPage" :next="false" />
    <SiblingPageButton :toPage="nextPage" :next="true" />
  </div>
</template>
