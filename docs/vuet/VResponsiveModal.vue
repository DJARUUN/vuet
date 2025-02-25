<script setup lang="ts">
import VDrawer from './VDrawer.vue';
import VDialog from './VDialog.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

defineProps<{
	title?: string;
	description?: string;
	class?: string;
	containerClass?: string;

	// Drawer specific
	noHandle?: boolean;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });

const showDrawer = ref(false);

const computedComponent = computed(() => showDrawer.value ? VDrawer : VDialog);

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
	<component :is="computedComponent" v-bind="$props" v-model="isOpen">
		<template #default>
			<slot />
		</template>

		<template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotData">
			<slot :name="name" v-bind="slotData" />
		</template>
	</component>
</template>
