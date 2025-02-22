<script setup lang="ts">
defineProps<{
	title?: string;
	description?: string;
	class?: string;
	contentClass?: string;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });

const showDrawer = ref(false);

const computedComponent = computed(() => showDrawer.value ? resolveComponent('VDrawer') : resolveComponent('VDialog'));

function handleResize() {
	showDrawer.value = window.innerWidth < 1024;
}

watch(showDrawer, () => isOpen.value = false);

onMounted(() => {
	handleResize();
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<template>
	<component :is="computedComponent" v-bind="$props" v-model:open="isOpen">
		<slot />

		<template #title>
			<slot name="title" />
		</template>

		<template #description>
			<slot name="description" />
		</template>

		<template #content>
			<slot name="content" />
		</template>

		<template #actions>
			<slot name="actions" />
		</template>
	</component>
</template>
