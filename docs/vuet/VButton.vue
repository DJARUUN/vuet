<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { NuxtLink } from "#components";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
const {
	type = "button",
	variant = "default",
	size = "default",
	linkType = "nuxt",
	class: classProp,
	to,
	loading,
	disabled,
} = defineProps<{
	type?: "button" | "submit" | "reset";
	variant?: keyof typeof variantStyles;
	size?: keyof typeof sizeStyles;
	linkType?: "nuxt" | "vue" | "anchor";
	to?: string;
	class?: string;
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
}>();

const sharedStyles = `
	transition-[background-color,color,border,opacity,outline] ease-smooth data-disabled:opacity-70 data-disabled:cursor-not-allowed outline-transparent
	${variant !== 'link' ? 'flex font-medium rounded-lg select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-fg' : 'inline-flex'}
	inline-flex items-center justify-center
`;

const sizeStyles = {
	default: `text-sm gap-2 h-8 px-3`,
	small: `text-xs gap-1.5 h-7 px-2.5`,
	icon: `size-8`,
};
const sizeStyle = variant !== "link" ? sizeStyles[size] : undefined;

const variantStyles = {
	default: `
		bg-secondary hover:bg-[color-mix(in_oklab,var(--color-secondary)_90%,black)]
		text-secondary-fg
		!border-[color-mix(in_oklab,var(--color-secondary)_92.5%,white)] !border-t-[color-mix(in_oklab,var(--color-secondary)_82.5%,white)]
		border
	`,

	primary: `
		bg-primary hover:bg-[color-mix(in_oklab,var(--color-primary)_90%,black)]
		dark:text-primary-fg text-bg
		!border-[color-mix(in_oklab,var(--color-primary)_92.5%,white)] !border-t-[color-mix(in_oklab,var(--color-primary)_82.5%,white)]
		border
	`,

	soft: `
		bg-muted hover:bg-secondary
		text-fg
	`,

	outline: `
		bg-bg hover:bg-muted
		text-fg
		border-border
		border
	`,

	ghost: `
		hover:bg-muted
		text-fg
	`,

	link: `
		text-body hover:text-fg
		hover:underline
	`,

	success: `
		bg-success hover:bg-[color-mix(in_oklab,var(--color-success)_90%,black)]
		dark:text-fg text-bg
	`,

	warning: `
		bg-warning hover:bg-[color-mix(in_oklab,var(--color-warning)_90%,black)]
		dark:text-bg text-fg
	`,

	danger: `
		bg-danger hover:bg-[color-mix(in_oklab,var(--color-danger)_90%,black)]
		dark:text-fg text-bg
	`,
};

const elementTag = computed(() => {
	// For regular buttons
	if (!to) return "button";
	// For links of any type
	switch (linkType) {
		case "nuxt": return NuxtLink;
		case "vue": return RouterLink;
		default: return "a";
	}
});

const elementProps = computed(() => {
	const sharedProps = {
		"data-disabled": loading || disabled || undefined,
		class: twMerge(sharedStyles, sizeStyle, variantStyles[variant], classProp),
	};
	// For regular buttons
	if (!to) {
		return {
			...sharedProps,
			type: type,
			disabled: loading || disabled || undefined,
		};
	}
	// For links of any type
	switch (linkType) {
		case "nuxt":
		case "vue":
			return {
				...sharedProps,
				to: !disabled ? to : "javascript:void(0)",
			};
		default:
			return {
				...sharedProps,
				href: !disabled ? to : "javascript:void(0)",
				tag: "a",
			};
	}
});
</script>

<template>
	<component :is="elementTag" v-bind="elementProps">
		<slot v-if="loading" name="loading">
			<ArrowPathIcon class="size-4 animate-spin" />
			<span v-if="loadingText">{{ loadingText }}</span>
		</slot>
		<slot v-else />
	</component>
</template>
