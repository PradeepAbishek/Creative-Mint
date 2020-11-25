<template>
  <v-container fluid tag="section">
    <material-card
      icon="mdi-clipboard-text"
      title="Schedules"
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
  name: "Login",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    scheduleTableHeaders: [
      {
        text: "Column 1",
        align: "start",
        sortable: false,
        value: "col1",
      },
      {
        text: "Column 2",
        align: "start",
        sortable: false,
        value: "col2",
      },
      {
        text: "Column 3",
        align: "start",
        sortable: false,
        value: "col3",
      },
      {
        text: "Column 4",
        align: "start",
        sortable: false,
        value: "col4",
      },
      {
        text: "Column 5",
        align: "start",
        sortable: false,
        value: "col5",
      },
      {
        text: "Column 6",
        align: "start",
        sortable: false,
        value: "col6",
      },
      {
        text: "Column 7",
        align: "start",
        sortable: false,
        value: "col7",
      },
      {
        text: "Column 8",
        align: "start",
        sortable: false,
        value: "col8",
      },
      {
        text: "Column 9",
        align: "start",
        sortable: false,
        value: "col9",
      },
      {
        text: "Column 10",
        align: "start",
        sortable: false,
        value: "col10",
      },
      {
        text: "Actions",
        align: "end",
        value: "actions",
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
