<script setup lang="ts">
import { ContentRenderer } from '#components';
import { createError, definePageMeta, queryCollection, useAsyncData, useRoute, useSeoMeta } from '#imports';
import SiblingPageButtons from '~/components/SiblingPageButtons.vue';

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
	<div class="flex flex-col gap-6 overflow-auto scroll-smooth w-[clamp(0px,100%,70ch)] mx-auto">
		<ContentRenderer v-if="page" :value="page"
			class="prose prose-h1:font-bold prose-h1:text-3xl prose-headings:**:no-underline prose-headings:**:hover:underline min-w-full" />

		<SiblingPageButtons :path="route.path" />
	</div>
</template>
