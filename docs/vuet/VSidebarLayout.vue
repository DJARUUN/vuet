<template>
  <div class="lg:grid lg:grid-cols-[auto_1fr] flex flex-col h-dvh overflow-hidden">
    <slot name="sidebar" />

    <main
      class="px-4 py-4 scroll-pt-4 not-lg:scroll-pt-24 not-lg:pt-24 overflow-auto scroll-smooth flex flex-col gap-4">
      <slot />
    </main>
  </div>
</template>
