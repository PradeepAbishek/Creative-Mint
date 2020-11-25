<template>
  <v-container fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="11" lg="10">
        <material-card title="Edit Schedule" color="success" class="px-5 py-1">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 1"
                    v-model="editedSchedule.col1"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 2"
                    v-model="editedSchedule.col2"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 3"
                    v-model="editedSchedule.col3"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Column 4"
                    v-model="editedSchedule.col4"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Column 5"
                    v-model="editedSchedule.col5"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 6"
                    v-model="editedSchedule.col6"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 7"
                    v-model="editedSchedule.col7"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Column 8"
                    v-model="editedSchedule.col8"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Column 9"
                    v-model="editedSchedule.col9"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Column 10"
                    v-model="editedSchedule.col10"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="updateSchedule">
                    Update Schedule
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "EditSchedules",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    editedSchedule: {},
  }),
  methods: {
    updateSchedule() {
      console.log(this.editedSchedule);
    },
  },
  mounted() {
    this.editedSchedule = this.$store.state.editedSchedule;
  },
};
</script>
