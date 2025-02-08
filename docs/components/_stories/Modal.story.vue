<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <Story>
    <Variant title="default">
      <VModal
        title="Are you sure you want to delete this?"
        description="This action is permanent and cannot be undone."
      >
        <VButton @click="open = true">Open</VButton>

        <template #content>
          <p>fortnite?</p>
        </template>

        <template #actions>
          <VButton variant="primary">Delete it</VButton>
          <VButton @click="open = false">Cancel</VButton>
        </template>
      </VModal>

      <div class="flex flex-col gap-3 text-red-500">
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
        <p>banan</p>
      </div>
    </Variant>
  </Story>
</template>
