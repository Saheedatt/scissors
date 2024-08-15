<template>
  <section id="features" class="features">
    <h2>Our Features</h2>
    <p>
      Scissors is here to inspire simplicity in a complex world. We believe in
      keeping things short and effective, from URLs to messages and beyond. We
      are here to revolutionize the URL-shortening experience, putting
      simplicity and efficiency at the forefront.
    </p>
    <div class="start-button">
      <button @click="" aria-label="Learn more">Learn more</button>
    </div>
    <ul class="feature-cards">
      <li
        v-for="feature in features"
        :key="feature.title"
        class="feature-card-wrapper"
      >
        <div class="feature-card">
          <img :src="feature.image" alt="" />
          <h3>{{ feature.title }}</h3>
          <p>
            {{ feature.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "../style.css";

interface Feature {
  image: string;
  title: string;
  description: string;
}

export default defineComponent({
  setup() {
    const features = ref<Feature[]>([
      {
        image: new URL("../assets/link.png", import.meta.url).href,
        title: "URL Shortening",
        description:
          "Instantly transform long URLs into concise links, perfect for sharing",
      },
      {
        image: new URL("../assets/link2.png", import.meta.url).href,
        title: "Custom URLs",
        description:
          "Brand your shortened links with your own domain name for a professional touch.",
      },
      {
        image: new URL("../assets/bar.jpg", import.meta.url).href,
        title: "QR Code Generation",
        description:
          "Generate QR codes for your shortened URLs, making mobile access seamless.",
      },
      {
        image: new URL("../assets/monitoring.png", import.meta.url).href,
        title: "Analytics",
        description:
          "Track click data for your shortened URLs and understand how users interact with them.",
      },
    ]);

    return { features };
  },
});
</script>

<style scoped>
.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;

  p {
    text-align: center;
    font-size: 1.4rem;
    margin-block: 1rem;
  }
}
.start-button {
  padding: 2.4rem 0;
}
button {
  padding: 0.8rem 1rem;
  margin-block: 0.8rem;
  background-color: inherit;
  cursor: pointer;
  border: 2px solid #f36601;

  &:hover {
    background-color: #f57c00;
  }
}

.feature-cards {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  justify-content: center;
}

.feature-card {
  margin: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  border: 2px;

  img {
    width: 100%;
    max-width: 100px;
    margin-bottom: 1rem;
    align-self: center;
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #f36601;
  }
  p {
    line-height: 1.5;
    font-size: 1rem;
    flex-grow: 1;
  }
}
.feature-card-wrapper {
  flex: 1 1 calc(33.333% - 2rem);
  display: flex;
  margin: 1rem;
}
@media (max-width: 480px) {
  .features {
    padding-block-start: 1rem;
    p {
      font-size: 1.2rem;
      padding: 1rem 2rem;
    }
  }
  .start-button {
    padding: 1.5rem 0;
  }
  button {
    margin-block: 0.1rem;
  }
  .feature-cards {
    grid-template-columns: 1fr;
  }
  .feature-card {
    img {
      width: 50px;
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .features {
    padding-block-start: 1rem;
    p {
      font-size: 1.3rem;
      padding: 1rem 2rem;
    }
  }
  .start-button {
    padding: 2rem 0;
  }
  .feature-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.feature-card-wrapper {
  display: flex;
  justify-content: center;
}

.feature-card {
  img {
    width: 75px;
  }
  h3 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
