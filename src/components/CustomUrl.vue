<template>
  <main class="container">
    <section class="card">
      <h1>Create your custom URL</h1>
      <p class="subheading">Let your customized urls reflect your brand!</p>
      <form @submit.prevent="handleSubmit">
        <label for="url">Enter your URL:</label>
        <input v-model="url" placeholder="Enter your URL" required />
        <label for="customName">Enter custom text:</label>
        <input
          v-model="customName"
          placeholder="Enter custom text of your choice"
          required
        />
        <div class="button">
          <button type="submit">Get custom url</button>
        </div>
      </form>
      <div v-if="error" class="error" role="alert">
        <p>{{ error }}</p>
      </div>
      <div v-if="shortenedUrl">
        <p class="result">
          Custom URL:
          <a :href="shortenedUrl" target="_blank" class="link">{{
            shortenedUrl
          }}</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFirebase } from "../composables/useFirebase";
import "../style.css";
import validator from "validator";
import { getAuth } from "firebase/auth";

export default defineComponent({
  setup() {
    const { shortenUrl, checkCustomNameAvailability } = useFirebase();
    const url = ref("");
    const customName = ref("");
    const shortenedUrl = ref("");
    const error = ref("");

    const handleSubmit = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        error.value = "Please sign in to create a custom URL.";
        return;
      }
      if (!validator.isURL(url.value)) {
        error.value = "Please enter a valid URL.";
        return;
      }
      error.value = "";

      try {
        const isAvailable = await checkCustomNameAvailability(customName.value);
        if (!isAvailable) {
          error.value = "Looks like custom name is already taken.";
          return;
        }
        const shortId = await shortenUrl(url.value, user, customName.value);
        shortenedUrl.value = `${window.location.origin}/${shortId}`;
      } catch (error) {
        console.error("Failed to create you a custom URL", error);
      }
    };

    return {
      url,
      customName,
      shortenedUrl,
      handleSubmit,
      error,
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
  width: 100%;
}
.card {
  background-color: #f36601;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  padding: 20px;
  width: 100%;
  max-width: 1200px;

  h1 {
    text-align: left;
    margin-bottom: 0.3rem;
    color: #333;
  }
  .subheading {
    text-align: left;
    color: #fdfdfd;
  }
}
form {
  display: flex;
  flex-direction: column;
  margin-block-start: 2rem;

  .button {
    display: flex;
    justify-content: center;
  }
}
label {
  font-weight: bold;
  text-align: start;
  color: #333;
}
input {
  border: 1px solid #bdbbbb;
  padding: 10px;
  margin-block-end: 1.8rem;
  font-size: 1em;
  width: 100%;
  height: 40px;
}
button {
  margin-block-start: 1rem;
  margin-block-end: 2rem;
  padding: 0.5rem 1rem;
  background-color: #ff9800;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  width: 10rem;
  font-weight: 600;
}
button:hover {
  background-color: #f57c00;
}
.result {
  margin-block-end: 1.2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
}
.link {
  color: rgb(0, 0, 255);
  text-decoration: none;
  padding-inline-start: 1rem;
}
.link:hover {
  text-decoration: underline;
}
.error {
  color: rgb(179, 0, 0);
}
</style>
