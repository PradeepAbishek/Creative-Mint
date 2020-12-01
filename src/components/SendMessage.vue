<template>
  <v-container fluid tag="section">
    <material-card icon="mdi-send" title="Send Message" class="px-5 py-3">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-stepper v-model="step" vertical>
            <v-stepper-step step="1" color="success" :complete="step > 1">
              Filters
            </v-stepper-step>
            <v-stepper-content step="1">
              <message-filter
                v-on:updateStepper="updateStepper"
              ></message-filter>
            </v-stepper-content>
            <v-stepper-step step="2" color="warning">
              Send Message
            </v-stepper-step>
            <v-stepper-content step="2">
              <message-preview
                v-on:updateStepper="updateStepper"
              ></message-preview>
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
    MessagePreview: () => import("@/components/MessagePreview"),
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
