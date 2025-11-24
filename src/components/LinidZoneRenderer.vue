<template>
  <component
    :is="entry.component"
    v-for="(entry, index) in components"
    :key="entry.plugin + index"
    v-bind="entry.props"
  />
  <slot v-if="isLoadingComplete && components.length === 0">
    <div>No components to render in this zone.</div>
  </slot>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { loadAsyncComponent } from '../services/federationService';
import { useLinidZoneStore } from '../stores/linidZoneStore';
import type { LinidZoneEntry } from '../types/linidZone';

const props = defineProps<{
  /**
   *  The zone identifier where to render components.
   */
  zone: string;
}>();
const linidZoneStore = useLinidZoneStore();

const components = ref<
  ({
    /**
     * The component to render.
     */
    component: unknown;
  } & LinidZoneEntry)[]
>([]);

const isLoadingComplete = ref(false);

watchEffect(() => {
  isLoadingComplete.value = false;

  const entries = linidZoneStore.zones[props.zone] || [];
  components.value = entries.map((entry) => ({
    ...entry,
    component: loadAsyncComponent(entry.plugin),
  }));

  Promise.resolve().then(() => {
    isLoadingComplete.value = true;
  });
});
</script>
