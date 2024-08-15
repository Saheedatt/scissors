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
import { validateUrl } from "../utils/validateUrl";
import "../style.css";
// import validator from "validator";
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
      if (!validateUrl(url.value)) {
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
  padding: 1.2rem;
  width: 100%;
  max-width: 1200px;

  h1 {
    text-align: left;
    margin-bottom: 0.3rem;
    color: #333;
    font-size: 1.5rem;
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
  padding-block-end: 2px;
  text-align: start;
  color: #333;
}
input {
  border: 1px solid #bdbbbb;
  padding: 10px;
  margin-block-end: 1.8rem;
  font-size: 1rem;
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

@media (max-width: 480px) {
  .card {
    padding: 1rem;
    box-shadow: none;

    h1 {
      font-size: 1.3rem;
    }
    .subheading {
      font-size: 0.92rem;
    }
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
}

@media (min-width: 481px) and (max-width: 768px) {
  .card {
    padding: 1.5rem;
    max-width: 600px;

    h1 {
      font-size: 2rem;
    }
    .subheading {
      font-size: 1.1rem;
    }
  }
  button {
    width: 50%;
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card {
    padding: 2rem;
    max-width: 800px;

    h1 {
      font-size: 2.2rem;
    }
    .subheading {
      font-size: 1.2rem;
    }
  }

  input {
    font-size: 1.1rem;
    padding: 12px;
    height: 45px;
  }

  button {
    width: 40%;
    font-size: 1.1rem;
  }
}
</style>
