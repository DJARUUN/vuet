<template>
  <div class="lg:grid lg:grid-cols-[auto_1fr] flex flex-col lg:gap-3 h-dvh overflow-hidden">
    <slot name="sidebar" />

    <main
      class="px-6 py-8 scroll-pt-8 not-lg:scroll-pt-24 not-lg:pt-24 overflow-auto scroll-smooth flex flex-col gap-6">
      <slot />
    </main>
  </div>
</template>
