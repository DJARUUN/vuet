<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import VButton from "./VButton.vue";
import { onMounted, onUnmounted } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

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
		outer: `gap-0.5`,
		button: `h-7 -mx-2.5 px-2.5`,
		inner: ``,
		innest: ``,
	},
	container: {
		outer: `border border-border rounded-xl`,
		button: `h-10 px-3 hover:bg-transparent transition-[color] ease-smooth`,
		inner: `p-2 pt-0 in-data-collapsed:-mb-2`,
		innest: ``,
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
		:class="twMerge('flex flex-col w-full', variantStyles[variant].outer)">
		<VButton variant="ghost"
			:class="twMerge(`text-[0.925rem] justify-between ${isCollapsed && 'text-muted-fg hover:text-fg'}`, variantStyles[variant].button, $props.class)"
			@click="isCollapsed = !isCollapsed">
			<span>{{ title }}</span>

			<ChevronDownIcon :class="`size-4 transition-[rotate] ease-smooth ${!isCollapsed && 'rotate-180'}`" />
		</VButton>

		<div
			:class="twMerge(`grid transition-[grid-template-rows,opacity] ease-smooth ${isCollapsed ? 'grid-rows-[0fr] opacity-75' : 'grid-rows-[1fr]'}`, variantStyles[variant].inner)">
			<div :class="twMerge('overflow-y-hidden', variantStyles[variant].innest, innerClass)">
				<slot />
			</div>
		</div>
	</div>
</template>
