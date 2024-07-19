import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routing";
import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";

const app = createApp(App);
app.use(createPinia());
app.use(router);

initializeApp(firebaseConfig);

//const auth = getAuth(firebaseApp);

app.mount("#app");
