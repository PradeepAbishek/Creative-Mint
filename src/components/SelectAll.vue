<template>
  <v-list-item ripple @click="toggle">
    <v-list-item-action>
      <v-icon :color="selectedItem.length > 0 ? 'primary' : ''">
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
<script>
export default {
  name: "SelectAll",
  props: {
    selectOption: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    selectedItem: [],
  }),
  methods: {
    toggle() {
      var data = {};
      data.label = this.label;
      this.$nextTick(() => {
        if (this.selectAll) {
          this.selectedItem = [];
          data.value = this.selectedItem;
        } else {
          this.selectedItem = this.selectOption.slice();
          data.value = this.selectedItem;
        }
        this.$emit("updateSelectAll", data);
      });
    },
  },
  computed: {
    selectAll() {
      return this.selectedItem.length === this.selectOption.length;
    },
    icon() {
      if (this.selectAll) return "mdi-checkbox-marked";
      return "mdi-checkbox-blank-outline";
    },
  },
};
</script>
