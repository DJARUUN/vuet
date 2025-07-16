<script setup lang="ts">
import VCollapsible from "~~/vuet/VCollapsible.vue";
</script>

<template>
  <div class="flex flex-col gap-2">
    <VCollapsible title="Preview" variant="container">
      <slot />
    </VCollapsible>

    <VCollapsible title="Code" variant="container" defaultCollapsed>
      <slot name="code" />
    </VCollapsible>
  </div>
</template>
