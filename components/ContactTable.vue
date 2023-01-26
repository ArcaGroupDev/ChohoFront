<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="localValue"
      hide-default-footer
      class="elevation-0"
    >
      <!-- Template Si es principal o no -->
      <template v-slot:[`item.principal`]="{ item }">
        <v-chip :color="getColor(item.principal)" dark>
          {{ item.principal ? 'SI' : 'NO' }}
        </v-chip>
      </template>

      <!-- Template de las acciones -->
      <template v-slot:[`item.actions`]="{ item, index }">
        <v-icon small class="mr-2" @click="editContact(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item, index)"> mdi-delete </v-icon>
      </template>

      <!-- Template de agregar contacto nuevo -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                title="Añadir"
                @click="openDialogNew()"
              >
                Añadir
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Nuevo</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-switch
                        v-model="formData.principal"
                        label="Representante legal o contacto principal"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="6" sm="12" class="d-flex">
                      <v-text-field
                        v-model="formData.fullname"
                        outlined
                        dense
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="12" class="d-flex">
                      <v-text-field
                        v-model="formData.cargo"
                        outlined
                        dense
                        label="Cargo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="12" class="d-flex">
                      <v-text-field
                        v-model="formData.movil"
                        outlined
                        dense
                        type="number"
                        label="Movil"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formData.telefono"
                        outlined
                        dense
                        label="Telefono"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formData.email"
                        outlined
                        dense
                        label="Correo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveContact()">
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text>Cancel</v-btn>
                <v-btn color="blue darken-1" text>OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>

    <!-- Ventana de actualizar contacto -->
    <v-dialog persistent v-model="dialogEdit" max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h5">Actualizar</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-switch
                  v-model="formData.principal"
                  label="Representante legal o contacto principal"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="d-flex">
                <v-text-field
                  v-model="formData.fullname"
                  outlined
                  dense
                  label="Nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="12" class="d-flex">
                <v-text-field
                  v-model="formData.cargo"
                  outlined
                  dense
                  label="Cargo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="12" class="d-flex">
                <v-text-field
                  v-model="formData.movil"
                  outlined
                  dense
                  type="number"
                  label="Movil"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.telefono"
                  outlined
                  dense
                  label="Telefono"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.email"
                  outlined
                  dense
                  label="Correo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click=";(dialogEdit = false), (formData = {})"
          >
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateContact()">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['contacto', 'new', 'update'],
  data() {
    return {
      headers: [
        {
          text: 'Nombres',
          align: 'start',
          sortable: false,
          value: 'fullname',
        },
        {
          text: 'Movil',
          align: 'start',
          sortable: false,
          value: 'movil',
        },
        {
          text: 'Email',
          align: 'start',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Principal',
          align: 'start',
          sortable: false,
          value: 'principal',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      formData: {},
    }
  },
  computed: {
    localValue: {
      get() {
        return this.contacto
      },
      set(val) {
        this.$emit('update:contacto', val)
      },
    },
  },
  created() {
    // console.log(this.contacto?.length)
    this.localValue = []

    if (this.update) {
      if (this.contacto?.length > 0) {
        this.localValue = this.contacto
      }
    }
  },
  methods: {
    openDialogNew() {
      this.dialog = true
      this.formData = {}
    },
    close() {
      this.dialog = false
      this.dialogSection = false
      this.dialogFields = false
    },
    saveContact() {
      this.localValue.push(this.formData)
      this.dialog = false
      this.formData = {}
      //   console.log(this.localValue)
    },
    editContact(item) {
      // console.log(item)
      this.formData = item
      this.dialogEdit = true
    },
    deleteItem(id, i) {
      this.localValue.splice(i, 1)
    },
    updateContact() {
      this.localValue.forEach((item) => {
        if (this.formData.id == item.id) {
          item = this.formData
        }
      })
      // console.log(this.localValue)
      this.dialogEdit = false
      this.formData = {}
    },
    getColor(principal) {
      if (principal) return 'green'
      else return 'red'
    },
  },
}
</script>