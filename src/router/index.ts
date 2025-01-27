import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: "/manager" },
  {
    path: "/manager",
    name: "Manager",
    redirect: "/overview",
    component: () => import("../views/manager/index.vue"),
    children: [
      {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/manager/overview/index.vue"),
      },
      {
        path: "/room-manager",
        name: "RoomManager",
        component: () => import("../views/manager/roomManager/index.vue"),
      },
      {
        path: "/tenant-manager",
        name: "TenantManager",
        component: () => import("../views/manager/tenantManager/index.vue"),
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
  if (to.path === "/login") return next();
  //获取token
  const tokenStr = window.localStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
