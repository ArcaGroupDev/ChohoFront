<template>
    <v-app dark>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item class="pa-2">
            <v-avatar color="red" class="pa-2" size="40">
              <span class="white--text text-h5">CH</span>
            </v-avatar>
            <v-list-item-title class="pa-2">Choho Colombia</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-breadcrumbs :items="breadcrumb">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
                {{ item.text.toUpperCase() }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
</template>
<script>
export default {
  data: () => ({
    breadcrumb: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
    clipped: true,
    drawer: false,
    fixed: true,
    items: [
      {
        icon: 'mdi-cog',
        title: 'Configurar Formularios',
        to: '/config-forms',
      },
      {
        icon: 'mdi-form-select',
        title: 'Formularios',
        to: '/forms',
      },
      {
        icon: 'mdi-form-select',
        title: 'Configurar campos',
        to: '/config-fields',
      },
      {
        icon: 'mdi-form-select',
        title: 'Formulario Cliente',
        to: '/clients',
      },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Vuetify.js',
  }),
}
</script>