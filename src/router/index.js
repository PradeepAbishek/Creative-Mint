import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const isAdmin = (to, from, next) => {
  if (
    to.name === "Edit Farmer" &&
    Object.keys(store.state.editedFarmer).length === 0
  ) {
    next({ name: "Farmer" });
  } else if (
    to.name === "Edit Message Template" &&
    Object.keys(store.state.editedMessageTemplate).length === 0
  ) {
    next({ name: "Message Template" });
  } else if (store.state.adminUser || store.state.masterAdminUser) {
    next();
  } else {
    next({ name: "Send Message" });
  }
};

const isMasterAdmin = (to, from, next) => {
  if (store.state.masterAdminUser) {
    next();
  } else {
    next({ name: "Send Message" });
  }
};

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
        beforeEnter: isAdmin,
      },
      // Create Farmer
      {
        name: "Create Farmer",
        path: "/farmer/create/",
        component: () => import("@/components/CreateFarmer"),
        beforeEnter: isAdmin,
      },
      // Edit Farmer
      {
        name: "Edit Farmer",
        path: "/farmer/edit/",
        component: () => import("@/components/EditFarmer"),
        beforeEnter: isAdmin,
      },
      // Message Template
      {
        name: "Message Template",
        path: "/messageTemplate",
        component: () => import("@/components/MessageTemplate"),
        beforeEnter: isAdmin,
      },
      // Create Message Template
      {
        name: "Create Message Template",
        path: "/messageTemplate/create/",
        component: () => import("@/components/CreateMessageTemplate"),
        beforeEnter: isAdmin,
      },
      // Edit Message Template
      {
        name: "Edit Message Template",
        path: "/messageTemplate/edit/",
        component: () => import("@/components/EditMessageTemplate"),
        beforeEnter: isAdmin,
      },
      // Cluster
      {
        name: "Cluster",
        path: "/cluster",
        component: () => import("@/views/Cluster"),
        beforeEnter: isAdmin,
      },
      // Input Material
      {
        name: "Input Material",
        path: "/inputMaterial",
        component: () => import("@/views/InputMaterial"),
        beforeEnter: isAdmin,
      },
      // Activity
      {
        name: "Activity",
        path: "/activity",
        component: () => import("@/views/Activity"),
        beforeEnter: isAdmin,
      },
      // Input Material - Activity
      {
        name: "Cluster - Input Material Mapping",
        path: "/mapping",
        component: () => import("@/views/Input Material - Activity"),
        beforeEnter: isAdmin,
      },
      // User
      {
        name: "User",
        path: "/user",
        component: () => import("@/views/User"),
        beforeEnter: isMasterAdmin,
      },
      {
        name: "404",
        path: "*",
        component: () => import("@/views/PageNotFound"),
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
  if (Vue.$cookies.get("marsData")) {
    console.log(Vue.$cookies.get("marsData"));
    const accessToken = Vue.$cookies.get("marsData").access_token;
    const isAdmin = Vue.$cookies.get("marsData").isAdmin;
    const isMasterAdmin = Vue.$cookies.get("marsData").isMasterAdmin;
    if (!store.state.userLogged && accessToken !== null) {
      store.commit("UserLogged", true);
    }
    if (!store.state.adminUser && isAdmin) {
      store.commit("updateAdminUser", true);
    }
    if (!store.state.masterAdminUser && isMasterAdmin) {
      store.commit("updateMasterAdminUser", true);
    }
  } else {
    store.commit("UserLogged", false);
    store.commit("updateAdminUser", false);
    store.commit("updateMasterAdminUser", false);
  }

  if (to.name !== "Login" && !store.state.userLogged) {
    next({ name: "Login" });
  } else {
    if (to.name === "Login" && store.state.userLogged) {
      next({ name: "Send Message" });
    }
    next();
  }
});

export default router;
