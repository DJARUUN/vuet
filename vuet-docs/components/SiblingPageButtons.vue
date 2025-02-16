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
    <VButton :disabled="!prevPage" variant="outline" :to="prevPage && prevPage.path" class="h-fit py-2.5 rounded-xl"
      innerClass="flex flex-col items-start">
      <div class="grid grid-cols-[auto_1fr] gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4 mt-1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

        <div class="flex flex-col gap-0.5 items-start">
          <h3 class="text-lg font-semibold">
            {{ prevPage ? prevPage.title : "First page" }}
          </h3>

          <p class="text-sm font-base text-start line-clamp-2 min-h-[2lh] dark:text-zinc-400 text-zinc-600">
            {{ prevPage?.description || "This is the first page" }}
          </p>
        </div>
      </div>
    </VButton>

    <VButton :disabled="!nextPage" variant="outline" :to="nextPage && nextPage.path" class="h-fit py-2.5 rounded-xl"
      innerClass="flex flex-col items-end">
      <div class="grid grid-cols-[1fr_auto] gap-3">
        <div class="flex flex-col gap-0.5 items-end">
          <h3 class="text-lg font-semibold">
            {{ nextPage ? nextPage.title : "Last page" }}
          </h3>

          <p class="text-sm font-base text-end line-clamp-2 min-h-[2lh] dark:text-zinc-400 text-zinc-600">
            {{ nextPage?.description || "This is the last page" }}
          </p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4 mt-1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </VButton>
  </div>
</template>
