<script setup lang="ts">
import { queryCollection, queryCollectionItemSurroundings } from "#imports";
import SiblingPageButton from "./SiblingPageButton.vue";

const { path } = defineProps<{ path: string }>();

const siblingPages = await queryCollectionItemSurroundings("content", path);

const prevPage = await queryCollection("content")
  .path(siblingPages[0]?.path!)
  .first();

const nextPage = await queryCollection("content")
  .path(siblingPages[1]?.path!)
  .first()!;
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-2">
    <SiblingPageButton :toPage="prevPage" :next="false" />
    <SiblingPageButton :toPage="nextPage" :next="true" />
  </div>
</template>
