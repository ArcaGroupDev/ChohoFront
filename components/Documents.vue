<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" dark class="mb-2" @click="dialog = true">
          Añadir
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(file, i) in localFiles" :key="i" cols="12" md="6" sm="12">
        <span
          ><a :href="file.s3urlpresigned" target="_blank">{{
            file.nombre
          }}</a></span
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="pb-10">Documentos</v-card-title>
        <v-card-text>
          <v-row class="ma-5">
            <v-col
              v-for="(item, i) in itemFiles"
              :key="i"
              cols="12"
              md="6"
              sm="12"
            >
              <v-file-input
                :clearable="false"
                show-size
                :ref="item.codigo"
                :id="item.codigo"
                :label="item.nombre"
                outlined
                dense
                :hint="getHintByFile(item)"
                persistent-hint
                accept="image/*,.pdf,.doc,.docx"
                @change="getFileObject($event, item)"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveFiles()">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['documentos', 'new', 'update', 'create'],
  data() {
    return {
      dialog: false,
      file: new File([''], 'xxxxx.docx'),

      files: [],
      itemFiles: [],
      formData: {},
      formDataBinary: new FormData(),
    }
  },
  computed: {
    localFiles: {
      get() {
        return this.documentos
      },
      set(val) {
        this.$emit('update:documentos', val)
      },
    },
  },
  created() {
    this.localFiles = []

    console.log(this.documentos)
    if (this.update) {
      if (this.documentos?.length > 0) {
        this.localFiles = this.documentos
      }
    }
    console.log(this.localFiles)
    this.getListDocumentsType()
  },
  methods: {
    getHintByFile(data) {
      let hint = ''
      if (this.localFiles.length > 0) {
        hint = this.localFiles?.filter(
          (item) => item.nombre.split('.')[0] === data.codigo
        )
      }
      return hint.length > 0
        ? 'Ya existe este archivo, clic para actualizarlo'
        : ''
    },

    async getFileObject(file, item) {
      this.localFiles = await file
      this.formDataBinary.delete('' + item.codigo)
      if (file) {
        this.formDataBinary.append('' + item.codigo, file)
      }
      console.log(file)
      console.log(this.formData)
    },

    getListDocumentsType() {
      this.$axios
        .get('/lista_tipos_documentos/all')
        .then((response) => {
          this.itemFiles = response?.data?.data
        })
        .catch((e) => {
          console.log(e)
        })
    },

    saveFiles() {
      console.log(this.file)
      this.formDataBinary.delete('data')
      this.formDataBinary.delete('client_id')
      this.formDataBinary.append('data', JSON.stringify(this.itemFiles))
      this.formDataBinary.append('client_id', this.$route.params.id)
      this.$axios.setHeader('Content-Type', 'multipart/form-data')
      this.$axios
        .post('/documentos/save', this.formDataBinary)
        .then((response) => {
          console.log(response?.data?.data)
          //   this.snackbarText = response?.data?.msg
          //   this.snackbarColor = 'success'
        })
        .catch((e) => {
          //   this.snackbarText = e.response?.data?.msg
          //   this.snackbarColor = 'error'
        })
        .finally(() => {
          this.dialog = false
          //   this.snackbar = true
        })
    },
  },
}
</script>