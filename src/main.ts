import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/css/reset.css";
import "@/scss/style.scss";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
