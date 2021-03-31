<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="inputMaterial._id"
      routeName="inputMaterials"
      module="Input Material"
      v-if="deleteDialog"
      v-on:refreshData="refreshInputMaterial"
    ></delete-confirmation>
    <transition name="fade">
      <v-card v-if="showCard" class="transition">
        <div class="w-100 flex justify-center items-baseline">
          <v-form ref="form" @submit.prevent="">
            <span class="mr-2">
              <v-text-field
                v-model="inputMaterial.inputMaterialName"
                color="success"
                label="Input Material Name"
                :rules="mandatoryRule"
              >
              </v-text-field>
            </span>
          </v-form>
          <span class="ml-2" v-if="create">
            <v-btn color="success" text dark @click="createInputMaterial">
              <v-icon class="mr-2">mdi-plus-box</v-icon>
              Create Input Material
            </v-btn>
          </span>
          <div v-else>
            <span class="ml-2">
              <v-btn color="success" text dark @click="updateInputMaterial">
                <v-icon class="mr-2">mdi-update</v-icon>
                Update Input Material
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
              Input Material
            </v-btn>
          </div>
        </div>
        <v-data-table
          :headers="inputMaterialHeaders"
          :items="inputMaterialData"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editInputMaterial(item)"
              color="success"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteInputMaterial(item)"
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
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    showCard: false,
    create: true,
    inputMaterial: {},
    search: "",
    inputMaterialHeaders: [
      {
        text: "Input Material Id",
        value: "_id",
        sortable: false,
        align: "start",
      },
      {
        text: "Input Material Name",
        value: "inputMaterialName",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    inputMaterialData: [],
  }),
  methods: {
    showCreate() {
      this.inputMaterial.inputMaterialName = "";
      this.showCard = true;
      this.create = true;
    },
    hideCard() {
      this.showCard = false;
    },
    editInputMaterial(inputMaterial) {
      this.inputMaterial = Object.assign({}, inputMaterial);
      this.showCard = true;
      this.create = false;
    },
    createInputMaterial() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .post("/inputMaterials/", this.inputMaterial)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Input Material Created Successfully"
            );
            this.refreshInputMaterial();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    updateInputMaterial() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .put("/inputMaterials/" + this.inputMaterial._id, this.inputMaterial)
          .then((res) => {
            this.hideCard();
            this.$store.commit(
              "successSnackbar",
              "Input Material Updated Successfully"
            );
            this.refreshInputMaterial();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    deleteInputMaterial(inputMaterial) {
      this.inputMaterial = Object.assign({}, inputMaterial);
      this.$store.commit("updateDeleteDialog", true);
    },
    refreshInputMaterial() {
      this.$axios
        .get("/inputMaterials/")
        .then((res) => {
          this.inputMaterialData = res.data;
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
    this.refreshInputMaterial();
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
