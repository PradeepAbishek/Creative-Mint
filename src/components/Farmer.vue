<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-human-child" title="Farmer" class="px-5 py-3">
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        color="success"
        label="Search"
        clearable
      ></v-text-field>
      <v-data-table
        :headers="farmerHeaders"
        :items="farmerData"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="error">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "Farmer",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    search: "",
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
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    farmerData: [],
    search: "",
  }),
  methods: {
    editItem(farmer) {
      this.$store.commit("UpdateEditFarmer", farmer);
      this.$router.push("/farmer/edit");
    },
    refreshFarmerData() {
      this.$axios
        .get("/farmers/")
        .then((res) => {
          this.farmerData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  mounted() {
    this.refreshFarmerData();
  },
};
</script>
