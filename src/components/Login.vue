<template>
  <v-container
    fluid
    tag="section"
    class="flex align-center h-100"
    :style="{
      'background-image':
        'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' +
        require('../assets/img/login.jpg') +
        ')',
      'background-position': 'center top',
      'background-size': 'cover',
    }"
  >
    <v-row class="flex justify-center">
      <v-col cols="12" sm="12" md="6" lg="4">
        <material-card title="LOGIN" color="success" class="px-5 py-3">
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="12" sm="12" lg="12">
                <v-text-field
                  v-model="userName"
                  label="Username"
                  required
                  :rules="mandatoryRule"
                  prepend-icon="mdi-email"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" lg="12">
                <v-text-field
                  :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passIcon ? 'text' : 'password'"
                  @click:append="passIcon = !passIcon"
                  v-model="password"
                  label="Password"
                  required
                  :rules="mandatoryRule"
                  prepend-icon="mdi-lock-outline"
                  color="success"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="flex justify-center">
            <v-btn text color="primary" class="font-weight-bold" @click="login">
              Let's Go
            </v-btn>
          </div>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  components: {
    MaterialCard: () => import("@/components/MaterialCard"),
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    userName: "",
    password: "",
    passIcon: false,
  }),
  methods: {
    login() {
      var t = this.$refs.form.validate();
      var formData = new FormData();
      formData.append("username", this.userName);
      formData.append("password", this.password);
      if (t) {
        this.$store.dispatch("login", formData);
      }
    },
  },
};
</script>
