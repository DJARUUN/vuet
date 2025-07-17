<script setup lang="ts">
import { computed, ref } from "vue";
import VButton from "~/vuet/VButton.vue";
import VResponsiveModal from "~/vuet/VResponsiveModal.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

const safetyCheckText = ref("");
const safetyCheckValid = computed(
  () => safetyCheckText.value.trim() === "DJARUUN/vuet",
);

const isOpen = ref(false);

const isPending = ref(false);

function handleDeleteProject() {
  isPending.value = true;

  setTimeout(() => {
    isOpen.value = false;
    safetyCheckText.value = "";
    isPending.value = false;
  }, 750);
}
</script>

<template>
  <VResponsiveModal title="Delete DJARUUN/vuet" v-model="isOpen">
    <VButton variant="danger" @click="isOpen = true">
      <TrashIcon class="size-4" />
      <span>Delete this repository</span>
    </VButton>

    <template #content>
      <form @submit.prevent="handleDeleteProject" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-sm text-muted-fg">
            To confirm, type "DJARUUN/vuet" in the box below
          </p>
          <input
            type="text"
            class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg outline-transparent focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70 transition-[outline] ease-smooth shrink-0"
            v-model="safetyCheckText"
          />
        </div>

        <div class="inline-flex gap-2 items-center justify-end w-full">
          <VButton variant="outline" @click="isOpen = false">Cancel</VButton>
          <VButton
            variant="danger"
            type="submit"
            :disabled="!safetyCheckValid"
            :loading="isPending"
            loadingText="Deleting project"
          >
            Delete project
          </VButton>
        </div>
      </form>
    </template>
  </VResponsiveModal>
</template>
