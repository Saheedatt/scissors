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
          <p>
            <small>{{ url.originalUrl }}</small> --
            {{ url.clickCount ?? 0 }} clicks
          </p>

          <p class="created">
            Created at:
            {{ new Date(url.createdAt.seconds * 1000).toLocaleString() }}
          </p>
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>

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

    const itemsPerPage = 12;
    const currentPage = ref(1);

    const { retrieveUserUrls } = useFirebase();

    const fetchUrls = async (user: User) => {
      try {
        const fetchedUrls = await retrieveUserUrls(user);
        if (fetchedUrls.length === 0) {
          error.value = "No URLs found.";
        } else {
          const start = (currentPage.value - 1) * itemsPerPage;
          const paginatedUrls = fetchedUrls.slice(start, start + itemsPerPage);
          urls.value = paginatedUrls as ShortenedUrl[];
        }
      } catch (err) {
        console.error("Error fetching URLs:", err);
        error.value = "Failed to fetch URLs.";
      } finally {
        loading.value = false;
      }
    };
    const nextPage = () => {
      currentPage.value += 1;
      fetchUrls(getAuth().currentUser!);
    };
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
        fetchUrls(getAuth().currentUser!);
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
      currentPage,
      nextPage, 
      prevPage,
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
.created {
  font-weight: 700;
  color: #4d4c4c;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.pagination button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: #ff9800;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.pagination span {
  align-self: center;
  margin: 0 0.5rem;
}
</style>
