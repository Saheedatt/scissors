<template>
  <section class="container">
    <h1>Generate a QR Code for your links</h1>
    <div class="content">
      <form @submit.prevent="generateQRCode" class="form">
        <label for="qr-text">Enter Text for QR Code</label>
        <input
          id="qr-text"
          type="text"
          v-model="qrText"
          placeholder="Enter text or URL"
        />
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
        <button type="submit" role="button">Generate</button>
      </form>

      <div v-if="qrCodeDataUrl" class="result-container">
        <p class="result">
          <img :src="qrCodeDataUrl" alt="QR Code" />
        </p>
        <button @click="downloadQRCode">Download here!</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import QRCode from "qrcode";

export default defineComponent({
  setup() {
    const qrText = ref("");
    const qrCodeDataUrl = ref("");
    const error = ref("");

    const generateQRCode = async () => {
      if (!qrText.value) {
        error.value = "Please enter text or url to generate a QR code.";
        return;
      }

      error.value = "";
      qrCodeDataUrl.value = "";

      try {
        qrCodeDataUrl.value = await QRCode.toDataURL(qrText.value);
      } catch (err) {
        error.value = "Failed to generate QR code.";
        console.error("QR Code generation error:", err);
      }
    };

    const downloadQRCode = () => {
      // if (!qrCodeDataUrl.value) {
      //   error.value = "No QR code available to download.";
      //   return;
      // }
      const link = document.createElement("a");
      link.href = qrCodeDataUrl.value;
      link.download = "qrcode.png";
      link.click();
    };

    return {
      qrText,
      qrCodeDataUrl,
      generateQRCode,
      downloadQRCode,
      error,
    };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
h1 {
  margin-bottom: 0.3rem;
  /* text-align:left; */
  color: #333;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin-block-start: 2rem;
}
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}
label {
  font-weight: bold;
  text-align: start;
  color: #333;
}
input {
  border: 1px solid #bdbbbb;
  padding: 10px;
  margin-block-end: 0.5rem;
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
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  width: 10rem;
  font-weight: 600;
  /* align-self: flex-start; */
}
button:hover {
  background-color: #f57c00;
}
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;

  button{
    margin-block-start: 0;
    margin-block-end: 0.1rem;
  }
}
.result {
  margin-block-end: 0.2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
}
.error {
  color: rgb(179, 0, 0);
}
</style>
