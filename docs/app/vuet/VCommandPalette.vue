<script setup lang="ts" generic="T">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import VButton from "./VButton.vue";
import VResponsiveModal from "./VResponsiveModal.vue";
import { onMounted, ref, watch, type Ref } from "vue";

const { onSearch } = defineProps<{
  placeholder?: string;
  onSearch(query: string): T[];
}>();

const isOpen = defineModel<boolean>("open", {
  required: false,
  default: false,
});
const query = defineModel<string>("query", { required: false, default: "" });
const contentRef = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  select: [item: T];
}>();

const results: Ref<T[]> = ref([]);
const selectedIdx = ref(-1);

watch(isOpen, (isOpen_) => {
  if (isOpen_) {
    query.value = "";
    selectedIdx.value = 0;
  } else {
    selectedIdx.value = -1;
  }
});

watch(query, (query_) => {
  results.value = onSearch(query_);
  selectedIdx.value = results.value.length > 0 ? 0 : -1;
});

watch(results, (newResults) => {
  if (newResults.length > 0 && isOpen.value) {
    selectedIdx.value = 0;
  } else {
    selectedIdx.value = -1;
  }
});

watch(selectedIdx, (selectedIdx_) => {
  if (selectedIdx_ !== -1 && results.value.length > 0 && contentRef.value) {
    const selectedElement = contentRef.value.children[
      selectedIdx_
    ] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
      });
    }
  }
});

function handleClose() {
  isOpen.value = false;
}

function handleSelect(item: T) {
  emit("select", item);
  handleClose();
}

function handleKeyDown(event: KeyboardEvent) {
  if (!isOpen.value || results.value.length === 0) return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (selectedIdx.value < results.value.length - 1) {
        selectedIdx.value++;
      }
      break;

    case "ArrowUp":
      event.preventDefault();
      if (selectedIdx.value > 0) {
        selectedIdx.value--;
      }
      break;

    case "Enter":
      event.preventDefault();
      if (selectedIdx.value !== -1 && results.value[selectedIdx.value]) {
        handleSelect(results.value[selectedIdx.value]);
      }
  }
}

function handleMouseOver(idx: number) {
  selectedIdx.value = idx;
}

onMounted(() => {
  if (isOpen.value) {
    selectedIdx.value = 0;
  }
});
</script>

<template>
  <VResponsiveModal
    v-model="isOpen"
    containerClass="not-lg:min-h-[80%] lg:fixed lg:top-[15%] lg:max-h-[70%] lg:min-w-0 lg:w-[640px]"
    noHandle
    class="gap-2 p-0 pb-2"
  >
    <slot />

    <template #header>
      <div class="w-full relative">
        <input
          type="text"
          class="py-2 px-3 rounded-t-xl text-fg border-b border-b-input placeholder:text-muted-fg focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 ease-smooth shrink-0 w-full"
          :placeholder="placeholder"
          v-model="query"
          @keydown="handleKeyDown"
        />

        <VButton
          variant="ghost"
          size="icon"
          class="absolute right-2 top-[50%] -translate-y-[50%]"
          @click="handleClose"
        >
          <XMarkIcon class="size-4.5" />
        </VButton>
      </div>
    </template>

    <template #content>
      <div
        ref="contentRef"
        class="flex flex-col flex-1 overflow-y-auto px-2"
        tabindex="-1"
      >
        <template v-if="results.length > 0">
          <VButton
            v-for="(item, idx) of results"
            :key="idx"
            style="
              --selected-bg-light: color-mix(
                in oklab,
                var(--color-border) 60%,
                var(--color-overlay)
              );
            "
            :class="`h-fit py-2.5 hover:bg-transparent text-start justify-start items-start ${selectedIdx === idx && 'dark:bg-muted dark:hover:bg-muted bg-(--selected-bg-light) hover:bg-(--selected-bg-light)'}`"
            tabindex="-1"
            @click="handleSelect(item)"
            variant="ghost"
            @mouseenter="handleMouseOver(idx)"
          >
            <slot name="item" :item="item" />
          </VButton>
        </template>

        <p v-else class="text-muted-fg text-sm py-4 text-center">
          <template v-if="query.length > 0">
            No results found for
            <span class="text-fg">"{{ query }}"</span>.
          </template>
          <template v-else> Start typing to see results here. </template>
        </p>
      </div>
    </template>
  </VResponsiveModal>
</template>
