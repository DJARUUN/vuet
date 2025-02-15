<script setup lang="ts">
const variant = ref("default");
const size = ref("default");
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="inline-flex gap-2 justify-end">
      <ExampleField title="variant">
        <select
          v-model="variant"
          class="dark:bg-zinc-900 bg-zinc-100"
        >
          <option>default</option>
          <option>primary</option>
          <option>outline</option>
          <option>ghost</option>
        </select>
      </ExampleField>

      <ExampleField title="size">
        <select
          v-model="size"
          class="dark:bg-zinc-900 bg-zinc-100"
        >
          <option>default</option>
          <option>icon</option>
        </select>
      </ExampleField>
    </div>

    <div class="flex w-full">
      <VButton
        :variant="variant"
        :size="size"
      >
        <template v-if="size === 'default'">Click me!</template>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </VButton>
    </div>
  </div>

  <!-- <div class="flex flex-col gap-6"> -->
  <!--   <div class="flex flex-col gap-3"> -->
  <!--     <h5 class="text-sm">Normal</h5> -->
  <!---->
  <!--     <div class="inline-flex gap-3"> -->
  <!--       <VButton>Default</VButton> -->
  <!--       <VButton variant="primary">Primary</VButton> -->
  <!--       <VButton variant="outline">Outline</VButton> -->
  <!--       <VButton variant="ghost">Ghost</VButton> -->
  <!--     </div> -->
  <!--   </div> -->
  <!---->
  <!--   <div class="flex flex-col gap-3"> -->
  <!--     <h5 class="text-sm">Size icon</h5> -->
  <!---->
  <!--     <div class="inline-flex gap-3"> -->
  <!--       <VButton size="icon"> -->
  <!--         <svg -->
  <!--           xmlns="http://www.w3.org/2000/svg" -->
  <!--           fill="none" -->
  <!--           viewBox="0 0 24 24" -->
  <!--           stroke-width="1.5" -->
  <!--           stroke="currentColor" -->
  <!--           class="size-4.5" -->
  <!--         > -->
  <!--           <path -->
  <!--             stroke-linecap="round" -->
  <!--             stroke-linejoin="round" -->
  <!--             d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" -->
  <!--           /> -->
  <!--         </svg> -->
  <!--       </VButton> -->
  <!---->
  <!--       <VButton -->
  <!--         size="icon" -->
  <!--         variant="primary" -->
  <!--       ><svg -->
  <!--           xmlns="http://www.w3.org/2000/svg" -->
  <!--           fill="none" -->
  <!--           viewBox="0 0 24 24" -->
  <!--           stroke-width="1.5" -->
  <!--           stroke="currentColor" -->
  <!--           class="size-4.5" -->
  <!--         > -->
  <!--           <path -->
  <!--             stroke-linecap="round" -->
  <!--             stroke-linejoin="round" -->
  <!--             d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" -->
  <!--           /> -->
  <!--         </svg> -->
  <!--       </VButton> -->
  <!---->
  <!--       <VButton -->
  <!--         size="icon" -->
  <!--         variant="outline" -->
  <!--       ><svg -->
  <!--           xmlns="http://www.w3.org/2000/svg" -->
  <!--           fill="none" -->
  <!--           viewBox="0 0 24 24" -->
  <!--           stroke-width="1.5" -->
  <!--           stroke="currentColor" -->
  <!--           class="size-4.5" -->
  <!--         > -->
  <!--           <path -->
  <!--             stroke-linecap="round" -->
  <!--             stroke-linejoin="round" -->
  <!--             d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" -->
  <!--           /> -->
  <!--         </svg> -->
  <!--       </VButton> -->
  <!---->
  <!--       <VButton -->
  <!--         size="icon" -->
  <!--         variant="ghost" -->
  <!--       ><svg -->
  <!--           xmlns="http://www.w3.org/2000/svg" -->
  <!--           fill="none" -->
  <!--           viewBox="0 0 24 24" -->
  <!--           stroke-width="1.5" -->
  <!--           stroke="currentColor" -->
  <!--           class="size-4.5" -->
  <!--         > -->
  <!--           <path -->
  <!--             stroke-linecap="round" -->
  <!--             stroke-linejoin="round" -->
  <!--             d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" -->
  <!--           /> -->
  <!--         </svg> -->
  <!--       </VButton> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
</template>
