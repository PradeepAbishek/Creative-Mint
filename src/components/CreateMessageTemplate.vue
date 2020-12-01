<template>
  <v-row>
    <v-col cols="12" sm="12" md="8" lg="8">
      <v-container fluid tag="section">
        <material-card
          :title="$route.name"
          color="pink darken-1"
          class="px-5 py-3"
        >
          <v-form ref="form">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Template Name"
                  v-model="messageTemplate.templateName"
                  color="pink darken-1"
                  :rules="mandatoryRule"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-textarea
                  label="Message Template"
                  v-model="messageTemplate.message"
                  color="pink darken-1"
                  :rules="mandatoryRule"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                text
                color="pink darken-1"
                class="font-weight-bold"
                large
                @click="backToMessageTemplate"
              >
                <v-icon class="mr-2">mdi-chevron-left</v-icon>
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="pink darken-1" @click="createTemplate">
                Create
                <v-icon class="ml-2">mdi-clipboard-plus</v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </material-card>
      </v-container>
    </v-col>
    <v-col cols="12" sm="12" md="4" lg="4">
      <message-code></message-code>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "CreateMessageTemplate",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
    MessageCode: () => import("@/components/MessageCode"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    messageTemplate: {
      templateName: "",
      message: "",
    },
  }),
  methods: {
    createTemplate() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$router.push("/messageTemplate");
      }
    },
    backToMessageTemplate() {
      this.$router.push("/messageTemplate");
    },
  },
};
</script>
