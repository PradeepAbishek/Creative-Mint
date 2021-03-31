<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="clusterId"
      routeName="clusters"
      module="Cluster"
      v-if="deleteDialog"
      v-on:refreshData="refreshCluster"
    ></delete-confirmation>
    <transition name="fade">
      <v-card v-if="showCard" class="transition">
        <div class="w-100 flex justify-center items-baseline">
          <v-form ref="form" @submit.prevent="">
            <span class="mr-2">
              <v-text-field
                v-model="cluster.clusterName"
                color="success"
                label="Cluster Name"
                :rules="mandatoryRule"
              >
              </v-text-field>
            </span>
          </v-form>
          <span class="ml-2" v-if="create">
            <v-btn color="success" text dark @click="createCluster">
              <v-icon class="mr-2">mdi-plus-box</v-icon>
              Create Cluster
            </v-btn>
          </span>
          <div v-else>
            <span class="ml-2">
              <v-btn color="success" text dark @click="updateCluster">
                <v-icon class="mr-2">mdi-update</v-icon>
                Update Cluster
              </v-btn>
            </span>
          </div>
          <span class="ml-2">
            <v-btn color="error" text dark @click="hideCard">
              <v-icon class="mr-2">mdi-chevron-left</v-icon>
              Back
            </v-btn>
          </span>
        </div>
      </v-card>
    </transition>
    <v-card>
      <v-card-text>
        <div class="flex items-center justify-between">
          <div class="w-80">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              color="success"
              label="Search"
              clearable
            ></v-text-field>
          </div>
          <div v-if="showCard == false">
            <v-btn color="success" text dark @click="showCreate">
              <v-icon class="mr-2">mdi-new-box</v-icon>
              Cluster
            </v-btn>
          </div>
        </div>
        <v-data-table
          :headers="clusterHeader"
          :items="clusterData"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editCluster(item)"
              color="success"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteCluster(item)"
              color="error"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
export default {
  name: "Cluster",
  components: {
    DeleteConfirmation: () => import("@/components/DeleteConfirmation"),
  },
  data: () => ({
    clusterId: "",
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    showCard: false,
    create: true,
    cluster: {},
    search: "",
    clusterHeader: [
      {
        text: "Cluster Id",
        value: "_id",
        sortable: false,
        align: "start",
      },
      {
        text: "Cluster Name",
        value: "clusterName",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    clusterData: [],
  }),
  methods: {
    showCreate() {
      this.cluster.clusterName = "";
      this.showCard = true;
      this.create = true;
    },
    hideCard() {
      this.showCard = false;
      this.cluster = {};
    },
    editCluster(cluster) {
      this.cluster = Object.assign({}, cluster);
      this.showCard = true;
      this.create = false;
    },
    createCluster() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .post("/clusters/", this.cluster)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Cluster Created Successfully"
            );
            this.refreshCluster();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    updateCluster() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .put("/clusters/" + this.cluster._id, this.cluster)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Cluster Updated Successfully"
            );
            this.refreshCluster();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    deleteCluster(item) {
      this.clusterId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
    refreshCluster() {
      this.$axios
        .get("/clusters/")
        .then((res) => {
          this.clusterData = res.data;
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
  mounted() {
    this.refreshCluster();
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
