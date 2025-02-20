<template>
  <div class="lg:grid lg:grid-cols-[auto_1fr] flex flex-col lg:gap-3 h-dvh overflow-hidden">
    <slot name="sidebar" />

    <main class="p-6 overflow-auto scroll-smooth flex flex-col gap-6 scroll-pt-6">
      <slot />
    </main>
  </div>
</template>
