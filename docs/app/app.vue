<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
      color="linear-gradient(in oklab 120deg, color-mix(in oklab, var(--color-primary) 97.5%, white), color-mix(in oklab, var(--color-primary) 90%, white))" />
  </div>
</template>
