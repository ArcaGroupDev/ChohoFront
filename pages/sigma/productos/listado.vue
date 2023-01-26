<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="12" md="5" sm="12">
            <v-text-field
              v-model="family"
              append-icon="mdi-magnify"
              label="Filtrar por cualquier columna"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataProducts"
        :loading="loading"
        loading-text="Cargando... Espere un momento"
        :search="family"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      family: '',
      snackbarText: '',
      loading: true,
      snackbarColor: '',
      snackbar: false,
      timeout: 3000,
      productos: [],
      existencias: [],
      dataProducts: [],
      headers: [
        {
          text: 'ID Producto',
          value: 'idproducto',
        },
        {
          text: 'Nombre producto',
          value: 'nombreproducto',
        },
        {
          text: 'Presentación',
          value: 'idunidad',
        },
        {
          text: 'Categoria',
          value: 'referencia',
        },
        {
          text: 'Familia',
          value: 'familia',
        },
        {
          text: 'Grupo',
          value: 'grupo',
        },
        {
          text: 'Sub grupo',
          value: 'subgrupo',
        },
        {
          text: 'Stock',
          value: 'disponible',
        },
        {
          text: 'Precio lista',
          value: 'lista1',
        },
      ],
    }
  },
  mounted() {
    const token = Cookies.get('wms_token')
    this.$axios.setToken(token, 'Bearer')
  },
  created() {
    this.getProductsSigma()
    // this.getStockSigma()
  },
  methods: {
    getProductsSigma() {
      this.$axios
        .get('/tercero/productos/sigma')
        .then((response) => {
          this.dataProducts = response?.data?.data.result
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          // this.getStockSigma()
        })
    },
    getStockSigma() {
      this.$axios
        .get('/tercero/exitencia/sigma')
        .then((response) => {
          this.existencias = response?.data?.data.detExistencia
          console.log(this.productos)
          console.log(this.existencias)
          let existencia_producto = ''
          this.productos.forEach((product, i) => {
            existencia_producto = this.existencias?.filter(
              (item) => item.idproducto === product.idproducto
            )
            console.log(existencia_producto)
            this.productos[i].existencias = existencia_producto[0]?.disponible
          })
          this.dataProducts = this.productos
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          console.log('EXITO!!!!')
        })
    },
  },
}
</script>