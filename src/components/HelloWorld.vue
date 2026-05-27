<script setup lang="ts">
import heroImg from '@/assets/hero.png';
import iconsSprite from '@/assets/icons.svg?raw';
import viteLogo from '@/assets/vite.svg';
import vueLogo from '@/assets/vue.svg';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';
const { isLoading, isAuthenticated, user } = useAuth0();

type ThemePayload =
  | string
  | { darkMode?: boolean; locale?: string }
  | Record<string, unknown>;

const { theme } = defineProps<{ theme?: ThemePayload }>();

const themeLabel =
  typeof theme === 'string' ? theme : theme ? JSON.stringify(theme) : undefined;

const count = ref(0);
</script>

<template>
  <div v-if="isLoading">Loading authentication...</div>
  <template v-else-if="isAuthenticated">
    <p>Welcome, {{ user?.name }}!</p>
    <div class="icon-sprite" v-html="iconsSprite" aria-hidden="true"></div>
    <section id="center">
      <div class="hero">
        <img :src="heroImg" class="base" width="170" height="179" alt="" />
        <img :src="vueLogo" class="framework" alt="Vue logo" />
        <img :src="viteLogo" class="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Get started</h1>
        <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
        <p v-if="themeLabel">Theme: {{ themeLabel }}</p>
      </div>
      <button type="button" class="counter" @click="count++">
        Count is {{ count }}
      </button>
    </section>

    <div class="ticks"></div>

    <section id="next-steps">
      <div id="docs">
        <svg class="icon" role="presentation" aria-hidden="true">
          <use href="#documentation-icon"></use>
        </svg>
        <h2>Documentation</h2>
        <p>Your questions, answered</p>
        <ul>
          <li>
            <a href="https://vite.dev/" target="_blank">
              <img class="logo" :src="viteLogo" alt="" />
              Explore Vite
            </a>
          </li>
          <li>
            <a href="https://vuejs.org/" target="_blank">
              <img class="button-icon" :src="vueLogo" alt="" />
              Learn more
            </a>
          </li>
        </ul>
      </div>
      <div id="social">
        <svg class="icon" role="presentation" aria-hidden="true">
          <use href="#social-icon"></use>
        </svg>
        <h2>Connect with us</h2>
        <p>Join the Vite community</p>
        <ul>
          <li>
            <a href="https://github.com/vitejs/vite" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="#github-icon"></use>
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://chat.vite.dev/" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="#discord-icon"></use>
              </svg>
              Discord
            </a>
          </li>
          <li>
            <a href="https://x.com/vite_js" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="#x-icon"></use>
              </svg>
              X.com
            </a>
          </li>
          <li>
            <a href="https://bsky.app/profile/vite.dev" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="#bluesky-icon"></use>
              </svg>
              Bluesky
            </a>
          </li>
        </ul>
      </div>
    </section>

    <div class="ticks"></div>
    <section id="spacer"></section>
  </template>
</template>

<style scoped>
.icon-sprite {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.icon-sprite :global(svg) {
  width: 0;
  height: 0;
}
</style>
