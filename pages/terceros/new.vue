<template>
  <div>
    <div class="text-center align-center" v-if="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <div class="pa-0 title d-flex flex-wrap mb-5 justify-center">
        <p class="d-flex text-md-h5 text-overline justify-center">
          FORMULARIO DE REGISTRO DE CLIENTES
        </p>
      </div>

      <!-- PESTAÑAS Y ESTADO -->
      <!-- <div
        class="
          d-flex
          justify-md-space-between justify-center
          flex-md-nowrap flex-wrap
        "
      >
        <v-tabs class="mx-0 mb-15">
          <v-tab>Datos Generales</v-tab>
          <v-tab>Condiciones comerciales</v-tab>
          <v-tab>Documentos</v-tab>
        </v-tabs>
      </div> -->

      <!-- FORMULARIO -->
      <v-form
        :ref="form.referencia"
        v-model="vForm"
        lazy-validation
        draggable="true"
      >
        <v-row class="d-flex" v-for="(section, i) in form.secciones" :key="i">
          <v-col cols="12" v-if="section.nombre !== 'DOCUMENTOS'">
            <p class="title-md-1 text-caption">{{ section.nombre }}</p>
            <v-divider></v-divider>
          </v-col>
          <v-col
            v-for="(campo, i) in section.campos"
            :key="i"
            zcols="12"
            :md="campo.columnas ? campo.columnas : 5"
            sm="12"
          >
            <v-text-field
              v-if="campo.tipo.codigo == 'TX' || campo.tipo.codigo == 'NF'"
              v-model="formData[campo.campo]"
              :label="campo.label"
              :id="campo.campo"
              outlined
              dense
              :type="campo.tipo.codigo === 'NF' ? 'number' : 'text'"
              v-on:keyup="getTextField($event, campo.campo)"
              :rules="
                campo.requerido == '1' && campo.texto_validacion.trim() != ''
                  ? [(v) => !!v || campo.texto_validacion]
                  : []
              "
            ></v-text-field>
            <v-text-field
              v-if="campo.tipo.codigo == 'EM'"
              v-model="formData[campo.campo]"
              :id="campo.campo"
              type="email"
              outlined
              dense
              :label="campo.label"
              v-on:keyup="getTextField($event, campo.campo)"
              :rules="
                campo.requerido == '1' && campo.texto_validacion.trim() != ''
                  ? [
                      (v) => !!v || campo.texto_validacion,
                      (v) => /.+@.+\..+/.test(v) || 'Email invalido',
                    ]
                  : []
              "
            >
            </v-text-field>
            <v-select
              v-if="campo.tipo.codigo == 'SF' && campo.multiselect != '1'"
              :id="campo.campo"
              v-model="formData[campo.campo]"
              :items="JSON.parse(campo.opciones)"
              item-text="nombre"
              item-value="id"
              :multiple="campo.multiselect == '1' ? true : false"
              outlined
              dense
              :label="campo.label"
              :rules="
                campo.requerido == '1' && campo.texto_validacion.trim() != ''
                  ? [(v) => !!v || campo.texto_validacion]
                  : []
              "
              v-on:change="getSelect($event, campo.campo)"
              return-object
            ></v-select>
            <v-select
              v-if="campo.tipo.codigo == 'SF' && campo.multiselect == '1'"
              :id="campo.campo"
              v-model="formData[campo.campo]"
              :items="JSON.parse(campo.opciones)"
              :label="campo.label"
              outlined
              dense
              multiple
            ></v-select>
            <directions-table
              v-if="campo.tipo.codigo == 'GD'"
              :new="true"
              :direccion.sync="formData[campo.campo]"
            ></directions-table>
            <contacts-table
              v-if="campo.tipo.codigo == 'GC'"
              :new="true"
              :contacto.sync="formData[campo.campo]"
            ></contacts-table>
            <v-switch
              v-if="campo.tipo.codigo == 'SW'"
              v-model="formData[campo.campo]"
              inset
              :label="campo.label"
              class="mt-1"
            ></v-switch>
            <v-textarea
              v-if="campo.tipo.codigo == 'TA'"
              v-model="formData[campo.campo]"
              :label="campo.label"
              counter
              auto-grow
              outlined
            ></v-textarea>
            <!-- <documents
              v-if="campo.tipo.codigo == 'DC'"
              :new="true"
              :documentos.sync="formData[campo.campo]"
            ></documents> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-md-end justify-center ma-2">
            <v-btn to="/terceros/listado" class="ma-2" color="red" outlined>
              Atras
            </v-btn>
            <v-btn
              @click="saveClient()"
              class="ma-2"
              color="green"
              outlined
              :disabled="!vForm"
            >
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- SNACKBAR -->
      <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
import API from '@/services/API.js'
import DirectionsTable from '@/components/DirectionsTable.vue'
import ContactsTable from '@/components/ContactTable.vue'
export default {
  components: {
    DirectionsTable,
    ContactsTable,
  },
  data() {
    return {
      snackbarText: '',
      snackbarColor: '',
      snackbar: false,
      timeout: 3000,
      form: [],
      formData: {},
      loading: true,
      vForm: false,
    }
  },
  created() {
    this.getFormEntity()
  },
  methods: {
    saveClient() {
      const formValid = this.form.referencia
      this.vForm = this.$refs[formValid].validate()
      if (this.vForm) {
        console.log(this.formData);
        API.saveClient(this.formData)
          .then((response) => {
            this.snackbarText = response?.data?.msg
            this.snackbarColor = 'success'
            this.$router.push('/terceros/listado')
          })
          .catch((e) => {
            this.snackbarText = e.response?.data?.msg
            this.snackbarColor = 'error'
          })
          .finally(() => {
            this.snackbar = true
          })
      }
    },
    getTextField(event, column) {
      this.formData['' + column + ''] = event.target.value
    },
    getSelect(value, column) {
      this.formData['' + column + ''] = value
    },
    getFormEntity() {
      API.getFormEntity('Terceros')
        .then((response) => {
          this.form = response.data?.data[0]
          if (!this.form) {
              this.$router.go(-1)
          } else {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
        })
        .catch((e) => {})
    },
  },
}
</script>
