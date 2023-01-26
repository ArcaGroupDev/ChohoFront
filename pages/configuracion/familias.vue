<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="familys"
      :loading="loading"
      loading-text="Cargando... Espere un momento"
      class="elevation-1"
    >
      <!-- Banner Column -->
      <template v-slot:[`item.banner`]="{ item }">
        <v-chip :color="getColor(item.banner)" dark>
          {{ item.banner ? 'SI' : 'NO' }}
        </v-chip>
      </template>

      <!-- Actions Column -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
      </template>

      <!-- Template Table With Button Active -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion de familias</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red"
                dark
                class="d-none mb-2"
                v-bind="attrs"
                v-on="on"
                title="Añadir"
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>

    <!-- Dialog View  -->
    <v-dialog
      v-model="dialogView"
      :max-width="dataModelView.banner ? '800' : '400'"
    >
      <v-card>
        <v-card-title class="d-flex justify-center"> Ver </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="dataModelView.nombre"
                  dense
                  outlined
                  color="black"
                  label="Nombre"
                  :disabled="diabledFields"
                ></v-text-field>
                <v-file-input
                  v-if="!diabledFields"
                  :clearable="false"
                  label="Banner"
                  outlined
                  dense
                  accept="image/*"
                  @change="convertBannerToBase64($event, dataModelView, false)"
                ></v-file-input>
                <v-img
                  v-if="dataModelView.banner"
                  :src="dataModelView.banner"
                ></v-img>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog Update -->
    <v-dialog v-model="dialogUpdate" max-width="400" persistent>
      <v-card>
        <v-card-title class="d-flex justify-center"> Actualizar </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="dataModelUpdate.nombre"
                  dense
                  outlined
                  color="black"
                  label="Nombre"
                ></v-text-field>
                <v-file-input
                  :clearable="false"
                  label="Banner"
                  outlined
                  dense
                  persistent-hint
                  accept="image/*"
                  @change="convertBannerToBase64($event, dataModelUpdate, true)"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogUpdate = false">
            Cancelar
          </v-btn>
          <v-btn color="black darken-1" text @click="updateFamilyRemote()">
            Actualizar
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
    diabledFields: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      {
        text: 'Codigo',
        align: 'start',
        sortable: false,
        value: 'codigo',
      },
      {
        text: 'Banner',
        align: 'start',
        sortable: false,
        value: 'banner',
      },
      {
        text: 'Actions',
        align: 'start',
        sortable: false,
        value: 'actions',
      },
    ],
    familys: [],
    loading: true,
    dataModelView: {
      nombre: '',
      banner: '',
      codigo: '',
      id: '',
    },
    dataModelUpdate: {
      nombre: '',
      banner: '',
      codigo: '',
      id: '',
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getFamilysRemote()
  },

  methods: {
    getFamilysRemote() {
      API.getFamilys().then((response) => {
        this.familys = response.data.data
        this.loading = false
      })
    },
    updateFamilyRemote() {
      API.updateFamily(this.dataModelUpdate).then((response) => {
        this.getFamilysRemote()
        this.dialogUpdate = false
      })
    },
    editItem(item) {
      this.dialogUpdate = true
      this.dialogView = false
      this.diabledFields = false
      this.dataModelUpdate = item
      console.log('Edit => ', item)
    },
    viewItem(item) {
      this.dialogView = true
      this.dialogUpdate = false
      this.diabledFields = true
      this.dataModelView = item
      console.log('View => ', item)
    },
    convertBannerToBase64(file, item, update) {
      const reader = new FileReader()
      let bannerBase64 = ''
      const me = this
      reader.onloadend = function () {
        bannerBase64 = reader.result
        if (update) {
          me.dataModelUpdate.banner = bannerBase64
        } else {
          me.dataModelView.banner = bannerBase64
        }
        console.log('RESULT', reader.result)
      }
      reader.readAsDataURL(file)
    },
    getColor(banner) {
      if (banner) return 'green'
      else return 'red'
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>