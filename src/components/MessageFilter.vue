<template>
  <v-container fluid tag="section">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.notificationModule"
            :items="notificationModules"
            label="Notification Module"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule !== 1"
        >
          <v-select
            v-model="filter.clusters"
            :items="clusterOptions"
            small-chips
            label="Cluster"
            multiple
            color="success"
            :rules="mandatoryRule2"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.yieldType"
            :items="yieldOptions"
            label="Yield"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.loyalty"
            :items="loyaltyOptions"
            label="Loyalty"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule !== 1"
        >
          <v-select
            v-model="filter.distance"
            :items="distanceOptions"
            label="Distance"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 2"
        >
          <v-select
            v-model="filter.inputMaterial"
            :items="inputMaterialOptions"
            label="Input Material"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 4"
        >
          <v-select
            v-model="filter.soldMintOilInPast"
            :items="yesNoOptions"
            label="Sold Mint Oil in the Past"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 4"
        >
          <v-select
            v-model="filter.purchasedInputMaterialInPast"
            :items="yesNoOptions"
            label="Purchased Input Material in Past"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 1"
        >
          <v-select
            v-model="filter.currentMonth"
            :items="months"
            label="Current Month"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 1"
        >
          <v-select
            v-model="filter.scheduleReminder"
            :items="scheduleReminderOptions"
            label="Schedule Reminders for"
            color="success"
            multiple
            :rules="mandatoryRule2"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 3"
        >
          <v-select
            v-model="filter.shareHolder"
            :items="shareHolderOptions"
            label="Shareholder Flag"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="filter.notificationModule === 3"
        >
          <v-text-field
            v-model="filter.numberOfFarmers"
            label="Number of Farmers"
            :rules="mandatoryRule"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          large
          @click="next"
        >
          Next
          <v-icon class="ml-2">mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: "MessageFilter",
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [(v) => v.length > 0 || "* Mandatory Field"],
    clusterOptions: ["Fatehpur", "Masauli", "Zaidpur", "Gosaigani"],
    distanceOptions: ["All", 1, 2, 7, 10],
    inputMaterialOptions: ["SSP", "ADP"],
    filter: {
      notificationModule: 1,
      clusters: [],
      yieldType: "",
      loyalty: "",
      distance: "",
      inputMaterial: "",
      soldMintOilInPast: "",
      purchasedInputMaterialInPast: "",
      currentMonth: new Date().getMonth() + 1,
      scheduleReminder: "",
      shareHolder: "",
      numberOfFarmers: "",
    },
  }),
  methods: {
    next() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$store.commit("UpdateFilterData", this.filter);
        this.$emit("updateStepper", 2);
        // Update Step
      }
    },
  },
  computed: {
    notificationModules() {
      return this.$store.state.notificationModules;
    },
    yieldOptions() {
      return this.$store.state.yields;
    },
    loyaltyOptions() {
      return this.$store.state.loyalty;
    },
    yesNoOptions() {
      return this.$store.state.yesNoOptions;
    },
    months() {
      return this.$store.state.months;
    },
    scheduleReminderOptions() {
      return this.$store.state.scheduleReminderOptions;
    },
    shareHolderOptions() {
      return this.$store.state.shareHolderOptions;
    },
  },
};
</script>
