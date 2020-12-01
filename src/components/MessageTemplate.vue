<template>
  <v-container fluid tag="section">
    <material-card
      icon="mdi-clipboard-text"
      title="Message Template"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="messageTemplateHeaders"
        :items="messageTemplateData"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="success">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "MessageTemplate",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    messageTemplateHeaders: [
      {
        text: "Template Name",
        value: "templateName",
        sortable: false,
      },
      {
        text: "Message",
        value: "message",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  methods: {
    deleteItem(item) {
      console.log(item);
    },
    editItem(messageTemplate) {
      this.$store.commit("UpdateEditMessageTemplate", messageTemplate);
      this.$router.push("/messageTemplate/edit");
    },
  },
  computed: {
    messageTemplateData() {
      return this.$store.state.messageTemplateData;
    },
  },
};
</script>
