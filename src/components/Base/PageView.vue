<template>
  <v-main>
    <v-snackbar
      outlined
      shaped
      transition="fab-transition"
      :value="snackbar"
      :color="snackbarColor"
      top
      right
      :timeout="snackbarTimeout"
      elevation="12"
    >
      <div class="tc f6 b i">{{ snackbarText }}</div>
    </v-snackbar>
    <router-view />
  </v-main>
</template>

<script>
export default {
  name: "PageView",
  data: () => ({}),
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
    snackbarColor() {
      return this.$store.state.snackbarColor;
    },
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    snackbarTimeout() {
      return this.$store.state.snackbarTimeout;
    },
  },
};
</script>
