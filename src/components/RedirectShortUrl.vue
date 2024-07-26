<template>
  <div>Redirecting...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";
import { getAnalytics, logEvent } from "firebase/analytics";

export default defineComponent({
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const analytics = getAnalytics();
    const { getOriginalUrl, incrementClickCount } = useFirebase();

    const shortCode = route.params.shortCode as string;
    try {
      const originalUrl = await getOriginalUrl(shortCode);
      if (originalUrl) {
        await incrementClickCount(shortCode);

        logEvent(analytics, 'short_url_click', {
          short_code: shortCode,
          original_url: originalUrl,
        });

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
