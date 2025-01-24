import { createMemoryHistory, createRouter } from "vue-router";

import Login from "../views/Login.vue";
import register from "../views/Register.vue";
import Manager from "../views/manager/index.vue";
import HouseManager from "../views/manager/houseManager/index.vue";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/manager",
    name: "Manager",
    component: Manager,
    children: [
      { path: "/house-manager", name: "HouseManager", component: HouseManager },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: register },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.token ? true : false;
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
