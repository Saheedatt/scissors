<template>
  <main class="content">
      <Navbar />
      <div class="heading">
          <h1>Shorten Your Links. Sharpen Your Impact!</h1>
          <p class="subheading">
              Scissors: The ultimate URL shortener for the modern world
          </p>
          <div class="start-button">
              <button @click="handleGetStarted" aria-label="Get started">
                  Get started
              </button>
          </div>
      </div>
      <div class="url">
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              src="../assets/hyperlink.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
          <img
              src="../assets/left.png"
              alt="scissors icon"
              aria-hidden="true"
          />
          <img
              class="last-icon"
              src="../assets/link2.png"
              alt="hyperlink icon"
              aria-hidden="true"
          />
      </div>
      <div class="about">
          <Features />
      </div>
      <div class="about">
          <Vision />
      </div>
  </main>
  <footer class="footer" aria-labelledby="footer">
      <Footer />
  </footer>
</template>

<script lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import Features from "./Features.vue";
import Navbar from "./Navbar.vue";
import Vision from "./Vision.vue";
import Footer from "./Footer.vue";
import "../style.css";

export default defineComponent({
  components: {
      Navbar,
      Features,
      Vision,
      Footer,
  },

  setup() {
      const router = useRouter();
      const auth = getAuth();

      const handleGetStarted = () => {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  router.push({ name: "UrlShortener" });
              } else {
                  router.push({ name: "Landing" });
              }
          });
      };

      return {
          handleGetStarted,
      };
  },
});
</script>

<style scoped>
.content {
  margin-block-start: 3rem;
}
.heading {
  text-align: center;
  line-height: 1.5;
  margin-block-start: 2rem;

  h1 {
      font-size: 3rem;
  }
  .subheading {
      font-size: 1.5rem;
      margin-block-start: 1rem;
      color: #f36601;
  }
}
.url {
  padding: 0.5rem 1rem;
  margin-block-start: 2rem;
  img {
      width: 4.9rem;
  }
  .last-icon {
      width: 2.6rem;
  }
}
.start-button {
  padding: 2.4rem 0;
}
button {
  padding: 0.8rem 1rem;
  /* background-color: #f36601; */
  cursor: pointer;
  border: 2px solid #f36601;
  background-color: inherit;
  width: 10%;

  &:hover {
      background-color: #f57c00;
  }
}
.about {
  margin-block: 3rem;
}
</style>