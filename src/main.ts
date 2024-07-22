import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routing";
import App from "./App.vue";
import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";

const app = createApp(App);
app.use(createPinia());
app.use(router);

initializeApp(firebaseConfig);

app.mount("#app");
