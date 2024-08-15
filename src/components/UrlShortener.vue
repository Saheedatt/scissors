<template>
  <main class="container" role="main">
    <div class="card">
      <h1>Shorten Your URL</h1>
      <form @submit.prevent="handleSubmit">
        <label for="url" aria-describedby="url">Enter your URL:</label>
        <input v-model="url" placeholder="Enter your URL" required />
        <div class="button">
          <button type="submit" role="button">Snip!</button>
        </div>
      </form>
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-if="shortenedUrl">
        <p class="result">
          Shortened URL:
          <a
            :href="shortenedUrl"
            target="_blank"
            class="link"
            aria-label="Visit the shortened URL"
            >{{ shortenedUrl }}</a
          >
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="history">
        <router-link to="/history" class="history">History</router-link>
      </div>
      <div class="custom">
        <router-link to="/custom-url" class="custom-url"
          >Want a custom URL?</router-link
        >
      </div>
    </div>
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
    const { shortenUrl } = useFirebase();
    const url = ref("");
    const shortenedUrl = ref("");
    const error = ref("");

    const handleSubmit = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        error.value = "Please sign in to shorten a URL.";
        return;
      }
      if (!validator.isURL(url.value)) {
        error.value = "Please enter a valid URL.";
        return;
      }
      error.value = "";

      try {
        const shortId = await shortenUrl(url.value, user);
        shortenedUrl.value = `${window.location.origin}/${shortId}`;
      } catch (error) {
        console.error("Failed to shorten URL", error);
      }
    };

    return {
      url,
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
    margin-block-end: 0.5rem;
    font-size: 1.8rem;
    color: #333;
  }
}
form {
  display: flex;
  flex-direction: column;
  margin-block-start: 1rem;

  .button {
    display: flex;
    justify-content: center;
  }
}
label {
  font-weight: bold;
  text-align: start;
  color: #333;
  padding-block-end: 4px;
}
input {
  border: 1px solid #bdbbbb;
  padding: 10px;
  margin-block-end: 0.8rem;
  font-size: 1em;
  width: 100%;
  height: 40px;
}
button {
  margin-block-start: 1rem;
  margin-block-end: 1.2rem;
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
}
.link {
  color: rgb(0, 0, 255);
  text-decoration: none;
  padding-inline-start: 1rem;
}
.link:hover {
  text-decoration: underline;
}
.bottom {
  margin-block-start: 1.2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.custom,
.history {
  margin: 0 1.75rem;
}

.custom-url,
.history {
  text-decoration: none;
  color: #ff9800;
}

.custom-url:hover,
.history:hover {
  text-decoration: underline;
}
.error {
  color: rgb(179, 0, 0);
}
@media (max-width: 480px) {
  .card {
    padding: 1rem;
    box-shadow: none;

    h1 {
      font-size: 1.3rem;
    }
  }

  label {
    padding-block-end: 2px;
  }
  input {
    font-size: 0.9rem;
    padding: 8px;
    height: 35px;
  }

  button {
    width: 80%;
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .bottom {
    font-size: 0.8rem;
    gap: 1rem;
    margin-top: 1rem;
  }

  .custom,
  .history {
    margin: 0;
  }
}
@media (min-width: 481px) and (max-width: 768px) {
  .card {
    padding: 1.5rem;
    max-width: 600px;

    h1 {
      font-size: 2rem;
    }
  }

  button {
    width: 50%;
    font-size: 1rem;
  }

  .bottom {
    justify-content: space-between;
  }

  .custom,
  .history {
    margin: 0 1.2rem;
  }
}
</style>
