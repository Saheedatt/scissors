import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import Landing from "../components/Landing.vue";
import RedirectShortUrl from "../components/RedirectShortUrl.vue";
import Qr from "../components/Qr.vue";
import UrlShortener from "../components/UrlShortener.vue";
import History from "../components/History.vue";
import CustomUrl from "../components/CustomUrl.vue";
import { auth } from "../firebase";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "UrlShortener",
        component: UrlShortener,
      },
      {
        path: "/qr-code",
        name: "QrCode",
        component: Qr,
      },
      {
        path: "custom-url",
        name: "CustomUrl",
        component: CustomUrl,
      },
    ],
  },
  {
    path: "/landing",
    name: "Landing",
    component: Landing,
    meta: { requiresAuth: false },
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/:shortCode",
    name: "RedirectShortUrl",
    component: RedirectShortUrl,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser !== null;

  if (requiresAuth && !isAuthenticated) {
    next("/landing");
  } else {
    next();
  }
});

export default router;
