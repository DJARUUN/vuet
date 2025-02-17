<script setup lang="ts">
import { Select, createListCollection } from "@ark-ui/vue/select";

const collection = createListCollection({
	items: ["React", "Solid", "Vue"],
});

const isOpen = ref(false);
</script>

<template>
  <Select.Root :collection="collection" :open="isOpen">
    <Select.Control>
      <VButton @click="isOpen = !isOpen">Select a framework</VButton>
      <!-- <Select.Trigger> -->
      <!--   <Select.ValueText placeholder="Select a Framework" /> -->
      <!--   <Select.Indicator> -->
      <!--     <ChevronDownIcon /> -->
      <!--   </Select.Indicator> -->
      <!-- </Select.Trigger> -->
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>

    <Teleport to="body">
      <Select.Positioner>
        <Select.Content
          class="dark:bg-zinc-800/85 dark:text-zinc-100 bg-white/85 text-zinc-900 dark:border-zinc-600/35 dark:border-t-zinc-600/95 border-zinc-300/55 border-t-zinc-300/35 rounded-xl p-1 border max-h-full backdrop-blur-lg backdrop-saturate-150 w-full">
          <Select.ItemGroup class="flex flex-col gap-0.5">
            <Select.Item v-for="item in collection.items" :key="item" :item="item"
              class="dark:hover:bg-zinc-700/85 dark:active:bg-zinc-600/85 hover:bg-zinc-50/85 active:bg-zinc-100/85 dark:text-zinc-100 text-zinc-900 flex text-sm font-medium rounded-md cursor-pointer transition-[background-color,color,border] ease-out py-0.5 px-2">
              <Select.ItemText>{{ item }}</Select.ItemText>
              <Select.ItemIndicator>X</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>

    <Select.HiddenSelect />
  </Select.Root>
</template>
