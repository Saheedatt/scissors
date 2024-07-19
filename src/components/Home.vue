<template>
  <main class="home">
    <section class="hero">
      <h1 class="typing-container" v-if="showTypingEffect">{{ typingText }}</h1>
      <h1 v-else>Let's help you manipulate your looonnnggg links!</h1>
      <!-- <h1>Let's help you manipulate your looonnnggg links!</h1> -->
      <div class="buttons">
        <router-link to="/" class="button" :class="{ active: isShortenerPath }">
          <img src="../assets/linkIcon.png" /> Shorten
        </router-link>
        <router-link
          to="/qr-code"
          class="button"
          :class="{ active: isQrCodePath }"
        >
          <img src="../assets/qrIcon.png" /> QR Code
        </router-link>
      </div>
    </section>
    <section class="content">
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
// import QrCode from './QrCode.vue'
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const isShortenerPath = computed(() => route.name === "UrlShortener");
    const isQrCodePath = computed(() => route.name === "QrCode");
    const typingText = ref("");
    const fullText = "Let's help you manipulate your looonnnggg links!";
    const showTypingEffect = ref(true);

    onMounted(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          typingText.value += fullText[index];
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            showTypingEffect.value = false;
          }, 1000);
        }
      }, 100);
    });

    return {
      isShortenerPath,
      isQrCodePath,
      typingText,
      showTypingEffect,
    };
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  background-color: #f4f4f4; 
  min-height: 100vh;
}

.hero {
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #001;
}

.hero p {
  font-size: 1.25rem;
  color: #777;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-block-start: 4rem;
}

.button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #ff9800;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.button img {
  width: 24px;
  height: 24px;
}

.button:hover {
  background-color: #f57c00;
}

.button.active {
  background-color: #d46e00;
}

.content {
  padding: 2rem;
}
</style>
