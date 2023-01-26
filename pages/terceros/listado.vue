<template>
  <div>
    <v-container>
      <div class="pa-0 title d-flex flex-wrap mb-5 justify-center">
        <p class="d-flex text-md-h5 text-overline justify-center">
          LISTADO DE TERCEROS
        </p>
      </div>
      <div>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              title="Crear Nuevo"
              to="/terceros/new"
            >
              Añadir
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-data-table
        :headers="headers"
        :items="clients"
        hide-default-footer
        :loading="loading"
        loading-text="Cargando... Espere un momento"
        class="elevation-1"
        :items-per-page="-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="d-flex text-h5 justify-center"
            >Estas seguro de realizar esta accion?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDelete = !dialogDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="removeItem()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import localForage from '@/services/localForage.js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Tipo ID',
          align: 'start',
          sortable: false,
          value: 'tipo_documento.nombre',
        },
        {
          text: 'Identificacion',
          align: 'start',
          sortable: false,
          value: 'identificacion',
        },
        {
          text: 'Nombres',
          align: 'start',
          sortable: false,
          value: 'nombres',
        },
        {
          text: 'Apellidos',
          align: 'start',
          sortable: false,
          value: 'apellidos',
        },
        {
          text: 'Creado',
          align: 'start',
          sortable: false,
          value: 'fecha_creacion',
        },
        {
          text: 'Estado',
          align: 'start',
          sortable: false,
          value: 'estado',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
      loading: true,
      dialogDelete: false,
      row: {
        id: null,
      },
    }
  },
  // computed: {
  //   networkStatus() {
  //     return this.isOnline ? 'My network is fine' : 'I am offline'
  //   },
  // },
  created() {
    // console.log(this)
    // console.log(this.isOffline)
    // if (this.isOffline) {
    //   this.getDataOffline()
    // } else {
      this.getAllRows()
    // }
  },
  methods: {
    setDataOnline(data) {
      this.$offlineStorage.set('user', data)
      localForage.setData(data)
    },
    getDataOffline(data) {
      localForage.getData().then(
        (res) => {
          this.clients = res

        },
        (failure) => {
          this.clients = []
        }
      )
      this.loading = false
    },
    getAllRows() {
      const token = Cookies.get('wms_token')
      this.$axios.setToken(token, 'Bearer')
      this.$axios.get('/tercero/all').then((response) => {
        this.clients = response?.data?.data
        // this.setDataOnline(response?.data?.data)
        // this.getDataOffline(response?.data?.data)
        this.loading = false
      })
    },
    editItem(item) {
      this.$router.push(`/terceros/editar/${item.id}`)
    },

    deleteItem(item) {
      this.row = item
      this.dialogDelete = true
    },
    removeItem() {
      this.$axios.delete('/tercero/delete/' + this.row.id).then((response) => {
        // console.log(response?.data?.data)
        this.dialogDelete = false
        this.getAllRows()
      })
    },
  },
}
</script>