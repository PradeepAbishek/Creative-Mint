import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    snackbarTimeout: "5000",
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-4.jpg",
    drawer: null,
    drawerItems: [
      {
        icon: "mdi-send",
        title: "Send Message",
        to: "/sendMessage",
        isAdmin: "false",
      },
      {
        icon: "mdi-message",
        title: "Message History",
        to: "/messageHistory",
        isAdmin: "false",
      },
      {
        icon: "mdi-human-male",
        title: "Farmer",
        to: "/farmer",
        isAdmin: "true",
      },
      {
        icon: "mdi-clipboard-text",
        title: "Message Template",
        to: "/messageTemplate",
        isAdmin: "true",
      },
      {
        icon: "mdi-account-multiple",
        title: "User",
        to: "/user",
        isMasterAdmin: "true",
      },
      // {
      //   icon: "mdi-clipboard-text",
      //   title: "Activity",
      //   to: "/activity",
      //   isAdmin: "true",
      // },
      {
        icon: "mdi-hexagon-multiple",
        title: "Cluster",
        to: "/cluster",
        isAdmin: "true",
      },
      {
        icon: "mdi-barley",
        title: "Input Material",
        to: "/inputMaterial",
        isAdmin: "true",
      },
      {
        icon: "mdi-link-variant",
        title: "Cluster - Input Material",
        to: "/mapping",
        isAdmin: "true",
      },
    ],
    userLogged: false,
    editedFarmer: {},
    notificationModules: [
      {
        name: "GAP Notification",
        value: "1",
      },
      {
        name: "Input Materials Notification",
        value: "2",
      },
      {
        name: "Stolon Notification",
        value: "3",
      },
      {
        name: "Price Notification",
        value: "4",
      },
    ],
    yields: ["High", "Medium", "Low"],
    loyalty: ["Loyal", "Not Loyal"],
    yesNoOptions: ["Yes", "No"],
    months: [
      {
        name: "January",
        value: 1,
      },
      {
        name: "February",
        value: 2,
      },
      {
        name: "March",
        value: 3,
      },
      {
        name: "April",
        value: 4,
      },
      {
        name: "May",
        value: 5,
      },
      {
        name: "June",
        value: 6,
      },
      {
        name: "July",
        value: 7,
      },
      {
        name: "August",
        value: 8,
      },
      {
        name: "September",
        value: 9,
      },
      {
        name: "October",
        value: 10,
      },
      {
        name: "November",
        value: 11,
      },
      {
        name: "December",
        value: 12,
      },
    ],
    scheduleReminderOptions: [
      "DAP Application",
      "Sowing",
      "Treatment of Sucker",
      "Prepartion of Nursery Bed",
    ],
    shareHolderOptions: ["All"],
    messageTemplateSyntax: [
      {
        name: "Selected Input Material",
        code: "SIM",
      },
      {
        name: "Weeks from Overview",
        code: "WFO",
      },
      {
        name: "Selected Cluster",
        code: "SC",
      },
      {
        name: "Selected Price",
        code: "SIP",
      },
    ],
    filterData: {},
    editedMessageTemplate: {},
    deleteDialog: false,
    adminUser: false,
    masterAdminUser: false,
    distanceOptions: ["All", 1, 2, 7, 10],
    filteredFarmerData: [],
    mediaData: {},
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
    UpdateEditFarmer(state, payload) {
      state.editedFarmer = payload;
    },
    UpdateFilterData(state, payload) {
      state.filterData = payload;
    },
    addFilterData(state, payload) {
      state.filterData = { ...state.filterData, ...payload };
    },
    UpdateEditMessageTemplate(state, payload) {
      state.editedMessageTemplate = payload;
    },
    successSnackbar(state, payload) {
      state.snackbarColor = "green";
      state.snackbarText = payload;
      state.snackbar = true;
      setTimeout(() => {
        state.snackbar = false;
      }, state.snackbarTimeout);
    },
    errorSnackbar(state, payload) {
      state.snackbarColor = "red";
      state.snackbarText = payload;
      state.snackbar = true;
      setTimeout(() => {
        state.snackbar = false;
      }, state.snackbarTimeout);
    },
    updateDeleteDialog(state, payload) {
      state.deleteDialog = payload;
    },
    updateAdminUser(state, payload) {
      state.adminUser = payload;
    },
    updateMasterAdminUser(state, payload) {
      state.masterAdminUser = payload;
    },
    resetFilterData(state, payload) {
      state.filterData = payload;
    },
    setFilteredFarmerData(state, payload) {
      state.filteredFarmerData = payload;
    },
    uploadMediaData(state, payload) {
      state.mediaData = payload;
    },
    resetMediaData(state, payload) {
      state.mediaData = payload;
    },
  },
  actions: {
    login({ commit }, formData) {
      axios
        .post("/token/", formData)
        .then((res) => {
          Vue.prototype.$cookies.set("marsData", res.data, 60 * 60 * 1, {
            httpOnly: true,
          });
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          router.push("/sendMessage");
          commit("successSnackbar", "Logged in Successfully");
        })
        .catch((err) => {
          commit("errorSnackbar", err.response.data.detail);
        });
    },
    logout({ commit }) {
      Vue.prototype.$cookies.remove("marsData");
      delete axios.defaults.headers.common["Authorization"];
      commit("UserLogged", false);
      router.push("/");
    },
  },
  modules: {},
});
