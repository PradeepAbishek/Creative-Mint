<template>
  <v-app>
    <dashboard-core-app-bar v-if="userLogged" />
    <dashboard-core-drawer v-if="userLogged" />
    <dashboard-core-view />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",
  components: {
    DashboardCoreAppBar: () => import("@/components/Base/AppBar"),
    DashboardCoreDrawer: () => import("@/components/Base/Drawer"),
    DashboardCoreView: () => import("@/components/Base/PageView"),
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    userLogged() {
      return this.$store.state.userLogged;
    },
  },
};
</script>
