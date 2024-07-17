import { ref } from "vue";
import validator from "validator";

export const useValidation = () => {
  const isValidUrl = ref(true);

  const validateUrl = (url: string) => {
    isValidUrl.value = validator.isURL(url);
  };

  return { isValidUrl, validateUrl };
};
