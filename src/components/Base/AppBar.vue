<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="font-weight-light" v-text="$route.name" />
    <v-spacer />

    <v-btn class="ml-2" color="primary" text @click="addFarmer" to="/farmer/add">
      <v-icon>mdi-plus-box</v-icon>
    </v-btn>

    <!-- <v-menu bottom left offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" class="ml-2" color="warning">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-btn @click="logout" text color="red">
        Logout
      </v-btn>
    </v-menu> -->
    <v-btn class="ml-2" color="warning" text @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
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
    addFarmer() {
      this.$store.commit("UpdateEditFarmer", {});
      this.$router.push("/farmer/add");
    },
  },
};
</script>
