<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="activity._id"
      routeName="activities"
      module="Activity"
      v-if="deleteDialog"
      v-on:refreshData="refreshActivity"
    ></delete-confirmation>
    <transition name="fade">
      <v-card v-if="showCard" class="transition">
        <div class="w-100 flex justify-center items-baseline">
          <v-form ref="form" @submit.prevent="">
            <span class="mr-2">
              <v-text-field
                v-model="activity.activityName"
                color="success"
                label="Activity Name"
                :rules="mandatoryRule"
              >
              </v-text-field>
            </span>
          </v-form>
          <span class="ml-2" v-if="create">
            <v-btn color="success" text dark @click="createActivity">
              <v-icon class="mr-2">mdi-plus-box</v-icon>
              Create Activity
            </v-btn>
          </span>
          <div v-else>
            <span class="ml-2">
              <v-btn color="success" text dark @click="updateActivity">
                <v-icon class="mr-2">mdi-update</v-icon>
                Update Activity
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
              Activity
            </v-btn>
          </div>
        </div>
        <v-data-table
          :headers="activityHeaders"
          :items="activityData"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editActivity(item)"
              color="success"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteActivity(item)"
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
export default {
  name: "Cluster",
  components: {
    DeleteConfirmation: () => import("@/components/DeleteConfirmation"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    showCard: false,
    create: true,
    activity: {},
    search: "",
    activityHeaders: [
      {
        text: "Activity Id",
        value: "_id",
        sortable: false,
        align: "start",
      },
      {
        text: "Activity Name",
        value: "activityName",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    activityData: [],
  }),
  methods: {
    showCreate() {
      this.activity.activityName = "";
      this.showCard = true;
      this.create = true;
    },
    hideCard() {
      this.showCard = false;
    },
    editActivity(activity) {
      this.activity = Object.assign({}, activity);
      this.showCard = true;
      this.create = false;
    },
    createActivity() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .post("/activities/", this.activity)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Activity Created Successfully"
            );
            this.refreshActivity();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    updateActivity() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .put("/activities/" + this.activity._id, this.activity)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Activity Updated Successfully"
            );
            this.refreshActivity();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    deleteActivity(activity) {
      this.activity = Object.assign({}, activity);
      this.$store.commit("updateDeleteDialog", true);
    },
    refreshActivity() {
      this.$axios
        .get("/activities/")
        .then((res) => {
          this.activityData = res.data;
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
    this.refreshActivity();
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
