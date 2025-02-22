<script setup lang="ts">
import { computed, ref } from 'vue';
import VButton from '~/vuet/VButton.vue';
import VResponsiveModal from '~/vuet/VResponsiveModal.vue';

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
  <VResponsiveModal title="Delete DJARUUN/vuet" v-model="isOpen">
    <VButton variant="danger" @click="isOpen = true">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      <span>Delete this repository</span>
    </VButton>

    <template #content>
      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">

      <p class="text-sm text-muted-fg">To confirm, type "DJARUUN/vuet" in the box below</p>
      <input type="text"
        class="min-h-10 px-3.5 rounded-lg text-fg border border-input placeholder:text-muted-fg focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 transition-[border] ease-smooth"
        v-model="safetyCheckText">
    </template>

    <template #actions>
      <VButton variant="outline" @click="isOpen = false">Cancel</VButton>
      <VButton variant="danger" :disabled="!safetyCheckValid" @click="handleDeleteProject" :loading="isPending"
        loadingText="Deleting project">
        Delete project
      </VButton>
    </template>
  </VResponsiveModal>
</template>
