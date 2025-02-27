<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import VCollapsible from "./VCollapsible.vue";
import VSidebarGroup from "./VSidebarGroup.vue";
import VSidebarItem from "./VSidebarItem.vue";

const { item } = defineProps<{
  item: any;
  isNested?: boolean;
  class?: string;
  itemClass?: string;
}>();
</script>

<template>
  <div :class="`inline-flex gap-1 mx-1.5 ${isNested && '-mb-0.5'}`">
    <div v-if="isNested" class="w-[2px]">
      <div class="h-8.5 transition-all ease-smooth bg-border w-[1px]" />
    </div>

    <VCollapsible :title="item.title" :class="twMerge(`${isNested && 'mx-0 text-muted-fg h-8.5 px-3.5'}`, $props.class)"
      :defaultCollapsed="isNested">
      <div :class="`flex flex-col ${isNested && 'px-2.5'}`">
        <template v-for="item_ in item.children" :key="item_">
          <VSidebarGroup v-if="item_.page === false" :item="item_" isNested :class="$props.class" />
          <VSidebarItem v-else :item="item_" :class="itemClass" />
        </template>
      </div>
    </VCollapsible>
  </div>
</template>
