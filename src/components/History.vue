<template>
  <!-- <div class="history">
    <h1>Your Shortened URLs</h1>
    <div v-if="urls.length">
      <ul>
        <li v-for="url in urls" :key="url.id" class="url-item">
          <a :href="url.originalUrl" target="_blank">{{ url.shortUrl }}</a> -
          {{ url.originalUrl }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No URLs have been shortened yet.</p>
    </div>
  </div> -->
</template>
<!-- 
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useFirebase } from "../composables/useFirebase";
import { getAuth } from "firebase/auth";

export default defineComponent({
    name: "History",
    setup(){
        const urls = ref([]);
        const { retrieveUserUrls } = useFirebase();
    const auth = getAuth();

    onMounted(async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userUrls = await retrieveUserUrls(user);
          urls.value = userUrls;
        } catch (error) {
          console.error("Error retrieving user URLs:", error);
        }
      }
    });

    return { urls };
  },
});
</script>


<style scoped>
.history {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.url-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.url-item a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.url-item a:hover {
  text-decoration: underline;
}
</style> -->