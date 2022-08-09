import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      // component: Home
      component: () => import("./views/Home")
    },
    {
      path: "/modals-page",
      name: "ModalsPage",
      // component: Home
      component: () => import("./views/ModalsPage")
    },
    {
      path: "/pagination-page",
      name: "PaginationPage",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/PaginationPage")
    }
  ]
});

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
