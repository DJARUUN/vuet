<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="border dark:border-zinc-500/35 border-zinc-400/45 rounded-md inline-flex gap-1 py-1 px-2 text-sm">
    <p class="border-r dark:border-r-zinc-500/35 border-r-zinc-400/45 pr-2 dark:text-zinc-400 text-zinc-600">{{title}}</p>
    <slot />
  </div>
</template>
