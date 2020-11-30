<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-face" title="Farmer" class="px-5 py-3">
      <v-data-table :headers="farmerHeaders" :items="farmerData">
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
    farmerHeaders: [
      {
        text: "Id",
        value: "farmerId",
        sortable: false,
      },
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
        value: "cluster",
        sortable: false,
      },
      {
        text: "Loyalty",
        value: "loyalty",
        sortable: false,
      },
      {
        text: "Yield",
        value: "yield",
        sortable: false,
      },
      {
        text: "Sold Mint Oil in the Past",
        value: "soldMintOilInPast",
        sortable: false,
      },
      {
        text: "Purchased Input Material in Past",
        value: "purchasedInputMaterialInPast",
        sortable: false,
      },
      {
        text: "Distance from FPC",
        value: "distanceFromFPC",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    farmerData: [
      {
        farmerId: "19763",
        farmerName: "Adesh Kumar",
        phoneNumber: "40-9839233072",
        cluster: "Fatehpur",
        loyalty: "Loyal",
        yield: "High",
        soldMintOilInPast: "Yes",
        purchasedInputMaterialInPast: "No",
        distanceFromFPC: "4",
      },
      {
        farmerId: "22686",
        farmerName: "Jogendra Kumar",
        phoneNumber: "18-9670882103",
        cluster: "Fatehpur",
        loyalty: "Loyal",
        yield: "High",
        soldMintOilInPast: "Yes",
        purchasedInputMaterialInPast: "No",
        distanceFromFPC: "11",
      },
      {
        farmerId: "20008",
        farmerName: "Shiv Kumar",
        phoneNumber: "151-7080285878",
        cluster: "Fatehpur",
        loyalty: "Loyal",
        yield: "Medium",
        soldMintOilInPast: "Yes",
        purchasedInputMaterialInPast: "No",
        distanceFromFPC: "5",
      },
      {
        farmerId: "20274",
        farmerName: "Ram Sewak",
        phoneNumber: "256-9695005602",
        cluster: "Fatehpur",
        loyalty: "Loyal",
        yield: "High",
        soldMintOilInPast: "No",
        purchasedInputMaterialInPast: "Yes",
        distanceFromFPC: "10",
      },
      {
        farmerId: "10036",
        farmerName: "Mohd. Ali Hasan",
        phoneNumber: "40-9839233072",
        cluster: "Fatehpur",
        loyalty: "Loyal",
        yield: "High",
        soldMintOilInPast: "No",
        purchasedInputMaterialInPast: "No",
        distanceFromFPC: "10",
      },
    ],
  }),
  methods: {
    editItem(farmer) {
      this.$store.commit("UpdateEditFarmer", farmer);
      this.$router.push("/farmer/edit");
    },
  },
};
</script>
