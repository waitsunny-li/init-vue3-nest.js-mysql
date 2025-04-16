import "@/assets/styles/index.scss";
import "@/assets/styles/tailwind.css";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import locale from "element-plus/es/locale/lang/zh-cn";

import App from "./App.vue";
import router from "./router";
import store from "./stores";

// svg图标
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon/index.vue";
import elementIcons from "@/components/SvgIcon/svgicon.ts";

const app = createApp(App);

app.component("svg-icon", SvgIcon); // 全局注册svg-icon组件
app.use(createPinia());
app.use(router);
app.use(store);
app.use(ElementPlus, { locale });
app.use(elementIcons);

app.mount("#app");
