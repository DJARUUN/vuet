<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <div>
    <VModal
      title="Delete team project files"
      description="You're about to delete all files related to Project X-23. This includes documentation, assets, and configuration files."
      v-model="open"
    >
      <!-- Trigger Button -->
      <VButton @click="open = true">
        Delete project
      </VButton>

      <!-- Modal Content -->
      <template #content>
        <div class="space-y-4">
          <!-- Warning Box -->
          <div class="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg">
            <div class="flex gap-3">
              <svg
                class="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <div>
                <h4 class="font-medium text-amber-900 dark:text-amber-200">Critical warning</h4>
                <p class="mt-1 text-sm text-amber-700 dark:text-amber-300">This will permanently delete:</p>
                <ul class="mt-2 text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• 47 design assets</li>
                  <li>• 12 documentation files</li>
                  <li>• All version history</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                <svg
                  class="w-6 h-6 text-zinc-600 dark:text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V8.342a2 2 0 00-.602-1.43l-4.44-4.342A2 2 0 0013.56 2H6a2 2 0 00-2 2z"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div>
                <p class="font-medium">Project X-23</p>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Last modified by Alex • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Actions -->
      <template #actions>
        <VButton
          variant="outline"
          @click="open = false"
        >
          Cancel
        </VButton>
        <VButton
          variant="primary"
          @click="open = false"
        >
          Delete forever
        </VButton>
      </template>
    </VModal>

    <!-- Background Content -->
    <div class="mt-6 grid gap-4">
      <div
        v-for="i in 3"
        :key="i"
        class="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm"
      >
        <div class="h-4 bg-zinc-100 dark:bg-zinc-700 rounded w-3/4"></div>
        <div class="mt-2 h-3 bg-zinc-100 dark:bg-zinc-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>
