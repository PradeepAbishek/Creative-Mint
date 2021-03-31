import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import style from "./style.css";
import css from "tachyons";
import axios from "axios";
import VueCookies from "vue-cookies";
import DatetimePicker from "vuetify-datetime-picker";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueCookies);
Vue.use(DatetimePicker);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/"
    : "http://3.6.41.241:8080/";
console.log(process.env);
if (Vue.$cookies.get("marsData")) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + Vue.$cookies.get("marsData").access_token,
  };
}

new Vue({
  router,
  store,
  vuetify,
  style,
  css,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
