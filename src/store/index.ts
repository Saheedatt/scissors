import { defineStore } from "pinia";
import { ref } from "vue";

export const urlStorage = defineStore("urlStore", () => {
  const givenUrl = ref("");
  const shortenedUrl = ref("");

  const setGivenUrl = (url: string) => {
    givenUrl.value = url;
  };

  const setShortenedUrl = (url: string) => {
    shortenedUrl.value = url;
  };

  return { givenUrl, shortenedUrl, setGivenUrl, setShortenedUrl };
});
