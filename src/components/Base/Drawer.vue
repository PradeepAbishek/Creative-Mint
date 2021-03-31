<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    src="../../assets/img/drawer.jpg"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" contain>
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>MINT UI</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list dense nav>
      <v-list-item-group color="success">
        <v-list-item
          v-for="(item, i) in drawerItems"
          :key="i"
          :to="item.to"
          active-class="success white--text"
        >
          <div class="flex">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, Store } from "vuex";

export default {
  name: "Drawer",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    drawerItems() {
      if (this.$store.state.masterAdminUser) {
        return this.$store.state.drawerItems;
      } else if (this.$store.state.adminUser) {
        var data = this.$store.state.drawerItems.filter((item) => {
          if (item.isAdmin === "false" || item.isAdmin === "true") {
            return item;
          }
        });
        return data;
      } else {
        var data = this.$store.state.drawerItems.filter((item) => {
          if (item.isAdmin === "false") {
            return item;
          }
        });
        return data;
      }
    },
  },
};
</script>
