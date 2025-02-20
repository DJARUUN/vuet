<script setup lang="ts">
definePageMeta({
	layout: "docs",
	pageTransition: { name: "page", mode: "out-in" },
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
	queryCollection("content").path(route.path).first(),
);
if (!page.value)
	throw createError({
		status: 404,
		message: `${route.fullPath} is not a page`,
	});

useSeoMeta({
	title: page.value?.title + " - Vuet",
	description: page.value?.description,
});
</script>

<template>
	<div class="flex flex-col gap-6 overflow-auto scroll-smooth scroll-pt-6 w-[clamp(0px,100%,70ch)] mx-auto not-lg:mt-3">
		<ContentRenderer v-if="page" :value="page"
			class="prose prose-h1:font-bold prose-h1:text-3xl prose-headings:**:no-underline min-w-full" />

		<SiblingPageButtons :path="route.path" />
	</div>
</template>
