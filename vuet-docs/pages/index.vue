<script setup lang="ts">
definePageMeta({
  layout: "showcase",
});
</script>

<template>
  <div class="flex-1 grid gap-6 grid-cols[repeat(auto-fit,1fr)] lg:grid-cols-[repeat(auto-fit,minmax(calc(50%-calc(var(--spacing)*6)),1fr))]">
    <div
      class="dark:bg-zinc-800 bg-zinc-200 fixed inset-0 -z-50"
      aria-hidden="true"
    />

    <template
      v-for="i in 2"
      :key="i"
    >
      <Example
        title="Button"
        example="button"
      />

      <Example
        title="Select"
        example="select"
      />

      <Example
        title="Modal"
        example="modal"
      />
    </template>
  </div>
</template>
