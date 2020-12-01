<template>
  <v-container fluid tag="section">
    <material-card :title="$route.name" color="warning" class="px-5 py-1">
      <v-form ref="form">
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field
                v-model="farmer.farmerId"
                label="Farmer Id"
                color="warning"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field
                v-model="farmer.farmerName"
                label="Farmer Name"
                color="warning"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field
                v-model="farmer.phoneNumber"
                label="Phone Number"
                color="warning"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-select
                v-model="farmer.cluster"
                :items="clusterOptions"
                label="Cluster"
                color="warning"
                :rules="mandatoryRule"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-select
                v-model="farmer.loyalty"
                :items="loyaltyOptions"
                label="Loyalty"
                color="warning"
                item-text="name"
                :rules="mandatoryRule"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-select
                v-model="farmer.yield"
                :items="yieldOptions"
                label="Yield"
                color="warning"
                item-text="name"
                :rules="mandatoryRule"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-select
                v-model="farmer.soldMintOilInPast"
                :items="yesNoOptions"
                label="Sold Mint Oil in the Past"
                color="warning"
                :rules="mandatoryRule"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-select
                v-model="farmer.purchasedInputMaterialInPast"
                :items="yesNoOptions"
                label="Purchased Input Material in Past"
                color="warning"
                :rules="mandatoryRule"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field
                v-model="farmer.distanceFromFPC"
                label="Distance from FPC"
                color="warning"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              text
              color="warning"
              class="font-weight-bold"
              large
              @click="backToFarmer"
            >
              <v-icon class="mr-2">mdi-chevron-left</v-icon>
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="warning"
              class="font-weight-bold"
              large
              @click="updateFarmer"
            >
              Update
              <v-icon class="ml-2">mdi-update</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "EditFarmer",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    clusterOptions: ["Fatehpur", "Masauli", "Zaidpur", "Gosaigani"],
    farmer: {},
  }),
  methods: {
    backToFarmer() {
      this.$store.commit("UpdateEditFarmer", {});
      this.$router.push("/farmer");
    },
    updateFarmer() {
      var t = this.$refs.form.validate();
      if (t) {
        alert(JSON.stringify(this.farmer));
        this.$store.commit("UpdateEditFarmer", {});
        this.$router.push("/farmer");
      }
    },
  },
  computed: {
    yieldOptions() {
      return this.$store.state.yields;
    },
    loyaltyOptions() {
      return this.$store.state.loyalty;
    },
    yesNoOptions() {
      return this.$store.state.yesNoOptions;
    },
  },
  created() {
    this.farmer = this.$store.state.editedFarmer;
  },
};
</script>
