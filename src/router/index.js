import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Index"),
    children: [
      // Login
      {
        name: "Login",
        path: "",
        component: () => import("@/components/Login"),
      },
      // Schedules
      {
        name: "Schedules",
        path: "/schedules",
        component: () => import("@/components/Schedules"),
      },
      // Edit Schedules
      {
        name: "Edit Schedule",
        path: "/schedules/edit",
        component: () => import("@/components/Edit/Schedules"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && localStorage.getItem("userLogged") !== "true")
    next({ name: "Login" });
  else {
    if (localStorage.getItem("userLogged") === "true") {
      store.commit("UserLogged", true);
    }
    if (to.name === "Login" && localStorage.getItem("userLogged") === "true")
      next({ name: "Schedules" });
    if (
      to.name === "Edit Schedule" &&
      Object.keys(store.state.editedSchedule).length === 0
    )
      next({ name: "Schedules" });
    next();
  }
});

export default router;
