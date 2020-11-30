<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-clipboard-text" title="Message Template" class="px-5 py-3">
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "MessageTemplate",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({}),
};
</script>
