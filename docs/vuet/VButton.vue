<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const {
	type = "button",
	variant = "default",
	size = "default",
	nuxt = true,
} = defineProps<{
	type?: "button" | "submit" | "reset";
	variant?: keyof typeof variantStyles;
	size?: "default" | "icon";
	nuxt?: boolean;
	to?: string;
	class?: string;
	innerClass?: string;
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
}>();

const sharedStyles = `flex text-sm font-medium rounded-lg cursor-pointer transition-[background-color,color,border,opacity] ease-out data-disabled:opacity-60 data-disabled:cursor-not-allowed select-none data-disabled:pointer-events-none`;

const sizeStyles = {
	default: `h-8.5 px-3.5`,

	icon: `size-8.5`,
};

const variantStyles = {
	default: `
    bg-secondary hover:bg-[color-mix(in_oklab,var(--color-secondary)_90%,black)]
    text-secondary-fg
    !border-[color-mix(in_oklab,var(--color-secondary)_92.5%,white)] !border-t-[color-mix(in_oklab,var(--color-secondary)_82.5%,white)]
    border
	`,

	primary: `
    bg-primary hover:bg-[color-mix(in_oklab,var(--color-primary)_90%,black)]
    text-primary-fg
    !border-[color-mix(in_oklab,var(--color-primary)_92.5%,white)] !border-t-[color-mix(in_oklab,var(--color-primary)_82.5%,white)]
    border
	`,

	soft: `
    bg-muted hover:bg-secondary
    text-fg
  `,

	outline: `
    hover:bg-muted
    text-fg
    border-border
    border
  `,

	ghost: `
    hover:bg-muted
    text-fg
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

const innerStyles = "inline-flex gap-2 items-center justify-center size-full";
</script>

<template>
	<button v-if="!to" :type="type" :data-disabled="disabled || null"
		:class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)">
		<div :class="twMerge(innerStyles, innerClass)">
			<slot v-if="loading" name="loading">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="size-4 animate-spin">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
				</svg>
				<span v-if="loadingText">{{ loadingText }}</span>
			</slot>

			<slot v-else />
		</div>
	</button>

	<NuxtLink v-else-if="nuxt && to" :data-disabled="disabled || null"
		:class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)" :to="to">
		<div :class="twMerge(innerStyles, innerClass)">
			<slot v-if="loading" name="loading">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="size-4 animate-spin">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
				</svg>
				<span v-if="loadingText">{{ loadingText }}</span>
			</slot>

			<slot v-else />
		</div>
	</NuxtLink>

	<a v-else :data-disabled="disabled || null"
		:class="twMerge(sharedStyles, sizeStyles[size], variantStyles[variant], $props.class)" :href="to">
		<div :class="twMerge(innerStyles, innerClass)">
			<slot v-if="loading" name="loading">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="size-4 animate-spin">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
				</svg>
				<span v-if="loadingText">{{ loadingText }}</span>
			</slot>

			<slot v-else />
		</div>
	</a>
</template>
