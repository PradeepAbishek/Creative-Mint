<template>
  <v-container class="py-0">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <yield v-on:YieldValues="setYieldValues"></yield>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <loyalty v-on:LoyaltyValues="setLoyaltyValues"></loyalty>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.currentMonth"
            :items="months"
            label="Current Month"
            color="success"
            item-text="name"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-select
            v-model="filter.scheduleReminder"
            :items="scheduleReminderOptions"
            label="Schedule Reminders for"
            color="success"
            multiple
            :rules="mandatoryRule2"
            small-chips
            deletable-chips
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
  name: "GAPNotification",
  props: {
    notificationModule: {
      type: String,
      default: 1,
    },
  },
  components: {
    Yield: () => import("@/components/Yield"),
    Loyalty: () => import("@/components/Loyalty"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    filter: {
      currentMonth: new Date().getMonth() + 1,
    },
  }),
  methods: {
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
        .post("/filters/GAPNotification/", this.$store.state.filterData)
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
  },
  computed: {
    months() {
      return this.$store.state.months;
    },
    scheduleReminderOptions() {
      return this.$store.state.scheduleReminderOptions;
    },
  },
};
</script>
