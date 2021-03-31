<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="450px" persistent>
      <v-card class="ma0">
        <v-card-title class="justify-center">Message Preview</v-card-title>
        <v-card-text class="flex flex-column align-center">
          <div class="font-weight-bold">{{ parsedTemplate }}</div>
          <img
            :src="mediaData.tempUrl"
            :alt="mediaData.fileName"
            width="200"
            height="200"
            v-if="mediaData.mediaType == 'image'"
          />
          <!-- <div class="w-100 flex flex-column align-center mt-4">
            <v-text-field
              dense
              solo
              outlined
              v-model="mediaUrl"
              label="Media URL"
              single-line
              color="error"
            ></v-text-field>
            <span>OR</span>
            <v-btn
              text
              large
              color="primary"
              @click="$refs.fileUpload.click()"
              class="font-weight-bold"
            >
              {{
                Object.keys(mediaData).length > 0
                  ? "Change Media"
                  : "Upload Media"
              }}
              <v-icon right>mdi-cloud-upload</v-icon>
            </v-btn>
          </div> -->
        </v-card-text>
        <v-card-actions class="justify-between">
          <v-btn
            text
            class="font-weight-bold"
            color="warning"
            large
            @click="dialog = false"
          >
            <v-icon class="mr-2">mdi-chevron-left</v-icon>
            Back
          </v-btn>
          <v-btn
            text
            large
            color="primary"
            @click="$refs.fileUpload.click()"
            class="font-weight-bold"
          >
            {{
              Object.keys(mediaData).length > 0
                ? "Change Media"
                : "Upload Media"
            }}
            <v-icon right>mdi-cloud-upload</v-icon>
          </v-btn>
          <v-btn
            text
            color="success"
            class="font-weight-bold"
            large
            @click="send"
          >
            Confirm
            <v-icon class="ml-2">mdi-send</v-icon>
          </v-btn>
          <!-- <v-btn
            text
            color="error"
            class="font-weight-bold"
            large
            @click="schedule"
          >
            Schedule
            <v-icon class="ml-2">mdi-timelapse</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-form ref="form">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          v-if="codes.notificationModule !== '1'"
        >
          <v-text-field
            :label="
              (codes.notificationModule === '3'
                ? 'Stolen Price '
                : 'Input Price ') + '(Per KG)'
            "
            v-model="SIP"
            color="success"
            :rules="mandatoryRule"
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          v-if="codes.notificationModule === '2'"
        >
          <v-select
            v-model="combineEducationalMessage"
            :items="yesNoOptions"
            label="Combine Educational Messaging?"
            color="success"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-select
            v-model="messageTemplate"
            :items="messageTemplates"
            label="Message Template"
            color="success"
            item-text="templateName"
            item-value="message"
            :rules="mandatoryRule"
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-form ref="messageType">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-row align="center" justify="space-around">
            <v-switch
              v-model="messageTypes"
              label="Send Normal Message"
              :rules="mandatoryRule2"
              value="sms"
              inset
              :disabled="!selectedFarmerOnMessage"
            ></v-switch>
            <v-tooltip top v-if="!selectedFarmerOnMessage">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-information-outline
                </v-icon>
              </template>
              <span>Selected Farmers not on Message</span>
            </v-tooltip>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-row align="center" justify="space-around">
            <v-switch
              v-model="messageTypes"
              label="Send Whatsapp Message"
              :rules="mandatoryRule2"
              value="whatsapp"
              inset
              :disabled="!selectedFarmerOnWhatsapp"
            ></v-switch>
            <v-tooltip top v-if="!selectedFarmerOnWhatsapp">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-information-outline
                </v-icon>
              </template>
              <span>Selected Farmers not on Message</span>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-btn
        text
        color="error"
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
        color="success"
        class="font-weight-bold"
        large
        @click="preview"
      >
        Send
        <v-icon class="ml-2">mdi-send</v-icon>
      </v-btn>
      <input
        v-show="false"
        ref="fileUpload"
        id="fileInput"
        accept=".mp4, .mkv, .mov, .jpg, .jpeg, .png, .gif"
        type="file"
        @change="uploadFiles"
      />
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "MessagePreview",
  props: {
    messageTemplates: {
      type: Array,
      default: [],
    },
    selectedFarmerOnWhatsapp: {
      type: Boolean,
      default: true,
    },
    selectedFarmerOnMessage: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    mandatoryRule2: [
      (v) => (v && v.length > 0) || "* At least one item should be selected ",
    ],
    messageTemplate: "",
    SIP: "",
    dialog: false,
    combineEducationalMessage: "",
    codes: {},
    fileFormats: ["mkv", "mp4", "mov", "jpg", "jpeg", "png", "gif"],
    imageFormats: ["jpg", "jpeg", "png", "gif"],
    mediaUrl: "",
    messageTypes: [],
  }),
  methods: {
    updateFilterData() {
      this.$store.commit("addFilterData", { SIP: this.SIP });
    },
    previous() {
      this.$emit("updateStepper", 2);
      this.$store.commit("resetMediaData", {});
      this.$refs.messageType.reset();
    },
    schedule() {
      this.updateFilterData();
    },
    send() {
      var t = this.$refs.form.validate();
      var t1 = this.$refs.messageType.validate();
      if (t && t1) {
        this.updateFilterData();
        var isMediaAttached = false;
        var mediaData = this.$store.state.mediaData;
        if (Object.keys(mediaData).length > 0) {
          isMediaAttached = true;
        }
        if (isMediaAttached) {
          this.$emit("updateLoader", true);
          this.upload2S3();
        } else {
          this.$emit("updateLoader", true);
          this.sendMessage(false, []);
        }
      }
    },
    preview() {
      var t = this.$refs.form.validate();
      var t1 = this.$refs.messageType.validate();
      if (t && t1) {
        this.updateFilterData();
        this.dialog = !this.dialog;
      }
    },
    uploadFiles(e) {
      var fileData = new Object();
      fileData = e.target.files[0];
      var type = fileData.name.split(".");
      type = type.pop();
      if (fileData.size < 5242880) {
        if (this.fileFormats.includes(type)) {
          fileData.tempUrl = URL.createObjectURL(fileData);
          if (this.imageFormats.includes(type)) {
            fileData.mediaType = "image";
          } else {
            fileData.mediaType = "video";
          }
          this.$store.commit("uploadMediaData", fileData);
        } else {
          this.$store.commit("resetMediaData", {});
          this.$store.commit("errorSnackbar", "The file format not supported");
        }
      } else {
        this.$store.commit("resetMediaData", {});
        this.$store.commit(
          "errorSnackbar",
          "File size should be less than 5 MB"
        );
      }
    },
    upload2S3() {
      var mediaData = this.$store.state.mediaData;
      var formData = new FormData();
      formData.append("files", mediaData);
      this.$axios
        .post("/sendMessage/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.sendMessage(true, res.data);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    sendMessage(isMediaAttached, mediaUrl) {
      this.$axios
        .post("/sendMessage/message/", {
          farmers: this.$store.state.filterData.selectedFarmer,
          message: this.parsedTemplate,
          isMediaAttached: isMediaAttached,
          mediaUrl: mediaUrl,
          messageTypes: this.messageTypes,
        })
        .then((res) => {
          this.$emit("updateLoader", false);
          this.resetStore();
          this.$router.push("/messageHistory");
        })
        .catch((err) => {
          console.log(err);
          this.$emit("updateLoader", false);
          this.resetStore();
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    resetStore() {
      this.$store.commit("resetFilterData", []);
      this.$store.commit("resetMediaData", {});
    },
  },
  computed: {
    yesNoOptions() {
      return this.$store.state.yesNoOptions;
    },
    parsedTemplate() {
      this.codes = this.$store.state.filterData;
      var self = this;
      var parsedString = this.messageTemplate.replace(
        /SIP|SC|SP|WFO/gi,
        function(match) {
          return self.codes[match];
        }
      );
      return parsedString;
    },
    mediaData() {
      return this.$store.state.mediaData;
    },
  },
  watch: {
    messageTypes: function(val) {
      console.log(val);
      console.log(this.selectedFarmerOnWhatsapp);
      console.log(this.selectedFarmerOnMessage);
    },
  },
  mounted() {
    this.codes = this.$store.state.filterData;
  },
};
</script>
