<script setup lang="ts">
defineProps<{ links: any[] }>();
</script>

<template>
  <template
    v-for="link in links"
    :key="link"
  >
    <VButton
      :to="`#${link.id}`"
      :nuxt="false"
      variant="ghost"
      class="text-sm px-2.5 h-7 dark:text-zinc-400 text-zinc-600"
      innerClass="justify-start"
      :style="`margin-left: ${(link.depth - 2) * 1}rem;`"
    >
      {{ link.text }}
    </VButton>

    <TOCItems
      v-if="link.children !== undefined"
      :links="link.children"
    />
  </template>
</template>
