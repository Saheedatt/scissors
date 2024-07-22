<template>
  <div>Redirecting...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

export default defineComponent({
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const { getOriginalUrl } = useFirebase();

    const shortCode = route.params.shortCode as string;
    try {
      const originalUrl = await getOriginalUrl(shortCode);
      if (originalUrl) {
        window.location.href = originalUrl;
      } else {
        console.error("Short URL not found");
        router.push("/landing");
      }
    } catch (error) {
      console.error("Error redirecting:", error);
      router.push("/landing");
    }
    return {};
  },
});
</script>
