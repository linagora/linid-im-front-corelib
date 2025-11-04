<template>
  <component
    v-for="(entry, index) in components"
    :key="entry.plugin + index"
    :is="entry.component"
    v-bind="entry.props"
  />
</template>

<script setup lang="ts">
import {useLinidZoneStore} from "../stores/linidZoneStore";
import {defineAsyncComponent, ref, watchEffect} from "vue";

const props = defineProps<{ zone: string }>();
const linidZoneStore = useLinidZoneStore();

const components = ref<{ component: any; plugin: string; props?: Record<string, any> }[]>([]);

watchEffect(() => {
  const entries = linidZoneStore.zones[props.zone] || [];
  components.value = entries.map((entry) => {
    const asyncComp = defineAsyncComponent(() => import(entry.plugin));

    return {...entry, component: asyncComp};
  });
});
</script>
