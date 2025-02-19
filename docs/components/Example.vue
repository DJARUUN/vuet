<template>
  <div class="flex flex-col gap-3">
    <VCollapsible title="Preview" variant="container">
      <slot />
    </VCollapsible>

    <VCollapsible title="Code" variant="container">
      <slot name="code" />
    </VCollapsible>
  </div>
</template>
