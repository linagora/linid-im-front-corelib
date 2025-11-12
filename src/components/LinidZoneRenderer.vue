<template>
  <component
    :is="entry.component"
    v-for="(entry, index) in components"
    :key="entry.plugin + index"
    v-bind="entry.props"
  />
</template>

<script setup lang="ts">
import { useLinidZoneStore } from '../stores/linidZoneStore';
import { defineAsyncComponent, ref, watchEffect, type Component } from 'vue';

const props = defineProps<{ zone: string }>();
const linidZoneStore = useLinidZoneStore();

const components = ref<
  { component: Component; plugin: string; props?: Record<string, Component> }[]
>([]);

watchEffect(() => {
  const entries = linidZoneStore.zones[props.zone] || [];
  components.value = entries.map((entry) => {
    const asyncComp = defineAsyncComponent(() => import(entry.plugin));

    return { ...entry, component: asyncComp };
  });
});
</script>
