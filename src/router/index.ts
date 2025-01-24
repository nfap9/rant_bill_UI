import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: "/manager" },
  {
    path: "/manager",
    name: "Manager",
    component: () => import("../views/manager/index.vue"),
    children: [
      {
        path: "/house-manager",
        name: "HouseMamnager",
        component: () => import("../views/manager/houseManager/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.token ? true : false;
  console.log(isAuthenticated);
  if (isAuthenticated) {
    next();
  } else {
    next({ name: "Login" });
  }
});
export default router;
