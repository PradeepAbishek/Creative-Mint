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
        icon: "mdi-send",
        title: "Send Message",
        to: "/sendMessage",
      },
      {
        icon: "mdi-message",
        title: "Message History",
        to: "/messageHistory",
        isAdmin: "true",
      },
      {
        icon: "mdi-face",
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
    ],
    userLogged: false,
    editedFarmer: {},
    notificationModules: [
      {
        name: "GAP Notification",
        value: 1,
      },
      {
        name: "Input Materials Notification",
        value: 2,
      },
      {
        name: "Stolon Notification",
        value: 3,
      },
      {
        name: "Price Notification",
        value: 4,
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
        code: "<SIP>",
      },
      {
        name: "Weeks from Overview",
        code: "<WFO>",
      },
      {
        name: "Selected Cluster",
        code: "<SC>",
      },
      {
        name: "Selected Price",
        code: "<SP>",
      },
    ],
    filterData: {},
    messageTemplateData: [
      {
        templateName: "Price Notification",
        message: `Best prices available at FPC!Sell Mentha oil at Rs. <SP> per kg at <SC>`,
      },
    ],
    editedMessageTemplate: {},
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
    UpdateEditMessageTemplate(state, payload) {
      state.editedMessageTemplate = payload;
    },
  },
  actions: {},
  modules: {},
});
