<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card class="ma0">
        <v-card-title class="justify-center">Message Preview</v-card-title>
        <v-card-text class="font-weight-bold">
          Best Price available at FPC! 
          <br />
          Sell Menthol oil at Rs.200 per kg at
          Masauli
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
          label="Input Price (per kg)"
          v-model="price"
          color="warning"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-select
          v-model="messageTemplate"
          :items="messageTemplates"
          label="Message Template"
          color="warning"
          item-text="templateName"
          item-value="message"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        text
        color="primary"
        class="font-weight-bold"
        large
        @click="previous"
      >
        <v-icon class="mr-2">mdi-chevron-left</v-icon>
        Previous
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="indigo"
        class="font-weight-bold"
        large
        @click="dialog = !dialog"
      >
        Preview
        <v-icon class="ml-2">mdi-eye</v-icon>
      </v-btn>
      <v-btn text color="primary" class="font-weight-bold" large @click="save">
        Save
        <v-icon class="ml-2">mdi-message-plus</v-icon>
      </v-btn>
      <v-btn text color="success" class="font-weight-bold" large @click="send">
        Send
        <v-icon class="ml-2">mdi-send</v-icon>
      </v-btn>
      <v-btn
        text
        color="error"
        class="font-weight-bold"
        large
        @click="schedule"
      >
        Schedule
        <v-icon class="ml-2">mdi-timelapse</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "MessagePreview",
  data: () => ({
    messageTemplate: "",
    price: "",
    dialog: false,
  }),
  methods: {
    previous() {
      this.$emit("updateStepper", 1);
    },
    save() {
      alert("Save API");
    },
    schedule() {
      alert("Save API & Schedule API");
    },
    send() {
      alert("Save API & Schedule API");
    },
    preview() {
      alert("Message Preview");
    },
  },
  computed: {
    messageTemplates() {
      return this.$store.state.messageTemplateData;
    },
  },
};
</script>
