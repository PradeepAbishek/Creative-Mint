import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-4.jpg",
    drawer: null,
    drawerItems: [
      {
        icon: "mdi-view-dashboard",
        title: "Schedules",
        to: "/schedules",
      },
      {
        icon: "mdi-account",
        title: "Farmers",
      },
      {
        icon: "mdi-clipboard-outline",
        title: "Message Templates",
      },
    ],
    userLogged: false,
    editedSchedule: {},
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    UserLogged(state, payload) {
      state.userLogged = payload;
    },
    UpdateEditSchedule(state, payload) {
      state.editedSchedule = payload;
    },
  },
  actions: {},
  modules: {},
});
