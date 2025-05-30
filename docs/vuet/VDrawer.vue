<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue';
import { twMerge } from "tailwind-merge";

defineProps<{
	title?: string;
	description?: string;
	class?: string;
	containerClass?: string;
	noHandle?: boolean;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });
</script>

<template>
	<DrawerRoot v-model:open="isOpen">
		<slot />

		<DrawerPortal>
			<DrawerOverlay class="fixed inset-0 dark:bg-bg/40 bg-fg/15 z-20" />

			<DrawerContent
				:class="twMerge(`z-50 flex flex-col gap-3 rounded-t-xl mt-24 max-h-[80%] fixed bottom-0 inset-x-0 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 text-overlay-fg border-t border-x !border-border dark:!border-[color-mix(in_oklab,var(--color-overlay)_82.5%,white)]`, containerClass)">
				<div v-if="!noHandle" class="mx-auto w-20 h-1.5 rounded-full bg-border mt-4 shrink-0" />

				<div :class="twMerge('flex flex-col gap-4 px-4 pb-4 min-h-0 flex-1', $props.class)">
					<slot name="header">
						<div v-if="$slots.title || $slots.description || title || description"
							class="flex flex-col gap-1.5 shrink-0">
							<slot name="title">
								<h3 class="text-lg font-semibold">{{ title }}</h3>
							</slot>

							<slot name="description">
								<p v-if="description" class="text-sm text-muted-fg">{{ description }}</p>
							</slot>
						</div>
					</slot>

					<div v-if="$slots.content" class="flex flex-col gap-2 overflow-y-auto flex-1" data-vaul-no-drag>
						<slot name="content" />
					</div>

					<div v-if="$slots.actions" class="inline-flex justify-end gap-2 shrink-0">
						<slot name="actions" />
					</div>
				</div>
			</DrawerContent>
		</DrawerPortal>
	</DrawerRoot>
</template>
