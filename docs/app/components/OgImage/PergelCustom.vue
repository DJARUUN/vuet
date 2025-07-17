<script lang="ts" setup>
/**
 * @credits Pergel <https://nuxtlabs.com/>
 */
const { title = "Title", description = "Description" } = defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#0f0f12]">
    <!-- <img src="/stars.png" class="w-[1800px] object-cover opacity-65 z-0" /> -->

    <svg
      class="absolute inset-0 z-50"
      width="1200"
      height="675"
      viewBox="0 0 1200 675"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="mix-blend-mode: overlay"
        opacity="0.7"
        filter="url(#filter0_f_448_25)"
      >
        <circle cx="-155.3" cy="-125.5" r="656.5" fill="#155dfc20" />
        <circle cx="1201.3" cy="656.5" r="259.5" fill="#155dfc0a" />
      </g>
      <defs>
        <filter
          id="filter0_f_448_25"
          x="-240"
          y="-374"
          width="1561"
          height="1111"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="110"
            result="effect1_foregroundBlur_448_25"
          />
        </filter>
      </defs>
    </svg>

    <div class="w-full px-[100px] flex flex-col gap-3 justify-center z-100">
      <h1
        class="text-[72px] text-[#fafafa] flex items-center leading-none font-bold tracking-tighter"
      >
        <span>{{
          title.endsWith(" - Vuet")
            ? title.slice(0, title.length - " - Vuet".length)
            : title
        }}</span>
      </h1>
      <p
        class="text-[32px] text-[#d4d4d8d9] leading-tight"
        style="font-family: &quot;Geist&quot;"
      >
        {{ description.slice(0, 200) }}
      </p>
    </div>
  </div>
</template>
