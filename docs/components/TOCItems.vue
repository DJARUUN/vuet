<script setup lang="ts">
import VButton from '~/vuet/VButton.vue';

defineProps<{ links: any[] }>();
</script>

<template>
  <template v-for="link in links" :key="link">
    <VButton :to="`#${link.id}`" linkType="anchor" variant="ghost"
      class="text-sm px-2.5 h-7 text-muted-fg hover:text-fg justify-start"
      :style="`margin-left: ${(link.depth - 2) * 1}rem;`">
      {{ link.text }}
    </VButton>

    <TOCItems v-if="link.children !== undefined" :links="link.children" />
  </template>
</template>
