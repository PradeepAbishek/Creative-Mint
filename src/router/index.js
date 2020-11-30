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
      // Message History
      {
        name: "Send Message",
        path: "/sendMessage",
        component: () => import("@/components/SendMessage"),
      },
      // Message History
      {
        name: "Message History",
        path: "/messageHistory",
        component: () => import("@/components/MessageHistory"),
      },
      // Farmer
      {
        name: "Farmer",
        path: "/farmer",
        component: () => import("@/components/Farmer"),
      },
      // Edit Farmer
      {
        name: "Edit Farmer",
        path: "/farmer/edit/",
        component: () => import("@/components/EditFarmer"),
      },
      // Edit Farmer
      {
        name: "Create Farmer",
        path: "/farmer/add/",
        component: () => import("@/components/CreateFarmer"),
      },
      // Message Template
      {
        name: "Message Template",
        path: "/messageTemplate",
        component: () => import("@/components/MessageTemplate"),
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
      next({ name: "Message History" });
    if (
      to.name === "Edit Farmer" &&
      Object.keys(store.state.editedFarmer).length === 0
    )
      next({ name: "Farmer" });
    next();
  }
});

export default router;
