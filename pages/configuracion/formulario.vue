<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Creacion de formularios</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            title="Añadir"
          >
            Nuevo
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Nuevo</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="forms" v-model="vForms">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.nombre"
                      outlined
                      label="Nombre formulario"
                    ></v-text-field>
                    <v-text-field
                      v-model="formData.ref"
                      outlined
                      label="Referencia"
                    ></v-text-field>
                    <v-select
                      v-model="formData.entidad"
                      :items="entities"
                      outlined
                      label="Entidad"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="submittingForm"
              @click="save"
            >
              Guardar
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
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-expansion-panels v-for="(form, i) in items" :key="i" class="mb-2">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          {{ form.nombre }}
          <template v-slot:actions>
            <v-icon color="info" @click="editForm()"> mdi-pencil </v-icon>
            <v-icon color="error" @click="removeForm()"> mdi-trash-can </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- <p class="subtitle-1"></p> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogSection" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-5"
                v-bind="attrs"
                v-on="on"
                title="Añadir"
              >
                Añadir seccion
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Añadir seccion</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="sections" v-model="vSection">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="formDataSection.nombre"
                          outlined
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveSection(form)">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div v-if="form.secciones.length > 0">
            <v-expansion-panels
              v-for="(section, i) in form.secciones"
              :key="i"
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  {{ section.nombre }}
                  <template v-slot:actions>
                    <v-icon color="info"> mdi-pencil </v-icon>
                    <v-icon color="error"> mdi-trash-can </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialogFields" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-5"
                        v-bind="attrs"
                        v-on="on"
                        title="Añadir"
                        @click="newField()"
                      >
                        Añadir Campo
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Añadir Campo</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-form ref="fields" v-model="vField">
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="formDataField.orden"
                                  outlined
                                  label="Orden"
                                  type="number"
                                ></v-text-field>
                                <v-text-field
                                  v-model="formDataField.columnas"
                                  outlined
                                  label="Columnas"
                                  type="number"
                                ></v-text-field>
                                <v-text-field
                                  v-model="formDataField.campo"
                                  outlined
                                  label="Campo"
                                ></v-text-field>
                                <v-text-field
                                  v-model="formDataField.label"
                                  outlined
                                  label="Label"
                                ></v-text-field>
                                <v-select
                                  v-model="formDataField.tipo"
                                  :items="fieldsType"
                                  item-text="tipo"
                                  item-value="id"
                                  outlined
                                  label="Tipo"
                                ></v-select>
                                <v-text-field
                                  v-if="
                                    formDataField.tipo === '4' ||
                                    formDataField.tipo.codigo === 'SF'
                                  "
                                  v-model="formDataField.opciones"
                                  outlined
                                  label="Opciones"
                                  :hint="
                                    !formDataField.multiselect
                                      ? 'Formato: Array de objetos JSON con las llaves [{nombre, id}]'
                                      : 'Formato: Escriba las opciones separadas por coma [xxx, xxx]'
                                  "
                                  persistent-hint
                                ></v-text-field>
                                <v-text-field
                                  v-if="
                                    formDataField.tipo === '4' ||
                                    formDataField.tipo.codigo === 'SF'
                                  "
                                  v-model="formDataField.url"
                                  outlined
                                  label="Url Datos"
                                ></v-text-field>
                                <v-checkbox
                                  v-if="
                                    formDataField.tipo === '4' ||
                                    formDataField.tipo.codigo === 'SF'
                                  "
                                  v-model="formDataField.multiselect"
                                  outlined
                                  label="¿Multiselect?"
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="formDataField.requerido"
                                  outlined
                                  label="¿Requerido?"
                                ></v-checkbox>
                                <v-text-field
                                  v-if="formDataField.requerido"
                                  v-model="formDataField.texto_validacion"
                                  label="Mensaje de error"
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancelar
                        </v-btn>
                        <v-btn
                          v-if="!updateField"
                          color="blue darken-1"
                          text
                          :disabled="submittingField"
                          @click="saveField(section)"
                        >
                          Guardar
                        </v-btn>
                        <v-btn
                          v-if="updateField"
                          color="blue darken-1"
                          text
                          :disabled="submittingField"
                          @click="updatedField()"
                        >
                          Actualizar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <div v-if="section.campos.length > 0">
                    <v-expansion-panels
                      v-for="(campo, i) in section.campos"
                      :key="i"
                      class="mb-2"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header disable-icon-rotate>
                          {{ campo.orden }}. {{ campo.label }}
                          <template v-slot:actions>
                            <v-icon color="info" @click="editField(campo)">
                              mdi-pencil
                            </v-icon>
                            <v-icon color="error"> mdi-trash-can </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <p>
                            Es Requerido:
                            {{ campo.requerido == '1' ? 'SI' : 'NO' }}
                          </p>
                          <p>Tipo de campo: {{ campo.tipo.tipo }}</p>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                  <div v-else>
                    <p class="subtitle-1 d-flex justify-center">
                      No hay campos que mostrar
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <div v-else>
            <p class="subtitle-1 d-flex justify-center">
              No hay secciones que mostrar
            </p>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      dialog: false,
      dialogSection: false,
      dialogFields: false,
      dialogDelete: false,
      vForms: false,
      vSection: false,
      vField: false,
      submittingForm: false,
      submittingSection: false,
      submittingField: false,
      updateField: false,
      updateSection: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      formData: {
        nombre: '',
        entidad: '',
        ref: '',
      },
      formDataSection: {
        nombre: '',
        formulario: '',
      },
      items: [],
      entities: [],
      fieldsType: ['TextField', 'EmailField', 'SelectField', 'NumberField'],
      formDataField: {
        formulario: '',
        campo: '',
        label: '',
        requerido: false,
        texto_validacion: '',
        tipo: '',
        opciones: [],
        columnas: '',
        multiselect: false,
        url: '',
      },
    }
  },
  computed: {
    forms() {
      return this.$store.getters['getForms']
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    const token = Cookies.get('wms_token')
    this.$axios.setToken(token, 'Bearer')
    this.getRows()
  },
  methods: {
    updateOptions(url, fieldId) {
      const me = this
      this.$axios
        .get(url)
        .then((response) => {
          this.formDataField.opciones = response.data.data
          this.formDataField.id = fieldId
          this.updatedField(false)
          this.updatedOptionsField()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    forceUpdateOptionField(url) {
      this.$axios
        .get(url)
        .then((response) => {
          
          this.formDataField.opciones = response.data.data
          this.formDataField.id = fieldId
          this.updatedField(false)
          this.updatedOptionsField()
        })
        .catch((e) => {
          console.log(e)
        })
      this.close()
    },
    updatedOptionsField() {
      this.$axios
        .post('/campo/options', data)
        .then((response) => {
          this.getRows()
          this.dialogFields = false
        })
        .catch((e) => {})
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.dialogSection = false
      this.dialogFields = false
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    editField(field) {
      if (field.multiselect == '1') {
        field.multiselect = true
      } else {
        field.multiselect = false
      }

      if (field.requerido == '1') {
        field.requerido = true
      } else {
        field.requerido = false
      }
      this.formDataField = field
      this.updateField = true
      this.dialogFields = true
      // console.log(this.formDataField)
    },
    updatedField(option = true) {
      
      if (!Array.isArray(this.formDataField.opciones)) {
        this.formDataField.opciones = JSON.parse(this.formDataField.opciones)
      }
      this.$axios
        .post('/campo/edit', this.formDataField)
        .then((response) => {
          this.clearFieldForm()
          this.getRows()
          this.dialogFields = false
        })
        .catch((e) => {})
      if (option) {
        this._updatedOptionField(this.formDataField.url.trim())
      }
    },
    _updatedOptionField(url) {
      
      const URL_API = url
      this.$axios
        .get(URL_API)
        .then((response) => {
          
          this.formDataField.opciones = response.data.data
          // this.formDataField.id = fieldId
          this.updatedField(false)
          this.updatedOptionsField()
        })
        .catch((e) => {})
    },
    newField() {
      this.clearFieldForm()
      this.updateField = false
    },
    editForm() {
      console.log('Editar')
    },

    removeForm() {
      console.log('Eliminar')
    },

    save() {
      this.submittingForm = this.$refs.forms[0].validate()
      if (this.submittingForm) {
        this.$axios
          .post('/formulario/store', this.formData)
          .then((response) => {
            this.getRows()
            this.dialog = false
          })
          .catch((e) => {})
        this.clearFields()
        this.close()
      }
    },

    saveSection(form) {
      this.submittingSection = this.$refs.sections[0].validate()
      if (this.submittingSection) {
        this.formDataSection.formulario = form.id
        this.$axios
          .post('/seccion/store', this.formDataSection)
          .then((response) => {
            this.getRows()
            this.dialogSection = false
          })
          .catch((e) => {})
        this.clearFields()
        this.close()
      }
    },

    saveField(section) {
      this.vField = this.$refs.fields[0].validate()
      if (this.vField) {
        this.formDataField.seccion = section.id
        if (this.formDataField.opciones.length > 0) {
          this.formDataField.opciones = JSON.parse(this.formDataField.opciones)
        }
        this.$axios
          .post('/campo/store', this.formDataField)
          .then((response) => {
            this.getRows()
            this.dialogFields = false
            if (this.formDataField.url.trim() !== '') {
              this.updateOptions(
                this.formDataField.url.trim(),
                this.formDataField.id
              )
            }
          })
          .catch((e) => {})
        this.clearFields()
        this.close()
      }
    },
    getRows() {
      this.$axios
        .get('/formulario/rows')
        .then((response) => {
          
          this.getEntities()
          this.getTypeFields()
          this.items = response.data.data
        })
        .catch((e) => {})
      this.clearFields()
      this.close()
    },
    async getEntities() {
      await this.$axios
        .get('/formulario/entitys')
        .then((response) => {
          this.entities = response.data.data
        })
        .catch((e) => {})
      this.clearFields()
      this.close()
    },
    async getTypeFields() {
      await this.$axios
        .get('/tipo/campo/all')
        .then((response) => {
          this.fieldsType = response.data.data
        })
        .catch((e) => {})
      this.clearFields()
      this.close()
    },
    clearFields() {
      this.formData = {
        nombre: '',
        ref: '',
      }
      this.formDataSection = {
        nombre: '',
        formulario: '',
      }
    },
    clearFieldForm() {
      this.formDataField = {
        formulario: '',
        campo: '',
        label: '',
        requerido: false,
        texto_validacion: '',
        tipo: '',
        opciones: [],
        columnas: '',
        multiselect: false,
        url: '',
      }
    },
  },
}
</script>