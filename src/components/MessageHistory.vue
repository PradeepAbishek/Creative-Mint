<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-message" title="Message History" class="px-5 py-3">
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        color="success"
        label="Search"
        clearable
      ></v-text-field>
      <v-data-table
        :headers="messageHistoryHeaders"
        :items="messageHistoryData"
        :search="search"
      >
        <template v-slot:[`item.mediaUrl`]="{ item }">
          <a :href="item.mediaUrl" target="_blank">
            {{ item.mediaUrl.toString() }}
          </a>
        </template>
      </v-data-table>
    </material-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "MessageHistory",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    search: "",
    messageHistoryHeaders: [
      {
        text: "Farmer Name",
        value: "farmer.farmerName",
        sortable: false,
      },
      {
        text: "Phone Number",
        value: "farmer.phoneNumber",
        sortable: false,
      },
      {
        text: "Cluster Name",
        value: "clusterDetails.clusterName",
        sortable: false,
      },
      {
        text: "Message",
        value: "message",
        sortable: false,
      },
      {
        text: "Message Type",
        value: "messageType",
        sortable: false,
      },
      {
        text: "Media",
        value: "mediaUrl",
        sortable: false,
      },
      {
        text: "Message ID",
        value: "messageId",
        sortable: false,
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
      },
      {
        text: "Scheduled On",
        value: "scheduledOn",
        sortable: false,
      },
    ],
    messageHistoryData: [],
  }),
  methods: {
    getAllMessageHistory() {
      this.$axios
        .get("/messageHistory/")
        .then((res) => {
          this.messageHistoryData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  mounted() {
    this.getAllMessageHistory();
  },
};
</script>
