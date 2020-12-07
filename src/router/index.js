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
      // Send Message
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
      // Create Farmer
      {
        name: "Create Farmer",
        path: "/farmer/create/",
        component: () => import("@/components/CreateFarmer"),
      },
      // Edit Farmer
      {
        name: "Edit Farmer",
        path: "/farmer/edit/",
        component: () => import("@/components/EditFarmer"),
      },
      // Message Template
      {
        name: "Message Template",
        path: "/messageTemplate",
        component: () => import("@/components/MessageTemplate"),
      },
      // Create Message Template
      {
        name: "Create Message Template",
        path: "/messageTemplate/create/",
        component: () => import("@/components/CreateMessageTemplate"),
      },
      // Edit Message Template
      {
        name: "Edit Message Template",
        path: "/messageTemplate/edit/",
        component: () => import("@/components/EditMessageTemplate"),
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
      next({ name: "Send Message" });
    if (
      to.name === "Edit Farmer" &&
      Object.keys(store.state.editedFarmer).length === 0
    )
      next({ name: "Farmer" });
    if (
      to.name === "Edit Message Template" &&
      Object.keys(store.state.editedMessageTemplate).length === 0
    )
      next({ name: "Message Template" });
    next();
  }
});

export default router;
