<template>
  <nav class="navbar" role="navigation">
    <a href="#main" class="skip-navigation">Skip to main</a>
    <div class="navbar-content">
      <a href="/" class="logo">
        <img src="../assets/scissors.png" alt="Scissors Icon" />
        <h2 id="logo-text">Scissors</h2>
        <img src="../assets/scissors.png" alt="Scissors Icon" />
      </a>
      <button
        class="menu-icon"
        @click="toggleSidebar"
        aria-label="Toggle navigation"
        :aria-expanded="sidebarOpen"
        aria-controls="mobile-menu"
      >
        <img src="../assets/menu.png" alt="Menu Icon" class="menu-icon-img" />
      </button>
      <ul class="nav-links" :class="{ active: sidebarOpen }" role="menu">
        <li>
          <a href="#features" @click.prevent="scrollToSection('features')"
            >Features</a
          >
        </li>
        <li>
          <a href="#vision" @click.prevent="scrollToSection('vision')"
            >Vision</a
          >
        </li>
        <li><router-link to="/pricing">Pricing</router-link></li>
        <li><router-link to="/blog">Blog</router-link></li>
        <li><router-link to="/help">Help</router-link></li>
      </ul>
      <div class="access-button" v-if="!isMobile">
        <button @click="handleAuthAction" :aria-label="authButtonLabel">
          {{ authButtonText }}
        </button>
      </div>
    </div>
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <button
        class="close-icon"
        @click="toggleSidebar"
        aria-label="Close sidebar"
      >
        <img
          src="../assets/close.png"
          alt="Close Icon"
          class="close-icon-img"
        />
      </button>
      <ul class="sidebar-links">
        <li>
          <a href="#features" @click.prevent="scrollToSection('features')"
            >Features</a
          >
        </li>
        <li>
          <a href="#vision" @click.prevent="scrollToSection('vision')"
            >Vision</a
          >
        </li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#help">Help</a></li>
        <li v-if="isMobile">
          <button
            @click="handleAuthAction"
            :aria-label="authButtonLabel"
            class="mobile-button"
          >
            {{ authButtonText }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "vue-router";
import "../style.css";
import "../nav.css";

export default defineComponent({
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const authButtonText = ref("Register / Log In");
    const authButtonLabel = ref("Register or Login");
    const sidebarOpen = ref(false);
    const screenWidth = ref(window.innerWidth);

    const isMobile = computed(() => screenWidth.value <= 768);

    const updateAuthState = (user: any) => {
      isLoggedIn.value = !!user;
      authButtonText.value = isLoggedIn.value ? "Log Out" : "Register / Log In";
      authButtonLabel.value = isLoggedIn.value
        ? "Log Out"
        : "Register or Login";
    };

    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      onAuthStateChanged(auth, updateAuthState);
      window.addEventListener("resize", handleResize);
    });

    const signInUsingGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in:", result.user);
        router.push("/");
      } catch (error) {
        console.error("Error signing in: ", error);
      }
    };
    const logOut = async () => {
      try {
        await signOut(auth);
        console.log("User signed out");
        router.push("/landing");
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };
    const handleAuthAction = () => {
      if (isLoggedIn.value) {
        logOut();
      } else {
        signInUsingGoogle();
      }
    };

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    return {
      handleAuthAction,
      scrollToSection,
      authButtonText,
      authButtonLabel,
      sidebarOpen,
      toggleSidebar,
      isMobile,
    };
  },
});
</script>
