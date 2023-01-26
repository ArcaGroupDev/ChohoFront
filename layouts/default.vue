<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app clipped dark :mini-variant="miniVariant">
      <v-list shaped class="menu-list mt-5">
        <v-list-item class="pa-2 d-flex justify-center">
          <v-avatar color="red" class="pa-2" size="45">
            <span class="white--text text-h5">CH</span>
          </v-avatar>
        </v-list-item>
        <v-list-item v-if="!miniVariant" class="pa-2 d-flex justify-center align-center">
          <span>Choho Colombia</span>
        </v-list-item>

        <v-list-group
          v-for="(item, i) in modules"
          :key="i"
          active-class="red--text"
          mandatory
          :ripple="{ class: 'red--text' }"
          :prepend-icon="miniVariant ? item.icon : ''"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(subitem, j) in item.submodules"
            :key="j + 'sb'"
            @click="setRoute(subitem.to)"
            router
            exact
          >
            <v-list-item-action>
              <v-icon size="20">{{ subitem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title active-class="white--text" v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="menu-icon" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <!-- <v-icon v-bind="attrs" large color="white" v-on="on"
            >mdi-account
          </v-icon> -->
          <v-avatar v-bind="attrs" large v-on="on" class="pa-2" size="40">
            <v-icon v-bind="attrs" large color="white" v-on="on"> mdi-account </v-icon>
          </v-avatar>
        </template>
        <div class="menu-user">
          <p class="d-flex justify-center black--text pb-0 mb-5">
            <strong> Choho Colombia</strong>
          </p>
          <div class="d-flex justify-center">
            <v-btn color="black" depressed dark class="mr-2"
              ><v-icon dark>mdi-account</v-icon>
            </v-btn>
            <v-btn depressed color="red" dark @click="logout()"
              ><v-icon dark>mdi-location-exit</v-icon>
            </v-btn>
          </div>
        </div>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      modules: [
        {
          title: "CONFIGURACION",
          icon: "mdi-cog-outline",
          submodules: [
            {
              icon: "mdi-form-select",
              title: "Formularios",
              to: "/configuracion/formulario",
            },
            {
              icon: "mdi-account-group",
              title: "Familias",
              to: "/configuracion/familias",
            },
            {
              icon: "mdi-account-group",
              title: "Grupos",
              to: "/configuracion/grupos",
            },
            {
              icon: "mdi-account-cog",
              title: "Usuarios",
              to: "/configuracion/usuarios",
            },
          ],
        },
        {
          title: "CRM",
          icon: "mdi-human-greeting",
          submodules: [
            {
              icon: "mdi-account-cog",
              title: "Terceros",
              to: "/terceros/listado",
            },
          ],
        },
        {
          title: "SIGMA",
          icon: "mdi-alpha-s-circle-outline",
          submodules: [
            {
              icon: "mdi-account-cog",
              title: "Ver Productos",
              to: "/sigma/productos/listado",
            },
          ],
        },
        {
          title: "CATALOGO",
          icon: "mdi-clipboard-outline",
          submodules: [
            {
              icon: "mdi-notebook-check",
              title: "Ver Catalogo",
              to: "/catalogo/view",
            },
            {
              icon: "mdi-notebook-check",
              title: "Pedidos",
              to: "/catalogo/pedidos-cotizacion",
            },
            {
              icon: "mdi-notebook-check",
              title: "Cotizaciones",
              to: "/catalogo/cotizacion",
            },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    setRoute(route) {
      // console.log(route);
      window.location = route;
    },
    logout() {
      Cookies.remove("wms_token");
      window.location = "/login";
    },
    logout() {
      Cookies.remove("wms_token");
      window.location = "/login";
    },
  },
};
</script>
<style>
.menu-user {
  width: 250px;
  height: auto;
  padding: 20px 20px 10px 20px;
  background-color: white;
}
.menu-list .v-icon {
  color: red !important;
}
.menu-list .v-icon:hover {
  color: red !important;
}
.menu-list .v-icon:active {
  color: #f05c62 !important;
}
.menu-list-module:active {
  color: #f05c62 !important;
}
</style>
