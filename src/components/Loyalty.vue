<template>
  <v-select
    v-model="loyalty"
    :items="loyaltyOptions"
    label="Loyalty"
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
          <v-icon
            :color="loyalty && loyalty.length > 0 ? 'indigo darken-4' : ''"
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
  name: "Loyalty",
  data: () => ({
    mandatoryRule2: [(v) => (v && v.length > 0) || "* Mandatory Field"],
    loyalty: [],
    loyaltyOptions: [],
  }),
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllLoyalty) {
          this.loyalty = [];
        } else {
          this.loyalty = this.loyaltyOptions.slice();
        }
      });
    },
    getAllLoyalty() {
      this.loyaltyOptions = this.$store.state.loyalty;
    },
  },
  computed: {
    selectAllLoyalty() {
      return this.loyalty.length === this.loyaltyOptions.length;
    },
    selectsSomeLoyalty() {
      return this.loyalty.length > 0 && !this.selectAllLoyalty;
    },
    icon() {
      if (this.selectAllLoyalty) return "mdi-close-box";
      if (this.selectsSomeLoyalty) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  watch: {
    loyalty: function(val) {
      this.$emit("LoyaltyValues", val);
    },
  },
  mounted() {
    this.getAllLoyalty();
  },
};
</script>
