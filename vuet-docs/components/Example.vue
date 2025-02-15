<script setup lang="ts">
defineProps<{ title: string; example: string }>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="inline-flex justify-between items-center">
      <h3 class="font-medium dark:text-zinc-100 text-zinc-900">{{title}}</h3>
      <VButton
        variant="outline"
        size="icon"
        link
        :to="`/examples/${example}`"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </VButton>
    </div>

    <div class="aspect-square lg:aspect-video dark:bg-zinc-900 bg-zinc-100 rounded-2xl p-3 relative isolate border dark:border-zinc-500/35 border-zinc-400/45">
      <iframe
        :src="`/examples/${example}`"
        width="100%"
        height="100%"
      />
    </div>
  </div>
</template>
