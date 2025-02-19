<template>
  <div class="flex flex-col gap-3">
    <VCollapsible title="Preview" variant="container">
      <slot />
    </VCollapsible>

    <VCollapsible title="Code" variant="container" defaultCollapsed>
      <slot name="code" />
    </VCollapsible>
  </div>
</template>
