<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { defaultCollapsed, autoCloseOnMobile } = defineProps<{
	title: string;
	class?: string;
	defaultCollapsed?: boolean;
	autoCloseOnMobile?: boolean;
}>();

const isCollapsed = ref(
	defaultCollapsed !== undefined ? defaultCollapsed : false,
);

function handleAutoCloseOnMobile() {
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
  <div class="flex flex-col gap-0.5 w-full">
    <VButton variant="ghost"
      :class="twMerge(`text-base -mx-2.5 px-2.5 h-7 ${isCollapsed && 'dark:text-zinc-400 text-zinc-600'}`, $props.class)"
      innerClass="justify-between" @click="isCollapsed = !isCollapsed">
      <span>{{ title }}</span>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        :class="`size-4 transition-[rotate] ease-out ${!isCollapsed && 'rotate-180'}`">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </VButton>

    <div
      :class="`grid transition-[grid-template-rows] ease-out ${isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`">
      <div class="overflow-y-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>
