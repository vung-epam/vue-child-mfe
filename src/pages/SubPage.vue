<script setup lang="ts">
type ThemePayload =
  | string
  | { darkMode?: boolean; locale?: string }
  | Record<string, unknown>;

const { theme } = defineProps<{ theme?: ThemePayload }>();

const themeLabel =
  typeof theme === 'string' ? theme : theme ? JSON.stringify(theme) : undefined;
</script>

<template>
  <section class="sub-page">
    <h1>Vue MFE Sub Page</h1>
    <p>This is <code>/vue/sub</code>.</p>
    <p v-if="themeLabel">Theme: {{ themeLabel }}</p>
    <div class="actions">
      <RouterLink to="/">Back to /vue</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.sub-page {
  padding: 24px;
}

.actions {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}

.actions a {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}
</style>
