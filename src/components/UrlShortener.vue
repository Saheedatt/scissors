<template>
  <div>
    <h2>Shorten Your URL</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="url" placeholder="Enter your URL" required />
      <button type="submit">Shorten</button>
    </form>
    <div v-if="shortenedUrl">
      <p style="font-weight: bold">
        Shortened URL:
        <a :href="shortenedUrl" target="_blank" style="color: blue">{{ shortenedUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFirebase } from "../composables/useFirebase";

//remember to import the formValidation and use it appropriately(It caused an issue before)
// import { urlStorage } from "../store";
// import { useValidation } from "../composables/formValidation";

export default defineComponent({
  setup() {
    const { shortenUrl } = useFirebase();
    const url = ref("");
    const shortenedUrl = ref("");

    const handleSubmit = async () => {
      try {
        shortenedUrl.value = await shortenUrl(url.value);
      } catch (event) {
        console.error("Failed to shorten URL", event);
      }
    };

    return {
      url,
      shortenedUrl,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.url-shortener {
  text-align: center;
  margin-top: 2rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #f57c00;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
input {
  width: 100%;
  height: 40px;
}
</style>
