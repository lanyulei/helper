import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "./router";
import "./styles/index.scss";

const app = createApp(App);

app.
use(router).
use(ElementPlus).
mount("#app");
