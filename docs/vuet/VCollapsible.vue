<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import VButton from "./VButton.vue";
import { onMounted, onUnmounted } from "vue";

const { variant = "default", defaultCollapsed, autoCloseOnMobile } = defineProps<{
	title: string;
	class?: string;
	innerClass?: string;
	variant?: keyof typeof variantStyles;
	defaultCollapsed?: boolean;
	autoCloseOnMobile?: boolean;
	dontOverlapSides?: boolean;
}>();

const isCollapsed = defineModel<boolean>({ required: false });
if (defaultCollapsed) isCollapsed.value = true;

const variantStyles = {
	default: {
		outer: `
			gap-0.5
		`,
		button: `
			h-7 -mx-2.5 px-2.5
		`,
		inner: `
		`,
		innest: `
		`,
	},

	container: {
		outer: `
			border border-border rounded-xl
		`,
		button: `
			h-12 px-4 hover:bg-transparent transition-[color] ease-smooth
		`,
		inner: `
			p-3 pt-0 group-data-collapsed:-mb-3
		`,
		innest: `
		`,
	},
};

function handleAutoCloseOnMobile() {
	if (autoCloseOnMobile) {
		if (window.innerWidth < 1024) isCollapsed.value = true;
		else isCollapsed.value = false;
	}
}

onMounted(() => {
	window.addEventListener("resize", handleAutoCloseOnMobile);

	handleAutoCloseOnMobile();
});

onUnmounted(() => {
	window.removeEventListener("resize", handleAutoCloseOnMobile);
});
</script>

<template>
	<div :data-collapsed="isCollapsed || undefined"
		:class="twMerge('flex flex-col w-full group', variantStyles[variant].outer)">
		<VButton variant="ghost"
			:class="twMerge(`text-[0.925rem] ${isCollapsed && 'text-muted-fg hover:text-fg'}`, variantStyles[variant].button, $props.class)"
			innerClass="justify-between" @click="isCollapsed = !isCollapsed">
			<span>{{ title }}</span>

			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				:class="`size-4 transition-[rotate] ease-smooth ${!isCollapsed && 'rotate-180'}`">
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</VButton>

		<div
			:class="twMerge(`grid transition-[grid-template-rows,opacity] ease-smooth ${isCollapsed ? 'grid-rows-[0fr] opacity-75' : 'grid-rows-[1fr]'}`, variantStyles[variant].inner)">
			<div :class="twMerge('overflow-y-hidden', variantStyles[variant].innest, innerClass)">
				<slot />
			</div>
		</div>
	</div>
</template>
