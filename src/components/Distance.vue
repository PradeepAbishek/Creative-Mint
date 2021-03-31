<template>
  <v-select
    v-model="distanceFromFPC"
    :items="distanceOptions"
    label="Distance"
    color="success"
    :rules="mandatoryRule2"
    small-chips
    deletable-chips
    multiple
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon
            :color="
              distanceFromFPC && distanceFromFPC.length > 0
                ? 'indigo darken-4'
                : ''
            "
          >
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Select All
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>
<script>
export default {
  name: "Distance",
  data: () => ({
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    distanceFromFPC: [],
    distanceOptions: [],
  }),
  methods: {
    getDistinctDistance() {
      this.$axios
        .get("/filters/distinct/distanceFromFPC")
        .then((res) => {
          this.distanceOptions = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllDistance) {
          this.distanceFromFPC = [];
        } else {
          this.distanceFromFPC = this.distanceOptions.slice();
        }
      });
    },
  },
  computed: {
    selectAllDistance() {
      return this.distanceFromFPC.length === this.distanceOptions.length;
    },
    selectsSomeDistance() {
      return this.distanceFromFPC.length > 0 && !this.selectAllDistance;
    },
    icon() {
      if (this.selectAllDistance) return "mdi-close-box";
      if (this.selectsSomeDistance) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  watch: {
    distanceFromFPC: function(val) {
      this.$emit("DistanceValues", val);
    },
  },
  mounted() {
    this.getDistinctDistance();
  },
};
</script>
