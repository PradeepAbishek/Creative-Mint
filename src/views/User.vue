<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="user._id"
      routeName="users"
      module="User"
      v-if="deleteDialog"
      v-on:refreshData="refreshUser"
    ></delete-confirmation>
    <transition name="fade">
      <v-card v-if="showCard" class="transition">
        <v-form ref="form" class="pa4" @submit.prevent="">
          <v-row>
            <v-col cols="12" md="12" sm="12" lg="4">
              <v-text-field
                v-model="user.userName"
                color="success"
                label="User Name"
                :rules="mandatoryRule"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" lg="4" v-if="create">
              <v-text-field
                :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passIcon ? 'text' : 'password'"
                @click:append="passIcon = !passIcon"
                v-model="user.password"
                label="Password"
                required
                :rules="mandatoryRule"
                color="success"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" lg="4">
              <v-switch
                v-model="isAdmin"
                inset
                label="Is Admin ?"
                :disabled="isMasterAdmin"
                hint="Master Admin must have Admin Access"
                :persistent-hint="isMasterAdmin"
              ></v-switch>
            </v-col>
            <v-col cols="12" md="12" sm="12" lg="4">
              <v-switch
                v-model="isMasterAdmin"
                inset
                label="Is Master Admin ?"
                @change="setAdmin"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="error" text dark @click="hideCard">
              <v-icon class="mr-2">mdi-chevron-left</v-icon>
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" text dark @click="createUser" v-if="create">
              <v-icon class="mr-2">mdi-plus-box</v-icon>
              Create User
            </v-btn>
            <v-btn color="success" text dark @click="updateUser" v-else>
              <v-icon class="mr-2">mdi-update</v-icon>
              Update User
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </transition>
    <v-card>
      <v-card-text>
        <div class="flex items-center justify-between">
          <div class="w-80">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              color="success"
              label="Search"
              clearable
            ></v-text-field>
          </div>
          <div v-if="showCard == false">
            <v-btn color="success" text dark @click="showCreate">
              <v-icon class="mr-2">mdi-new-box</v-icon>
              User
            </v-btn>
          </div>
        </div>
        <v-data-table :headers="userHeaders" :items="usersData" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item)" color="success">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteUser(item)" color="error">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
export default {
  name: "User",
  components: {
    DeleteConfirmation: () => import("@/components/DeleteConfirmation"),
  },
  data: () => ({
    passIcon: false,
    mandatoryRule: [(v) => !!v || "* Mandatory Field"],
    showCard: false,
    create: true,
    isAdmin: false,
    isMasterAdmin: false,
    user: {
      userName: "",
      password: "",
    },
    search: "",
    userHeaders: [
      {
        text: "User Name",
        value: "userName",
        sortable: false,
      },
      {
        text: "Is Admin?",
        value: "isAdmin",
        sortable: false,
      },
      {
        text: "Is Master Admin?",
        value: "isMasterAdmin",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    usersData: [],
  }),
  methods: {
    showCreate() {
      this.user = Object.assign({});
      this.isAdmin = false;
      this.isMasterAdmin = false;
      this.showCard = true;
      this.create = true;
    },
    hideCard() {
      this.showCard = false;
    },
    editUser(user) {
      this.user = Object.assign({}, user);
      this.isAdmin = this.user.isAdmin;
      this.isMasterAdmin = this.user.isMasterAdmin;
      this.showCard = true;
      this.create = false;
    },
    createUser() {
      this.user.isAdmin = this.isAdmin;
      this.user.isMasterAdmin = this.isMasterAdmin;
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .post("/users/", this.user)
          .then((res) => {
            this.hideCard();
            this.$store.commit("successSnackbar", "User Created Successfully");
            this.refreshUser();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    updateUser() {
      var t = this.$refs.form.validate();
      if (t) {
        this.user.isAdmin = this.isAdmin;
        this.user.isMasterAdmin = this.isMasterAdmin;
        this.$axios
          .put("/users/" + this.user._id, this.user)
          .then((res) => {
            this.hideCard();
            this.$store.commit("successSnackbar", "User Updated Successfully");
            this.refreshUser();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    deleteUser(user) {
      this.showCard = false;
      this.user = Object.assign({}, user);
      this.$store.commit("updateDeleteDialog", true);
    },
    refreshUser() {
      this.$axios
        .get("/users/")
        .then((res) => {
          this.usersData = res.data;
          this.usersData = this.usersData.filter((user) => {
            return user.userName !== this.$cookies.get("marsData").userName;
          });
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    setAdmin() {
      if (this.isMasterAdmin) {
        this.isAdmin = true;
      }
    },
  },
  computed: {
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  mounted() {
    this.refreshUser();
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
