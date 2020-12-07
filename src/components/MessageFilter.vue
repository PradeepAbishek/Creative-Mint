<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-select
          v-model="notificationModule"
          :items="notificationModules"
          label="Notification Module"
          color="success"
          item-text="name"
          :rules="mandatoryRule"
        ></v-select>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule !== 1">
          <v-select
            v-model="filter.clusters"
            :items="clusterOptions"
            small-chips
            label="Cluster"
            multiple
            color="success"
            :rules="mandatoryRule2"
          >
            <template v-slot:prepend-item>
              <select-all
                :selectOption="clusterOptions"
                label="clusters"
                v-on:updateSelectAll="updateSelectAll"
              ></select-all>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.yieldType"
            :items="yieldOptions"
            label="Yield"
            color="success"
            item-text="name"
            :rules="mandatoryRule2"
            multiple
            small-chips
          >
            <template v-slot:prepend-item>
              <select-all
                :selectOption="yieldOptions"
                label="yieldType"
                v-on:updateSelectAll="updateSelectAll"
              ></select-all>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.loyalty"
            :items="loyaltyOptions"
            label="Loyalty"
            color="success"
            item-text="name"
            :rules="mandatoryRule2"
            multiple
            small-chips
          >
            <template v-slot:prepend-item>
              <select-all
                :selectOption="loyaltyOptions"
                label="loyalty"
                v-on:updateSelectAll="updateSelectAll"
              ></select-all>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule !== 1">
          <v-select
            v-model="filter.distance"
            :items="distanceOptions"
            label="Distance"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 2">
          <v-select
            v-model="filter.inputMaterial"
            :items="inputMaterialOptions"
            label="Input Material"
            color="success"
            :rules="mandatoryRule2"
            multiple
            small-chips
          >
            <template v-slot:prepend-item>
              <select-all
                :selectOption="inputMaterialOptions"
                label="inputMaterial"
                v-on:updateSelectAll="updateSelectAll"
              ></select-all>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 4">
          <v-select
            v-model="filter.soldMintOilInPast"
            :items="yesNoOptions"
            label="Sold Mint Oil in the Past"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 4">
          <v-select
            v-model="filter.purchasedInputMaterialInPast"
            :items="yesNoOptions"
            label="Purchased Input Material in Past"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 1">
          <v-select
            v-model="filter.currentMonth"
            :items="months"
            label="Current Month"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 1">
          <v-select
            v-model="filter.scheduleReminder"
            :items="scheduleReminderOptions"
            label="Schedule Reminders for"
            color="success"
            multiple
            :rules="mandatoryRule2"
            small-chips
          >
            <template v-slot:prepend-item>
              <select-all
                :selectOption="scheduleReminderOptions"
                label="scheduleReminder"
                v-on:updateSelectAll="updateSelectAll"
              ></select-all>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 3">
          <v-select
            v-model="filter.shareHolder"
            :items="shareHolderOptions"
            label="Shareholder Flag"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" v-if="notificationModule === 3">
          <v-text-field
            v-model="filter.numberOfFarmers"
            label="Number of Farmers"
            :rules="mandatoryRule"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn text color="primary" class="font-weight-bold" large @click="next">
        Next
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "MessageFilter",
  components: {
    SelectAll: () => import("@/components/SelectAll"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    clusterOptions: ["Fatehpur", "Masauli", "Zaidpur", "Gosaigani"],
    distanceOptions: ["All", 1, 2, 7, 10],
    inputMaterialOptions: ["SSP", "ADP"],
    notificationModule: 1,
    filter: {
      clusters: [],
      yieldType: [],
      loyalty: [],
      distance: "",
      inputMaterial: [],
      soldMintOilInPast: "",
      purchasedInputMaterialInPast: "",
      currentMonth: "",
      scheduleReminder: [],
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
    updateSelectAll(payload) {
      this.filter[payload.label] = payload.value;
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
  watch: {
    notificationModule: function(val) {
      this.$refs.form.reset();
    },
  },
};
</script>
