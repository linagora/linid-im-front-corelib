<template>
  <component
    :is="entry.component"
    v-for="(entry, index) in components"
    :key="entry.plugin + index"
    v-bind="entry.props"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watchEffect } from 'vue';
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

watchEffect(() => {
  const entries = linidZoneStore.zones[props.zone] || [];
  components.value = entries.map((entry) => {
    const asyncComp = defineAsyncComponent(() => import(entry.plugin));

    return { ...entry, component: asyncComp };
  });
});
</script>
