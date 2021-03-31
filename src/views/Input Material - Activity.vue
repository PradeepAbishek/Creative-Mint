<template>
  <v-container fluid tag="section">
    <material-card
      :title="$route.name"
      icon="mdi-link-variant"
      class="px-5 py-3"
    >
      <v-form ref="form">
        <v-row align="baseline">
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-select
              v-model="mapping._id"
              :items="clusterItem"
              label="Cluster"
              color="purple darken-3"
              item-text="clusterName"
              item-value="_id"
              :rules="mandatoryRule"
              @change="getClusterInputMaterialsById(mapping._id)"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-autocomplete
              v-model="mapping.inputMaterialsId"
              :items="inputMaterialItem"
              label="Input Material"
              color="purple darken-3"
              item-text="inputMaterialName"
              item-value="_id"
              :rules="mandatoryRule2"
              multiple
              chips
              deletable-chips
              small-chips
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4" v-if="create">
            <v-btn
              text
              color="success"
              class="font-weight-bold"
              @click="updateClusterInputMaterials"
            >
              Create
              <v-icon class="ml-2">mdi-plus-box</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4" v-else>
            <v-btn
              text
              color="success"
              class="font-weight-bold"
              @click="updateClusterInputMaterials"
            >
              Update
              <v-icon class="ml-2">mdi-update</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </material-card>
    <v-card>
      <v-data-table
        :headers="clusterHeader"
        :items="clusterData"
        :search="search"
      >
        <template v-slot:[`item.inputMaterials`]="{ item }">
          {{
            item.inputMaterialsObj.map((d) => {
              return d.inputMaterialName;
            })
          }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "InputMaterial-Activity",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    search: "",
    create: true,
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    clusterItem: [],
    inputMaterialItem: [],
    mapping: {},
    documentId: "",
    clusterHeader: [
      {
        text: "Cluster Name",
        value: "clusterName",
        sortable: false,
      },
      {
        text: "Input Materials",
        value: "inputMaterials",
        sortable: false,
      },
    ],
    clusterData: [],
  }),
  methods: {
    allCluster() {
      this.$axios
        .get("/clusters/")
        .then((res) => {
          this.clusterItem = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    allInputMaterials() {
      this.$axios
        .get("/inputMaterials/")
        .then((res) => {
          this.inputMaterialItem = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    allClusterWithInputMaterials() {
      this.$axios
        .get("/clusters/inputMaterials/")
        .then((res) => {
          console.log(res);
          this.clusterData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getClusterInputMaterialsById(id) {
      this.$axios
        .get("/clusters/" + id)
        .then((res) => {
          var data = res.data[0];
          if (data) {
            this.create = true;
            this.mapping = data;
            if (this.mapping.inputMaterialsId) {
              this.create = false;
            }
          } else {
            this.mapping.inputMaterialsId = [];
            this.mapping.clusterName = "";
            this.create = true;
          }
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    updateClusterInputMaterials() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .put("/clusters/" + this.mapping._id, this.mapping)
          .then((res) => {
            this.$refs.form.reset();
            var type = this.create ? "Created" : "Updated";
            this.$store.commit(
              "successSnackbar",
              "Input Materials for Clusters " + type + " Successfully"
            );
            this.create = true;
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
        this.allClusterWithInputMaterials();
      }
    },
  },
  mounted() {
    this.allCluster();
    this.allInputMaterials();
    this.allClusterWithInputMaterials();
  },
};
</script>
