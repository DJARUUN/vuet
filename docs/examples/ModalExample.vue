<script setup lang="ts">
const safetyCheckText = ref("");
const safetyCheckValid = computed(() => safetyCheckText.value.trim() === "DJARUUN/vuet");

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
  <VModal title="Delete DJARUUN/vuet" v-model="isOpen">
    <VButton variant="danger" @click="isOpen = true">Delete this repository</VButton>

    <template #content>
      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-out"
        v-model="safetyCheckText">
    </template>

    <template #actions>
      <VButton variant="outline" @click="isOpen = false">Cancel</VButton>
      <VButton variant="danger" :disabled="!safetyCheckValid" @click="handleDeleteProject" :loading="isPending"
        loadingText="Deleting project">
        Delete project
      </VButton>
    </template>
  </VModal>
</template>
