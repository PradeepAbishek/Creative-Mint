<template>
  <v-container class="py-0">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.clusterId"
            :items="clusterOptions"
            label="Cluster"
            color="success"
            :rules="mandatoryRule"
            item-text="clusterName"
            item-value="_id"
            @change="getClusterInputMaterialsById(filter.clusterId)"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <yield v-on:YieldValues="setYieldValues"></yield>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <loyalty v-on:LoyaltyValues="setLoyaltyValues"></loyalty>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <distance v-on:DistanceValues="setDistanceValues"></distance>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="inputMaterialOptions.length > 0"
        >
          <v-select
            v-model="filter.SIM"
            :items="inputMaterialOptions"
            label="Input Material"
            color="success"
            :rules="mandatoryRule2"
            small-chips
            deletable-chips
            item-text="inputMaterialName"
            item-value="_id"
            multiple
          >
          </v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn text color="success" class="font-weight-bold" large @click="next">
        Next
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "InputMaterialsNotification",
  props: {
    notificationModule: {
      type: String,
      default: 2,
    },
  },
  components: {
    Yield: () => import("@/components/Yield"),
    Loyalty: () => import("@/components/Loyalty"),
    Distance: () => import("@/components/Distance"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    filter: {},
    clusterOptions: [],
    inputMaterialOptions: [],
  }),
  methods: {
    getClusterInputMaterialsById(id) {
      this.inputMaterialOptions = [];
      this.$axios
        .get("/clusters/" + id)
        .then((res) => {
          var inputMaterials = res.data[0];
          this.filter.SC = inputMaterials.clusterName;
          if (inputMaterials && inputMaterials.inputMaterialsObj) {
            this.inputMaterialOptions = inputMaterials.inputMaterialsObj;
          }
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    allClusters() {
      this.$axios
        .get("/clusters/")
        .then((res) => {
          this.clusterOptions = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    next() {
      var t = this.$refs.form.validate();
      if (t) {
        this.filter["notificationModule"] = this.notificationModule;
        this.$store.commit("UpdateFilterData", this.filter);
        this.$emit("updateStepper", 2);
        this.filterData();
      }
    },
    filterData() {
      this.$axios
        .post(
          "/filters/InputMaterialsNotification/",
          this.$store.state.filterData
        )
        .then((res) => {
          this.$store.commit("setFilteredFarmerData", res.data);
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    setYieldValues(values) {
      this.filter.yields = values;
    },
    setLoyaltyValues(values) {
      this.filter.loyalty = values;
    },
    setDistanceValues(values) {
      this.filter.distanceFromFPC = values;
    },
  },
  mounted() {
    this.allClusters();
  },
};
</script>
