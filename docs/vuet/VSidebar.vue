<script setup lang="ts">
import VSidebarGroup from './VSidebarGroup.vue';
import VSidebarItem from './VSidebarItem.vue';
import VButton from './VButton.vue';
import VDrawer from './VDrawer.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const { items } = defineProps<{
  items: any[];
  groupClass?: string;
  itemClass?: string;
}>();

const isMobileNavShown = ref(false);

const route = useRoute();
watch(route, () => (isMobileNavShown.value = false));
</script>

<template>
  <aside
    class="hidden lg:flex flex-col gap-5 p-6 border-r border-border w-[18rem] overflow-auto bg-overlay/90 backdrop-blur-xl backdrop-saturate-150">
    <div v-if="$slots.header || $slots.headerLeft || $slots.headerRight"
      class="inline-flex justify-between items-center">
      <slot name="header">
        <div class="inline-flex gap-3">
          <slot name="headerLeft" />
        </div>

        <div class="inline-flex gap-3">
          <slot name="headerRight" />
        </div>
      </slot>
    </div>

    <nav class="flex flex-col gap-3">
      <template v-for="item in items" :key="item">
        <VSidebarGroup v-if="item.page === false" :item="item" :class="groupClass" :itemClass="itemClass" />
        <VSidebarItem v-else :item="item" :class="itemClass" />
      </template>
    </nav>

    <slot name="footer" />
  </aside>

  <div class="hidden not-lg:flex flex-col fixed isolate z-10 inset-x-0 max-h-full">
    <nav
      class="gap-5 px-6 inline-flex items-center overflow-auto min-h-18 bg-overlay/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border">
      <div class="inline-flex justify-between items-center w-full">
        <slot name="header">
          <div class="inline-flex gap-3">
            <slot name="headerLeft" />
          </div>

          <div class="inline-flex gap-3">
            <slot name="headerRight" />

            <VDrawer v-model="isMobileNavShown" class="px-3.5">
              <VButton variant="ghost" size="icon" @click="isMobileNavShown = !isMobileNavShown">
                <Bars3Icon v-if="!isMobileNavShown" class="size-4.5" />
                <XMarkIcon v-else class="size-4.5" />
              </VButton>

              <template #content>
                <div class="flex flex-col gap-3 px-2.5">
                  <template v-for="item in items" :key="item">
                    <VSidebarGroup v-if="item.page === false" :item="item" :class="groupClass" :itemClass="itemClass" />
                    <VSidebarItem v-else :item="item" :class="itemClass" />
                  </template>
                </div>
              </template>
            </VDrawer>
          </div>
        </slot>
      </div>
    </nav>
  </div>
</template>
