<template>
  <v-container fluid tag="section">
    <material-card title="Syntax" color="indigo dark-1" class="px-5 py-3">
      <v-list-item v-for="(item, i) in messageTemplateSyntax" :key="i">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip outlined label color="#00215f">{{ item.code }}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "MessageCode",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({}),
  computed: {
    messageTemplateSyntax() {
      return this.$store.state.messageTemplateSyntax;
    },
  },
};
</script>
