<template>
  <v-card class="mt0">
    <v-card-text>
      <div class="flex items-center justify-between">
        <div class="w-90">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            color="success"
            label="Search"
            clearable
          ></v-text-field>
        </div>
        <v-tooltip bottom v-if="this.farmerData.length > 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              color="primary"
              text
              v-bind="attrs"
              v-on="on"
              @click="downloadCsv"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
      </div>
      <v-data-table
        v-model="selectedFarmer"
        :headers="farmerHeaders"
        :items="farmerData"
        :search="search"
        show-select
        item-key="_id"
      >
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="error"
        class="font-weight-bold"
        large
        @click="previous"
      >
        <v-icon class="mr-2">mdi-chevron-left</v-icon>
        Previous
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="success" class="font-weight-bold" large @click="next">
        Next
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import exportToCsv from "../../csv";
export default {
  name: "FarmerFilter",
  data: () => ({
    search: "",
    selectedFarmer: [],
    farmerHeaders: [
      {
        text: "Name",
        value: "farmerName",
        sortable: false,
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
        sortable: false,
      },
      {
        text: "Cluster",
        value: "clusterDetails.clusterName",
        sortable: false,
      },
      {
        text: "Loyalty",
        value: "loyalty",
        sortable: false,
      },
      {
        text: "Yield",
        value: "yields",
        sortable: false,
      },
      {
        text: "Sold Mint Oil in the Past",
        value: "soldMintOilInPast",
        sortable: false,
      },
      {
        text: "Purchased I/P Material in Past",
        value: "purchasedInputMaterialInPast",
        sortable: false,
      },
      {
        text: "Distance from FPC",
        value: "distanceFromFPC",
        sortable: false,
      },
      {
        text: "On Whatsapp",
        value: "isOnWhatsapp",
        sortable: false,
      },
      {
        text: "On Message",
        value: "isOnMessage",
        sortable: false,
      },
      {
        text: "Active Farmer",
        value: "isActive",
        sortable: false,
      },
    ],
  }),
  methods: {
    next() {
      if (this.selectedFarmer.length > 0) {
        this.$emit("updateStepper", 3);
        this.$store.commit("addFilterData", {
          selectedFarmer: this.selectedFarmer,
        });
      } else {
        this.$store.commit(
          "errorSnackbar",
          "Please select the farmers to send message"
        );
      }
    },
    previous() {
      this.$emit("updateStepper", 1);
    },
    downloadCsv() {
      var headers = [
        "Farmer Name",
        "Phone Number",
        "Cluster Name",
        "Loyalty",
        "Yield",
        "Sold Mint Oil in the Past",
        "Purchased I/P Material in Past",
        "Distance From FPC",
        "On Whatsapp",
        "On Message",
      ];
      var dataValue = [
        "farmerName",
        "phoneNumber",
        "clusterDetails",
        "loyalty",
        "yields",
        "soldMintOilInPast",
        "purchasedInputMaterialInPast",
        "distanceFromFPC",
        "isOnWhatsapp",
        "isOnMessage",
      ];
      var rows = this.farmerData.map((x) => {
        var array = [];
        for (var i = 0; i < dataValue.length; i++) {
          array.push(x[dataValue[i]]);
        }
        return array;
      });
      var csvData = [headers, ...rows];
      exportToCsv("Farmers List.csv", csvData);
    },
  },
  computed: {
    farmerData() {
      return this.$store.state.filteredFarmerData;
    },
  },
};
</script>
