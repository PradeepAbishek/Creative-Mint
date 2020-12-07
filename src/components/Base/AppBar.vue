<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-light" v-text="$route.name" />
    <v-spacer />
    <v-tooltip bottom v-if="isAdmin == 'true'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          color="primary"
          text
          @click="createFarmer"
          to="/farmer/create"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
      </template>
      <span>Create Farmer</span>
    </v-tooltip>

    <v-tooltip bottom v-if="isAdmin == 'true'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          color="pink darken-1"
          text
          to="/messageTemplate/create"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-clipboard-plus</v-icon>
        </v-btn>
      </template>
      <span>Create Message Template</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          color="warning"
          text
          @click="logout"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DashboardCoreAppBar",
  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one",
    ],
  }),
  computed: {
    ...mapState(["drawer"]),
    isAdmin() {
      return localStorage.getItem("isAdmin");
    },
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.$store.commit("UserLogged", false);
    },
    createFarmer() {
      this.$store.commit("UpdateEditFarmer", {});
      this.$router.push("/farmer/create");
    },
  },
};
</script>
