<template>
  <div>
    <v-data-table :headers="headers" :items="localValue" hide-default-footer class="elevation-0">
      <template v-slot:[`item.principal`]="{ item }">
        <v-chip :color="getColor(item.principal)" dark>
          {{ item.principal ? 'SI' : 'NO' }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" title="Añadir" @click="openDialogNew()">
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
                      <v-switch v-model="formData.principal" label="Direccion principal"></v-switch>
                    </v-col>
                    <v-col cols="12" md="6" sm="12" class="d-flex">
                      <v-text-field v-model="formData.direccion" outlined dense 
                        label="Direccion" :disabled="true"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12" class="d-flex">
                      <v-btn color="primary" @click="openMaps()">Ubicacion</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-select v-model="formData.pais" :items="countrys" item-text="nombre" item-value="id" outlined
                        dense label="Pais" return-object></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select v-model="formData.departamento" :items="departments" item-text="nombre" item-value="id"
                        outlined dense label="Departamento" return-object></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select v-model="formData.ciudad" :items="towns" item-text="nombre" item-value="id" outlined
                        dense label="Ciudad" return-object></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveDirection()">
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
      <template v-slot:[`item.actions`]="{ item, index }">
        <v-icon small class="mr-2" @click="editAddress(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item, index)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h5">Actualizar</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="direction">
              <v-row>
                <v-col cols="12">
                  <v-switch v-model="formData.principal" label="Direccion principal"></v-switch>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="d-flex">
                  <v-text-field v-model="formData.direccion" outlined dense label="Direccion"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="d-flex">
                  <v-btn color="primary">Ubicacion</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-select v-model="pais" :items="countrys" item-text="nombre" item-value="id" outlined dense
                    label="Pais" return-object></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="departamento" :items="departments" item-text="nombre" item-value="id"
                    outlined dense label="Departamento" return-object></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="ciudad" :items="towns" item-text="nombre" item-value="id" outlined dense
                    label="Ciudad" return-object></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateAddress()">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogMaps" max-width="600">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5">Mapa de google</span>
        </v-card-title>
        <v-card-text>
          <gmaps :address.sync="formData.direccion" :dialog.sync="dialogMaps" :ciudad.sync="formData.ciudad"
            :departamento.sync="formData.departamento" :pais.sync="formData.pais" :update="true">
          </gmaps>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Gmaps from '@/components/Gmaps.vue'
import Cookies from 'js-cookie'
export default {
  props: ['direccion', 'new', 'update'],
  components: {
    Gmaps,
  },
  data() {
    return {
      headers: [
        {
          text: 'Pais',
          align: 'start',
          sortable: false,
          value: 'pais.nombre',
        },
        {
          text: 'Ciudad',
          align: 'start',
          sortable: false,
          value: 'ciudad.nombre',
        },
        {
          text: 'Direccion',
          align: 'start',
          sortable: false,
          value: 'direccion',
        },
        {
          text: 'Principal',
          align: 'start',
          sortable: false,
          value: 'principal',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      addressMap: "",
      ciudad: "",
      departamento: "",
      pais: "",
      dialog: false,
      dialogDelete: false,
      dialogEdit: false,
      dialogMaps: false,
      snackbar: false,
      formData: {
        pais: {},
        departamento: {},
        ciudad: {},
      },
      countrys: [],
      departments: [],
      towns: [],
    }
  },
  computed: {
    localValue: {
      get() {
        return this.direccion
      },
      set(val) {
        this.$emit('update:direccion', val)
      },
    },
  },
  mounted() {
    const token = Cookies.get('wms_token')
    this.$axios.setToken(token, 'Bearer')
  },
  created() {
    this.localValue = []

    this.getCountry()
    this.getDepartments()
    this.getTowns()

    if (this.update) {
      if (this.direccion?.length > 0) {
        this.localValue = this.direccion
      }
    }
  },
  methods: {
    openMaps() {
      this.dialogMaps = true
    },
    openDialogNew() {
      this.dialog = true
      this.formData = {}
    },
    close() {
      this.dialog = false
      this.dialogSection = false
      this.dialogFields = false
    },
    saveDirection() {
      console.log(this.formData);
      this.localValue.push(this.formData)
      this.dialog = false
      // console.log(this.localValue)
      this.formData = {}
    },
    editAddress(item) {
      // console.log(item)
      this.formData = item
      this.dialogEdit = true
    },
    deleteItem(id, i) {
      this.localValue.splice(i, 1)
    },
    updateAddress() {
      this.localValue.forEach((item) => {
        if (this.formData.id == item.id) {
          item = this.formData
        }
      })
      // console.log(this.localValue)
      this.dialogEdit = false
      this.formData = {}
    },
    getCountry() {
      this.$axios.get('/pais/all').then((response) => {
        this.countrys = response?.data?.data
        // console.log(this.countrys)
      })
    },
    getDepartments() {
      this.$axios.get('/departamentos/all').then((response) => {
        this.departments = response?.data?.data
        // console.log(this.countrys)
      })
    },
    getTowns() {
      this.$axios.get('/ciudades/all').then((response) => {
        this.towns = response?.data?.data
        console.log(this.towns);
        // console.log(this.countrys)
      })
    },
    getColor(principal) {
      if (principal) return 'green'
      else return 'red'
    }
  },
}
</script>