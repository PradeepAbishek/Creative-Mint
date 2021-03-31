<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="messageTemplateId"
      routeName="messageTemplates"
      module="Message Template"
      v-if="deleteDialog"
      v-on:refreshData="refreshMessageTemplate"
    ></delete-confirmation>
    <material-card
      icon="mdi-clipboard-text"
      title="Message Template"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="messageTemplateHeaders"
        :items="messageTemplateData"
      >
        <template v-slot:[`item.notificationModule`]="{ item }">
          {{ getModuleName(item.notificationModule) }}
        </template>
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
import axios from "axios";
export default {
  name: "MessageTemplate",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
    DeleteConfirmation: () => import("@/components/DeleteConfirmation"),
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
        text: "Module Name",
        value: "notificationModule",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    messageTemplateData: [],
    messageTemplateId: "",
    notificationModules: [],
  }),
  methods: {
    deleteItem(item) {
      this.messageTemplateId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
    editItem(messageTemplate) {
      this.$store.commit("UpdateEditMessageTemplate", messageTemplate);
      this.$router.push("/messageTemplate/edit");
    },
    refreshMessageTemplate() {
      this.$axios
        .get("/messageTemplates/")
        .then((res) => {
          this.messageTemplateData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getModuleName(moduleId) {
      var notificationModule = this.notificationModules.filter((x) => {
        if (x.value === moduleId) {
          return x;
        }
      });
      return notificationModule[0].name;
    },
  },
  computed: {
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  mounted() {
    this.notificationModules = this.$store.state.notificationModules;
    this.refreshMessageTemplate();
  },
};
</script>
