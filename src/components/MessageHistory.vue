<template>
  <v-container fluid tag="section">
    <material-card
      icon="mdi-message"
      title="Message History"
      class="px-5 py-3"
    >
      <v-data-table :headers="scheduleTableHeaders" :items="scheduleTableData">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="success">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "MessageHistory",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    scheduleTableHeaders: [
      {
        text: "S.No",
        value: "col1",
      },
      {
        text: "Message",
        value: "col2",
      },
      {
        text: "Total Farmers",
        value: "col3",
      },
    ],
    scheduleTableData: [
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
      {
        col1: "Column 11",
        col2: "Column 12",
        col3: "Column 13",
        col4: "Column 14",
        col5: "Column 15",
        col6: "Column 16",
        col7: "Column 17",
        col8: "Column 18",
        col9: "Column 19",
        col10: "Column 110",
      },
    ],
  }),
  methods: {
    editItem(item) {
      this.$store.commit("UpdateEditSchedule", item);
      this.$router.push("/schedules/edit");
    },
  },
};
</script>
