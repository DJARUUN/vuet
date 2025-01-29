<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <slot name="header" />
      <VButton>X</VButton>
    </div>

    <div class="flex flex-col gap-3">
      <slot />
    </div>

    <div class="flex gap-3 justify-end">
      <VButton>Cancel</VButton>
      <VButton>Confirm</VButton>
    </div>
  </div>
</template>
