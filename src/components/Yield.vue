<template>
  <v-select
    v-model="yields"
    :items="yieldOptions"
    label="Yield"
    color="success"
    item-text="name"
    :rules="mandatoryRule2"
    small-chips
    deletable-chips
    multiple
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="yields && yields.length > 0 ? 'indigo darken-4' : ''">
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
  name: "Yield",
  data: () => ({
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    yields: [],
    yieldOptions: [],
  }),
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllYields) {
          this.yields = [];
        } else {
          this.yields = this.yieldOptions.slice();
        }
      });
    },
    getAllYields() {
      this.yieldOptions = this.$store.state.yields;
    },
  },
  computed: {
    selectAllYields() {
      return this.yields.length === this.yieldOptions.length;
    },
    selectsSomeYields() {
      return this.yields.length > 0 && !this.selectAllYields;
    },
    icon() {
      if (this.selectAllYields) return "mdi-close-box";
      if (this.selectsSomeYields) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  watch: {
    yields: function(val) {
      this.$emit("YieldValues", val);
    },
  },
  mounted() {
    this.getAllYields();
  },
};
</script>
