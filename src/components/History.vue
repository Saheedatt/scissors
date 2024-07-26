<template>
  <div class="container">
    <h2>Your Previously Shortened URLs</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul class="history-list">
        <li v-for="url in urls" :key="url.id" class="url-item">
          <a :href="`${baseUrl}/${url.shortUrl}`" target="_blank">
            {{ baseUrl }}/{{ url.shortUrl }}
          </a>
          <p><small>{{ url.originalUrl }}</small> -- {{ url.clickCount ?? 0 }} clicks</p>

          <p class="created">
            Created at:
            {{ new Date(url.createdAt.seconds * 1000).toLocaleString() }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useFirebase } from "../composables/useFirebase";

interface ShortenedUrl {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: { seconds: number; nanoseconds: number };
  clickCount: number;
}

export default defineComponent({
  setup() {
    const urls = ref<ShortenedUrl[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const auth = getAuth();

    const baseUrl = window.location.origin;

    const { retrieveUserUrls } = useFirebase();

    const fetchUrls = async (user: User) => {
      try {
        const fetchedUrls = await retrieveUserUrls(user);
        if (fetchedUrls.length === 0) {
          error.value = "No URLs found.";
        } else {
          urls.value = fetchedUrls as ShortenedUrl[];
        }
      } catch (err) {
        console.error("Error fetching URLs:", err);
        error.value = "Failed to fetch URLs.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchUrls(user);
        } else {
          loading.value = false;
          error.value = "User not logged in.";
        }
      });
    });

    return {
      urls,
      loading,
      error,
      baseUrl,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 62rem;
  margin: 3rem auto;
  border: 1px solid #ccc;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* background-color: #fff; */
}
h2 {
  text-align: center;
  border-bottom: 2px solid #000;
  margin-block: 1.5rem;
}
.error {
  color: rgb(236, 9, 9);
}
.history-list {
  padding-inline: 10px;
}

.url-item {
  border-bottom: 1px solid #acacac;
  padding-block: 10px 0;
  padding-inline: 1rem;
}
.url-item:last-child {
  border-bottom: none;
  padding-block-end: 1rem;
}

.url-item a {
  color: #f36601;
  font-weight: bold;
  text-decoration: none;
}

.url-item a:hover {
  text-decoration: underline;
  color: #f57c00;
}
.created{
  font-weight: 700;
  color: #4d4c4c;
}
</style>
