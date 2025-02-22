<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue';
import { twMerge } from "tailwind-merge";

defineProps<{
	title?: string;
	description?: string;
	class?: string;
	contentClass?: string;
}>();

const isOpen = defineModel<boolean>({ required: false, default: false });
</script>

<template>
	<DrawerRoot v-model:open="isOpen">
		<slot />

		<DrawerPortal>
			<DrawerOverlay class="fixed inset-0 dark:bg-bg/40 bg-fg/15" />

			<DrawerContent
				:class="twMerge('flex flex-col rounded-t-xl mt-24 max-h-[80%] fixed bottom-0 inset-x-0 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 text-overlay-fg border-t border-x !border-border dark:!border-[color-mix(in_oklab,var(--color-overlay)_82.5%,white)]', $props.class)">
				<div class="mx-auto w-20 h-1.5 rounded-full bg-border mt-4 shrink-0" />

				<div :class="twMerge('flex flex-col gap-6 p-6 min-h-0', contentClass)">
					<div class="grid grid-cols-[1fr_auto] gap-5">
						<div class="flex flex-col gap-1.5 shrink-0">
							<slot name="title">
								<h3 class="text-lg font-semibold">{{ title }}</h3>
							</slot>

							<slot name="description">
								<p v-if="description" class="text-sm text-muted-fg">{{ description }}</p>
							</slot>
						</div>
					</div>

					<div class="flex flex-col gap-3 flex-1 overflow-y-auto">
						<slot name="content" />
					</div>

					<div class="inline-flex justify-end gap-2 shrink-0">
						<slot name="actions" />
					</div>
				</div>
			</DrawerContent>
		</DrawerPortal>
	</DrawerRoot>
</template>
