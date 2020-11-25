<template>
  <v-container
    fluid
    tag="section"
    class="flex align-center h-100"
    style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://demos.creative-tim.com/material-dashboard-pro/assets/img/login.jpg');background-position: top center;background-size: cover"
  >
    <v-row class="flex justify-center">
      <div class="w-25">
        <material-card title="LOGIN" color="success" class="px-5 py-3">
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="userName"
                  label="Username"
                  autocomplete="current-password"
                  required
                  :rules="mandatoryRule"
                  prepend-icon="mdi-email"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passIcon ? 'text' : 'password'"
                  @click:append="passIcon = !passIcon"
                  v-model="password"
                  label="Password"
                  autocomplete="current-password"
                  required
                  :rules="mandatoryRule"
                  prepend-icon="mdi-lock-outline"
                  color="success"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="flex justify-center">
            <v-btn
              text
              color="primary"
              class="font-weight-bold"
              @click="login"
            >
              Lets Go
            </v-btn>
          </div>
        </material-card>
      </div>
    </v-row>
  </v-container>
</template>
<script>
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
      if (t) {
        if (
          this.userName === "developers@ganitinc.com" &&
          this.password === "ganit@123"
        ) {
          localStorage.setItem("userLogged", true);
          this.$store.commit("UserLogged", true);
          this.$router.push("/schedules");
        } else {
          alert("Username / Password is incorrect");
          this.$refs.form.reset();
        }
      }
    },
  },
  mounted() {
    console.log("dd");
  },
};
</script>
