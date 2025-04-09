<script setup lang="ts">
import { ContentRenderer } from "#components";
import {
  computed,
  createError,
  defineOgImageComponent,
  definePageMeta,
  queryCollection,
  useAsyncData,
  useRoute,
  useSeoMeta,
  useHead,
  defineOgImage,
  defineRouteRules,
} from "#imports";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  CubeIcon,
} from "@heroicons/vue/24/outline";
import SiblingPageButtons from "~/components/SiblingPageButtons.vue";
import VButton from "~/vuet/VButton.vue";

definePageMeta({
  layout: "docs",
  pageTransition: { name: "page", mode: "out-in" },
});

const componentSourceBasePath =
  "https://github.com/DJARUUN/vuet/blob/master/docs/vuet/";

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("content").path(route.path).first()
);
if (!page.value) {
  throw createError({
    status: 404,
    message: `${route.fullPath} is not a page`,
  });
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
});

defineOgImageComponent("PergelCustom", {
  colorMode: "dark",
});

function slugToWords(slug: string) {
  return slug
    .split("/")
    .slice(1, -1)
    .map((segment) =>
      segment
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    );
}

const meta = computed(() => page.value?.meta as Record<string, any>);
</script>

<template>
  <div
    v-if="page"
    class="flex flex-col gap-6 overflow-auto scroll-smooth w-[clamp(0px,100%,70ch)] mx-auto"
  >
    <div class="flex flex-col gap-4 text-sm">
      <div class="inline-flex gap-1 items-center mb-2">
        <template v-for="word in slugToWords(page.path || '')" :key="word">
          <span class="text-muted-fg font-[450]">{{ word }}</span>
          <ChevronRightIcon class="text-muted-fg size-3.5" />
        </template>

        <div class="inline-flex gap-2 items-center">
          <CubeIcon class="size-4 text-muted-fg shrink-0" />
          <span class="font-medium">{{ page.title }}</span>
        </div>
      </div>

      <h1 class="font-bold font-display text-3xl">{{ page.title }}</h1>

      <p class="text-muted-fg text-[1.05rem] leading-7">
        {{ page.description }}
      </p>

      <div v-if="!page.stem.startsWith('1.')" class="inline-flex gap-2">
        <VButton
          v-if="meta.headless"
          :to="meta.headless.url as string"
          variant="soft"
          size="small"
          target="_blank"
        >
          <img :src="meta.headless.logo as string" class="size-3.5" />
          {{ meta.headless.title }}
        </VButton>

        <VButton
          :to="`${componentSourceBasePath}V${page.title}.vue`"
          variant="soft"
          size="small"
          target="_blank"
        >
          Component Source
          <ArrowTopRightOnSquareIcon class="size-3.5" />
        </VButton>
      </div>
    </div>

    <hr class="text-border mb-3" />

    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose prose-h1:font-bold prose-h1:text-3xl prose-headings:**:no-underline prose-headings:**:hover:underline min-w-full"
    />

    <SiblingPageButtons :path="route.path" />
  </div>
</template>
