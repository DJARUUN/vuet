<template>
  <div class="grid lg:grid-cols-[auto_1fr] not-lg:grid-rows-[auto_1fr] lg:gap-3 h-dvh overflow-hidden">
    <slot name="sidebar" />

    <div class="p-6 overflow-auto flex flex-col gap-6">
      <slot />
    </div>
  </div>
</template>
