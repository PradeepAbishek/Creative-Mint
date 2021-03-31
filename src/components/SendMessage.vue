<template>
  <v-container fluid tag="section">
    <v-row
      class="flex flex-column justify-center vh-75"
      align="center"
      v-if="loader"
    >
      <v-progress-circular
        :size="80"
        color="success"
        indeterminate
      ></v-progress-circular>
      <div>
        Sending Messages...
      </div>
    </v-row>
    <material-card
      icon="mdi-send"
      title="Send Message"
      class="px-5 py-3"
      v-if="!loader"
    >
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-stepper v-model="step" vertical>
            <v-stepper-step step="1" color="success" :complete="step > 1">
              Filters
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" sm="12" md="4" lg="4">
                    <v-select
                      v-model="notificationModule"
                      :items="notificationModules"
                      label="Notification Module"
                      color="success"
                      item-text="name"
                      :rules="mandatoryRule"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <gap-notification
                v-on:updateStepper="updateStepper"
                v-if="notificationModule === '1'"
                :notificationModule="notificationModule"
              ></gap-notification>
              <input-materials-notification
                v-on:updateStepper="updateStepper"
                v-if="notificationModule === '2'"
                :notificationModule="notificationModule"
              ></input-materials-notification>
              <stolon-notification
                v-on:updateStepper="updateStepper"
                v-if="notificationModule === '3'"
                :notificationModule="notificationModule"
              ></stolon-notification>
              <price-notification
                v-on:updateStepper="updateStepper"
                v-if="notificationModule === '4'"
                :notificationModule="notificationModule"
              ></price-notification>
            </v-stepper-content>
            <v-stepper-step step="2" color="success" :complete="step > 2">
              Select Farmers
            </v-stepper-step>
            <v-stepper-content step="2">
              <farmer-filter v-on:updateStepper="updateStepper"></farmer-filter>
            </v-stepper-content>
            <v-stepper-step step="3" color="success">
              Send Message
            </v-stepper-step>
            <v-stepper-content step="3">
              <message-preview
                v-on:updateStepper="updateStepper"
                v-on:updateLoader="updateLoader"
                :messageTemplates="messageTemplates"
                :selectedFarmerOnWhatsapp="WhatsappMessage"
                :selectedFarmerOnMessage="NormalMessage"
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
    MessagePreview: () => import("@/components/MessagePreview"),
    FarmerFilter: () => import("@/components/filters/FarmerFilter"),
    GapNotification: () => import("@/components/filters/GAPNotification"),
    StolonNotification: () => import("@/components/filters/StolonNotification"),
    PriceNotification: () => import("@/components/filters/PriceNotification"),
    InputMaterialsNotification: () =>
      import("@/components/filters/InputMaterialsNotification"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    step: 1,
    notificationModule: "1",
    loader: false,
    messageTemplates: [],
    NormalMessage: false,
    WhatsappMessage: false,
  }),
  methods: {
    updateStepper(stepValue) {
      this.step = stepValue;
    },
    updateLoader(loaderValue) {
      this.loader = loaderValue;
    },
    getNotificationModuleMessageTemplates() {
      this.$axios
        .get(
          "/messageTemplates/notificationModule/" +
            this.$store.state.filterData.notificationModule
        )
        .then((res) => {
          this.messageTemplates = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    validateMessageOptions() {
      var selectedFarmer = this.$store.state.filterData.selectedFarmer;
      selectedFarmer.map((farmer) => {
        if (farmer.isOnMessage === "Yes" && !this.NormalMessage) {
          this.NormalMessage = true;
        }
        if (farmer.isOnWhatsapp === "Yes" && !this.WhatsappMessage) {
          this.WhatsappMessage = true;
        }
      });
    },
  },
  computed: {
    notificationModules() {
      return this.$store.state.notificationModules;
    },
  },
  watch: {
    step: function(val) {
      if (val === 3) {
        this.getNotificationModuleMessageTemplates();
        this.NormalMessage = false;
        this.WhatsappMessage = false;
        this.validateMessageOptions();
      }
    },
  },
};
</script>
