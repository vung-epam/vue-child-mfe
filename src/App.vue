<script setup lang="ts">
import styles from './App.module.scss';

type ThemePayload = { darkMode?: boolean; locale?: string };

const props = defineProps<{ theme?: ThemePayload }>();

// const navigateAway = (route: string) => {
//   navigateToUrl(route);
// };
</script>

<template>
  <div :class="styles.app">
    <nav :class="styles.nav">
      <RouterLink to="/vue">Vue Home</RouterLink>
      <RouterLink to="/vue/users">Users</RouterLink>
    </nav>
    <RouterView v-slot="{ Component }">
      <component :is="Component" :theme="props.theme" />
    </RouterView>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 24px;
}

.nav a {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

.nav a.router-link-active {
  text-decoration: underline;
}
</style>
