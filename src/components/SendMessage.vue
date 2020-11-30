<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-send" title="Send Message" class="px-5 py-3">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <!-- <v-stepper v-model="step" alt-labels vertical>
            <v-stepper-header>
              <v-stepper-step step="1" color="success">Filters</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" color="warning">Send Message</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <message-filter></message-filter>
              </v-stepper-content>
              <v-stepper-content step="2">
                cddfdfdsdsd
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper> -->
          <v-stepper v-model="step" vertical>
            <v-stepper-step step="1" color="success" :complete="step > 1">
              Filters
            </v-stepper-step>
            <v-stepper-content step="1">
              <message-filter v-on:updateStepper="updateStepper">
              </message-filter>
            </v-stepper-content>
            <v-stepper-step step="2" color="warning">
              Send Message
            </v-stepper-step>
            <v-stepper-content step="2">
              <h1>Preview Pending</h1>
              <v-row>
                <v-btn
                  text
                  color="primary"
                  class="font-weight-bold"
                  large
                  @click="step = '1'"
                >
                  <v-icon class="mr-2">mdi-chevron-left</v-icon>
                  Previous
                </v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
    </material-card>
  </v-container>
</template>
<script>
export default {
  name: "SendMessage",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
    MessageFilter: () => import("@/components/MessageFilter"),
  },
  data: () => ({
    step: 1,
  }),
  methods: {
    updateStepper(stepValue) {
      this.step = stepValue;
    },
  },
};
</script>
