<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue';

type ThemePayload =
  | string
  | { darkMode?: boolean; locale?: string }
  | Record<string, unknown>;

defineProps<{ theme?: ThemePayload }>();
</script>

<template>
  <div>
    <HelloWorld :theme="theme" />
  </div>
</template>
