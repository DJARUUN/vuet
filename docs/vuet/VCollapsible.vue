<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { variant = "default", defaultCollapsed, autoCloseOnMobile } = defineProps<{
	title: string;
	class?: string;
	innerClass?: string;
	variant?: keyof typeof variantStyles;
	defaultCollapsed?: boolean;
	autoCloseOnMobile?: boolean;
	dontOverlapSides?: boolean;
}>();

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
			h-12 px-4 hover:bg-transparent transition-[color] ease-out
		`,
		inner: `
			p-3 pt-0 data-collapsed:-mb-3
		`,
		innest: `
		 *:!m-0
		`,
	},
};

const isCollapsed = defineModel<boolean>({ required: false });
if (defaultCollapsed) isCollapsed.value = true;

function handleAutoCloseOnMobile() {
	return;

	if (autoCloseOnMobile && window.innerWidth < 1024) isCollapsed.value = true;
	else isCollapsed.value = false;
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
	<div :class="twMerge('flex flex-col w-full', variantStyles[variant].outer)" :data-collapsed="isCollapsed || null">
		<VButton variant="ghost" :data-collapsed="isCollapsed || null"
			:class="twMerge(`text-base ${isCollapsed && 'text-muted-fg hover:text-fg'}`, variantStyles[variant].button, $props.class)"
			innerClass="justify-between" @click="isCollapsed = !isCollapsed">
			<span>{{ title }}</span>

			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				:class="`size-4 transition-[rotate] ease-out ${!isCollapsed && 'rotate-180'}`">
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</VButton>

		<div :data-collapsed="isCollapsed || null"
			:class="twMerge(`grid transition-[grid-template-rows,opacity] ease-out ${isCollapsed ? 'grid-rows-[0fr] opacity-75' : 'grid-rows-[1fr]'}`, variantStyles[variant].inner)">
			<div :class="twMerge('overflow-y-hidden', variantStyles[variant].innest, innerClass)">
				<slot />
			</div>
		</div>
	</div>
</template>
