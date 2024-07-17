<template>
    <section class="vision" id="vision" aria-labelledby="vision">
      <div class="container">
        <img :src="visionIcon" alt="Binoculars Icon representing our vision" aria-hidden="true" class="vision-icon" />
        <div class="content">
          <h2>Our Vision</h2>
          <p class="vision-statement">
            {{ visionStatement }}
          </p>
          <ul class="core-values" aria-labelledby="core-values">
            <li>
              <span class="core">Simplicity</span>
              <span class="value">We believe in making URL shortening effortless.</span>
            </li>
            <li>
              <span class="core">Efficiency</span>
              <span class="value">Shortened links should save you time and resources.</span>
            </li>
            <li>
              <span class="core">Innovation</span>
              <span class="value">We're constantly striving to improve the URL shortening experience.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import visionIconDefault from '../assets/binoculars.png';
  import '../style.css';
  
  export default defineComponent({
    props: {
      visionIcon: {
        type: String,
        default: visionIconDefault,
      },
      visionStatement: {
        type: String,
        default: "Scissor aims to disrupt the URL-shortening industry, offering a seamless user experience with powerful features designed for individuals and businesses alike. Join us on our journey to make sharing easier and more effective. We aim to achieve this through:",
      },
    },
  });
  </script>
  
  <style scoped>
  .vision {
    padding: 2rem 0;
    background-color: #f36601;
    text-align: center;
    background-image: linear-gradient(to bottom, #f36601, #f57c00);
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .vision-icon {
    width: 10rem;
    margin-bottom: 1rem;
  }
  
  .content {
    text-align: left;
    padding: 1rem;
  }
  
  .content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .vision-statement {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  
  .core-values {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .core-values li {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .value {
    font-weight: normal;
  }
  
  .core {
    font-weight: 900;
    text-transform: uppercase;
    color: #fefdf8;
  }
  </style>
  