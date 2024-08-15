<template>
  <div class="container" role="main">
    <h1>{{ pageName }} Page Under Construction</h1>
    <p>I'm working hard to bring you this page. Check back soon!</p>
    <div class="countdown">
      <p>{{ countdownText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const countdownText = ref("");
    const pageName = ref("");
    const countdownEndDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const limit = countdownEndDate - now;

      const days = Math.floor(limit / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (limit % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((limit % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((limit % (1000 * 60)) / 1000);

      countdownText.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (limit < 0) {
        countdownText.value = "Time’s up!";
      }
    };

    onMounted(() => {
      updateCountdown();
      setInterval(updateCountdown, 1000);

      switch (route.name) {
        case "Pricing":
          pageName.value = "Pricing";
          break;
        case "Blog":
          pageName.value = "Blog";
          break;
        case "Help":
          pageName.value = "Help";
          break;
        default:
          pageName.value = "";
      }
    });

    return {
      countdownText,
      pageName,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.countdown {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
