import { createMemoryHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
const routes = [
  { path: "/", redirect: "/Login" },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;
