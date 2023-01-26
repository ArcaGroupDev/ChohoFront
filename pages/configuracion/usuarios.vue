<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      loading-text="Cargando... Espere un momento"
      class="elevation-1"
    >
      <!-- Actions Column -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="viewItem(item)" title="Ver usuario">
          mdi-eye
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          title="Actualizar usuario"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="resetPass(item)"
          title="Resetear contraseña"
        >
          mdi-account-key
        </v-icon>
      </template>

      <!-- Template Table With Button Active -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion de usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="black"
            dark
            class="mb-2"
            title="Añadir"
            small
            @click="dialogCreate = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <!-- Dialog View  -->
    <v-dialog v-model="dialogView" max-width="500">
      <v-card>
        <v-card-title class="d-flex justify-center"> Ver </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="dataModelView.nombres"
                  dense
                  outlined
                  color="black"
                  label="Nombres"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="dataModelView.apellidos"
                  dense
                  outlined
                  color="black"
                  label="Apellidos"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dataModelView.email"
                  dense
                  outlined
                  color="black"
                  label="Correo"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog Update -->
    <v-dialog v-model="dialogUpdate" max-width="600" persistent>
      <v-card>
        <v-card-title class="d-flex justify-center"> Actualizar </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="nombres"
                  dense
                  outlined
                  color="black"
                  label="Nombres"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="apellidos"
                  dense
                  outlined
                  color="black"
                  label="Apellidos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="email"
                  dense
                  outlined
                  color="black"
                  label="Correo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  v-model="roles"
                  :items="rolesList"
                  label="Roles"
                  outlined
                  return-object
                  dense
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogUpdate = false">
            Cancelar
          </v-btn>
          <v-btn color="black darken-1" text @click="updateUserRemote()">
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Create -->
    <v-dialog v-model="dialogCreate" max-width="600" persistent>
      <v-card>
        <v-card-title class="d-flex justify-center"> Crear </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="nombres"
                  dense
                  outlined
                  color="black"
                  label="Nombres"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="apellidos"
                  dense
                  outlined
                  color="black"
                  label="Apellidos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="email"
                  dense
                  outlined
                  color="black"
                  label="Correo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  v-model="roles"
                  :items="rolesList"
                  item-text="name"
                  item-value="value"
                  label="Roles"
                  outlined
                  return-object
                  dense
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogCreate = false">
            Cancelar
          </v-btn>
          <v-btn color="black darken-1" text @click="createUserRemote()">
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import API from '@/services/API.js'
export default {
  data: () => ({
    dialog: false,
    dialogView: false,
    dialogUpdate: false,
    dialogCreate: false,
    diabledFields: false,
    dialogDelete: false,
    headers: [
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
        text: 'Correo',
        align: 'start',
        sortable: false,
        value: 'email',
      },
      {
        text: 'Creado',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      {
        text: 'Actualizado',
        align: 'start',
        sortable: false,
        value: 'updated_at',
      },
      {
        text: 'Actions',
        align: 'start',
        sortable: false,
        value: 'actions',
      },
    ],
    users: [],
    loading: true,
    nombres: '',
    apellidos: '',
    email: '',
    id: '',
    roles: [],
    dataModelView: {
      nombres: '',
      apellidos: '',
      email: '',
      id: '',
      roles: [],
    },
    dataModelUpdate: {
      nombres: '',
      apellidos: '',
      email: '',
      id: '',
      roles: [],
    },
    dataModel: {
      nombres: '',
      apellidos: '',
      email: '',
      roles: [],
    },
    rolesList: ['ROLE_ADMIN', 'ROLE_USER'],
  }),

  created() {
    this.getUsersRemote()
  },

  methods: {
    getUsersRemote() {
      this.loading = true
      API.getUsers().then((response) => {
        this.users = response.data.data
        this.loading = false
      })
    },
    updateUserRemote() {
      if (this.dataModelUpdate.roles === '[]') {
        this.dataModelUpdate.roles = []
      }
      this.dataModelUpdate.nombres = this.nombres
      this.dataModelUpdate.apellidos = this.apellidos
      this.dataModelUpdate.email = this.email
      this.dataModelUpdate.roles = this.roles
      this.dataModelUpdate.id = this.id

      API.updateUser(this.dataModelUpdate).then((response) => {
        this.getUsersRemote()
        this.dialogUpdate = false
      })
    },
    createUserRemote() {
      console.log(this.dataModel)
      if (this.dataModel.roles === '[]') {
        this.dataModel.roles = []
      }
      this.dataModel.nombres = this.nombres
      this.dataModel.apellidos = this.apellidos
      this.dataModel.email = this.email
      this.dataModel.roles = this.roles

      API.saveUser(this.dataModel).then((response) => {
        this.getUsersRemote()
        this.dialogCreate = false
      })
    },
    editItem(item) {
      this.dialogUpdate = true
      this.dialogView = false
      this.diabledFields = false
      this.nombres = item.nombres
      this.apellidos = item.apellidos
      this.email = item.email
      this.roles = item.roles
      this.id = item.id
    },
    viewItem(item) {
      this.dialogView = true
      this.dialogUpdate = false
      this.diabledFields = true
      this.dataModelView = item
    },
    resetPass(item) {
      API.resetPassword(item)
        .then((response) => {
          console.log('Reset password succesfully!')
        })
        .catch((e) => {
          console.log('Error to reset password')
        })
    },
  },
}
</script>