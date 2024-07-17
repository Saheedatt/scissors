<template>
  <nav class="navbar" role="navigation">
    <!-- <div class="logo">Scissors</div> -->
    <a href="/">
    <div class="logo">
      <img src="../assets/scissors.png" alt="Scissors Icon" />
      <h1>Scissors</h1>
      <img src="../assets/scissors.png" alt="Scissors Icon" />
    </div>
  </a>
    <ul class="nav-links">
      <li><a href="#features" @click.prevent="scrollToSection('features')">Features</a></li>
      <li><a href="#vision" @click.prevent="scrollToSection('vision')">Vision</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#blog">Blog</a></li>
      <li><a href="#help">Help</a></li>
    </ul>
    <div class="access-button">
      <button @click="signInUsingGoogle" aria-label="Register or Login">
        Register / Log In
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
import "../style.css";
//import {auth} from '../firebase';

export default defineComponent({
  setup() {
    const router = useRouter();

    const signInUsingGoogle = async () => {
      const authenticate = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(authenticate, provider);
        console.log("User signed in:", result.user);

        router.push("/");
      } catch (error) {
        console.error("Error signing in: ", error);
      }
    };
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return { signInUsingGoogle, scrollToSection };
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.2rem;
    font-weight: 900;
  }
}
.logo img {
  width: 60px;
}
.nav-links {
  display: flex;
  gap: 2rem;

  li {
    display: inline;
    &:hover {
      text-decoration: underline;
    }
  }
}
.access-button button {
  padding: 0.8rem 1rem;
  /* background-color:#f36601; */
  background-color: #fff;
  cursor: pointer;
  border: 2px solid #f36601;;
  &:hover {
    background-color: #f57c00;
  }
}
</style>
