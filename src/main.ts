/*
 * @Author: zeHua
 * @Date: 2021-09-29 09:37:49
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-20 14:03:27
 * @FilePath: /zhjt/src/main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@jiaminghi/data-view";
import "./assets/css/reset.css";
createApp(App).use(store).use(router).use(dataV).mount("#app");
