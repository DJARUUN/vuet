<script setup lang="ts">
const { type = "button" } = defineProps<{ type: "button" | "submit" | "reset" }>()
</script>

<template>
	<button
		class="px-3 py-1.5 rounded-md bg-zinc-950 text-zinc-50 hover:bg-zinc-900 active:scale-[97.5%] transition-all ease-out cursor-pointer"
		:type="type"
	>
		<slot />
	</button>
</template>
