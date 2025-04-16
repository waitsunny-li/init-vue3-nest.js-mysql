import { createRouter, createWebHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
/* Layout */
import Layout from "@/layout/index.vue";
import { permissionRouter } from "@/utils/auth";

Nprogress.configure({ showSpinner: false });

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "登录", icon: "dashboard", affix: true },
  },
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/Index.vue"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/document",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "/document/document-list",
        component: () => import("@/views/document/DocumentList.vue"),
        meta: { title: "文档列表", icon: "documentList", affix: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  permissionRouter(to, from, next);
  Nprogress.done();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
