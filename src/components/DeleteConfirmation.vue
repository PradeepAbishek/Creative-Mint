<template>
  <v-dialog v-model="deleteDialog" width="350" persistent>
    <v-card class="ma0">
      <v-card-title>
        Are you sure want to delete ?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="updateDeleteDialog">Cancel</v-btn>
        <v-btn text color="error" @click="confirmDelete">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axiso from "axios";
export default {
  name: "DeleteConfirmation",
  props: {
    id: {
      type: String,
      default: "",
    },
    module: {
      type: String,
      default: "",
    },
    routeName: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  methods: {
    updateDeleteDialog() {
      this.$store.commit("updateDeleteDialog", false);
    },
    confirmDelete() {
      this.$axios
        .delete(this.routeName + "/" + this.id)
        .then((res) => {
          this.updateDeleteDialog();
          this.$store.commit(
            "successSnackbar",
            this.module + " Deleted Successfully"
          );
          this.$emit("refreshData");
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  computed: {
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
};
</script>
