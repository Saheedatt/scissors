<template>
  <footer class="footer" aria-labelledby="footer">
    <div class="footer-container">
      <a href="/">
        <div class="logo">
          <img src="../assets/scissors.png" alt="Scissors Icon" />
          <h1 id="logo-text">Scissors</h1>
          <img src="../assets/scissors.png" alt="Scissors Icon" />
        </div>
      </a>
      <div class="social-media">
        <a href="#" aria-label="Instagram"> Instagram </a>
        <a href="https://x.com/idontseemyselff" aria-label="Twitter">
          Twitter(X)
        </a>
        <a href="https://github.com/Saheedatt" aria-label="GitHub"> Github </a>
        <a
          href="https://www.linkedin.com/in/saheedat-afolabi-1a91b5221/"
          aria-label="LinkedIn"
        >
          Linkedin
        </a>
      </div>
      <div class="copyright">
        <p>© {{ year }} Scissors. All Rights Reserved.</p>
      </div>
    </div>
    <div class="decoration">
      <img src="../assets/url.png" alt="Url icon" />
      <img src="../assets/link.png" alt="Decorative element" />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../style.css";
export default defineComponent({
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
});
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  position: relative;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  h1 {
    font-size: 1.2rem;
    font-weight: 900;
  }
}
.logo img {
  width: 60px;
}

.social-media {
  display: flex;
  padding: 0;
  margin-block-start: 1rem;
}

.social-media a {
  margin-right: 1rem;
  color: #f36601;
  font-size: 1.2rem;
  text-decoration: none;
}

.copyright {
  font-size: 0.8rem;
  margin-block-start: 1rem;
  color: #f36601;
}

.decoration {
  position: absolute;
  bottom: 0;
  right: 0;
}

.decoration img {
  position: absolute;
  width: 6rem;
  opacity: 0.2;
}

.decoration img:first-child {
  left: -12rem;
  bottom: 0;
  transform: translateY(50%);
}

.decoration img:last-child {
  right: 4rem;
  bottom: -4rem;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .footer-container {
    text-align: center;
    display: flex;
    align-items: baseline;
  }
  .logo {
    img {
      width: 30px;
    }
    h1 {
      font-size: 0.8rem;
    }
  }
  .social-media a {
    font-size: 0.8rem;
  }
  .copyright {
    font-size: 0.6rem;
  }
  .decoration {
    display: none;
  }
}

@media (max-width: 480px) {
  .decoration {
    display: none;
  }
  .footer-container {
    flex-direction: column;
    text-align: center;
  }
  .logo {
    margin-bottom: 0.5rem;
  }
  .logo img {
    width: 35px;
  }
  .logo h1 {
    font-size: 0.9rem;
  }
  .social-media a {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
  .copyright {
    font-size: 0.7rem;
  }
  .decoration {
    display: none;
  }
}
</style>
