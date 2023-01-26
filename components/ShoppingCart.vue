<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="pa-5 ma-4 mx-0 text-capitalize"
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <div class="d-flex">
          <v-row class="d-flex ml-2 mt-4">
            <v-col cols="12" sm="12" md="4">
              <v-select
                class="d-flex"
                id="selectTerceros"
                label="Clientes"
                item-text="nombres"
                outlined
                dense
                :items="terceros"
                return-object
                @change="selectTerceros"
              >
              </v-select>
              <p class="mt-2">
                Nombre : {{ this.terceroSelected.nombres }} <br />
                Apellido: {{ this.terceroSelected.apellidos }} <br />
                fecha : {{ this.terceroSelected.fecha_creacion }} <br />
                identificacion: {{ this.terceroSelected.identificacion }} <br />
                Razon Social : {{ this.terceroSelected.razon_social }}
              </p>
            </v-col>
          </v-row>

          <!--<v-card-text>
            <v-data-table
              dense
              :headers="headerTercero"
              :items="this.terceroSelected"
              hide-default-footer
              class="cart-shop"
              id="table"
            >
            </v-data-table>
          </v-card-text> -->
          <div class="d-flex justify-end mt-4 mr-4 overflow-y-auto">
            <v-card max-width="400">
              <v-data-table
                :headers="cabeceraResumen"
                :items="summaryOrder"
                hide-default-footer
                class="cart-shop"
                id="table"
              >
                <template v-slot:[`item.subtotal`]="{ item }">
                  {{
                    formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.subtotal), {
                      noSeparator: false,
                    })
                  }}
                </template>
                <template v-slot:[`item.iva`]="{ item }">
                  {{
                    formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.iva), {
                      noSeparator: false,
                    })
                  }}
                </template>
                <template v-slot:[`item.total`]="{ item }">
                  {{
                    formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.total), {
                      noSeparator: false,
                    })
                  }}
                </template>
              </v-data-table>
            </v-card>
          </div>
        </div>
        <v-card-title class="text-h5 d-flex justify-center mb-0">
          CARRITO DE COMPRAS
        </v-card-title>
        <v-card-text>
          <v-data-table
            dense
            :headers="headers"
            :items="list"
            hide-default-footer
            class="cart-shop"
            id="table"
          >
            <template v-slot:[`item.lista_precio`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(item.lista_precio, {
                  noSeparator: false,
                })
              }}
            </template>
            <template v-slot:[`item.units`]="props">
              <v-text-field
                :value="props.item.units"
                outlined
                dense
                type="number"
                class="input-cantidad"
                @input="updateShoppingCart($event, props)"
              >
              </v-text-field>
            </template>
            <template v-slot:[`item.sub`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.sub), {
                  noSeparator: false,
                })
              }}
            </template>
            <template v-slot:[`item.iva`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.iva), {
                  noSeparator: false,
                })
              }}
            </template>
            <template v-slot:[`item.total`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.total), {
                  noSeparator: false,
                })
              }}
            </template>
          </v-data-table>
        </v-card-text>
        <div class="d-flex justify-center">
          <download-excel :data="exportable" worksheet="My Worksheet" name="filename.xls">
            <v-btn
              outlined
              color="green"
              small
              class="ma-2 ml-0"
              title="enviar a sigma"
              @click="exportExcel()"
            >
              Exportar a excel
            </v-btn>
          </download-excel>
          <!--
          <v-btn
            outlined
            color="black"
            small
            class="ma-2 ml-0"
            title="enviar a sigma"
            @click="guardarPedido()"
          >
            Guardar Pedido
          </v-btn>-->
          <v-btn
            outlined
            color="black"
            small
            class="ma-2 ml-0"
            title="enviar a sigma"
            @click="guardarCotizacion()"
          >
            Guardar Cotizacion
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import API from "@/services/API.js";
import formatNumber from "format-number";
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import AddProducts from "./AddProducts.vue";
Vue.component("downloadExcel", JsonExcel);
export default {
  components: { AddProducts },
  props: ["data", "registroPedido"],
  data() {
    return {
      pedido: this.$session.get("shopping_cart"),
      historialPedidos: [],
      formatNumber: formatNumber,
      dialog: false,
      cabeceraResumen: [
        { text: "SUBTOTAL", value: "subtotal", align: "center", sortable: false },
        { text: "IVA", value: "iva", align: "center", sortable: false },
        { text: "TOTAL A PAGAR", value: "total", align: "center", sortable: false },
      ],
      headers: [
        // { text: 'CODIGO', width: '20%', align: 'start', sortable: false, value: 'id' },
        { text: "NOMBRE", width: "60%", value: "nombre", sortable: false },
        { text: "PRECIO", width: "10%", value: "lista_precio", sortable: false },
        { text: "UND", width: "10%", value: "units", sortable: false },
        { text: "SUBTOTAL", value: "sub", sortable: false },
        { text: "IVA", value: "iva", sortable: false },
        { text: "TOTAL", value: "total", sortable: false },
      ],
      headerTercero: [
        { text: "NOMBRE", value: "nombres" },
        { text: "APELLIDO", value: "apellidos" },
        { text: "FECHA", value: "fecha_creacion" },
        { text: "IDENTIFICACION", value: "identificacion" },
        { text: "Razon Social", value: "razon_social" },
      ],
      productos: [],
      exportable: [],
      updateCot: false,
      terceros: [],
      terceroSelected: [],
    };
  },
  computed: {
    list() {
      //console.log(this.$store.getters["getProducts"]);
      return this.$store.getters["getProducts"];
    },
    summaryOrder() {
      return this.$store.getters["getSummary"];
    },
  },

  created() {
    console.log("Hola desde carrito created");
    API.getAllClient().then((response) => {
      console.log(response);
      this.terceros = response.data.data;
      //this.terceros = [{ nombres: "Asesor1" }, { nombres: "Asesor 2" }];
    });
    this.$store.dispatch("updateProductsCatalogo", {
      shopProducts: this.$session.get("shopping_cart"),
    });
    /*Comentario*/ 
    this.pedido = this.$session.get("shopping_cart");
    console.log(this.pedido);
    if (this.pedido != undefined) {
      if (this.pedido.length > 0) {
        this.updateCot = true;
        this.pedido.forEach((element) => {
          //Calcular resumeOrden cuando viene de DetalleOrden
          this.updateShoppingCart(element.units, { item: element });
        });
      } else {
        this.limpiar();
      }
    }
  },
  updated() {
    console.log(this.updateCot);
  },

  methods: {
    openCarrito() {
      this.dialogCarrito = true;
    },
    updateShoppingCart(event, props) {
      console.log("Hola desde update shopping cart");
      this.pedido = this.$session.get("shopping_cart");
      console.log(this.pedido);
      console.log(props);
      this.pedido.forEach((element, i) => {
        if (props.item.codigo_sigma == element.codigo_sigma) {
          element.units = event;
          element.sub = event * element.lista_precio;
          element.iva = element.sub * 0.19;
          element.total = element.sub + element.iva;
        }
      });
      this.$session.set("shopping_cart", this.pedido);
      this.$store.dispatch("setProducts", {
        data: this.$session.get("shopping_cart"),
      });
      this.$store.dispatch("updateProductsCatalogo", {
        shopProducts: this.$session.get("shopping_cart"),
      });
      this.$store.dispatch("calculateSummary");
      return;
    },
    limpiarPedido() {
      console.log("Hola desde limpiar pedido");
    },
    guardarPedido() {
      let productos = this.$session.get("shopping_cart");
      if (productos.length > 0) {
        let date = new Date();
        //let detalleProducts;
        let orden = {
          hora: date.toLocaleTimeString(),
          fecha: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
          subtotal: this.summaryOrder[0].subtotal,
          iva: this.summaryOrder[0].iva,
          total: this.summaryOrder[0].total,
          prefix: "PED",
          products: productos,
        };
        API.saveOrden(orden).then((response) => {});
      } else {
        this.dialog = false;
      }
    },
    guardarCotizacion() {
      console.log("HOla desde guardar cotizacion"); //--
      console.log(this.updateCot);
      if (this.updateCot) {
        console.log("Entre a updateCot");//--
        this.updateCot = false;
        //window.location.href = "../cotizacion";
      } else {
        console.log("Entre por el else");//--
        let productos = this.$session.get("shopping_cart");
        if (productos.length > 0) {
          let date = new Date();
          let orden = {
            hora: date.toLocaleTimeString(),
            fecha: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
            subtotal: this.summaryOrder[0].subtotal,
            iva: this.summaryOrder[0].iva,
            total: this.summaryOrder[0].total,
            prefix: "COT",
            products: productos,
            terceroId: this.terceroSelected.id,
          };
          console.log(orden);
          API.saveOrden(orden).then((response) => {
            console.log(response);
            // if (response.data.success) {
            //   alert("Orden guardada con exito");
            //   /* CAMBIOS*/
            //   console.log("entreeee!!!!");
            //   this.pedido = this.$session.get("shopping_cart");
            //   console.log(this.pedido);
            //   this.limpiar();
            //   /* FIN_CAMBIOS */
            //   this.dialog = false;
            // } else {
            //   alert("Error al guardan la orden");
            // }
          });
        } else {
          this.dialog = false;
        }
      }
    },
    exportExcel() {
      this.exportable = [];
      let detalle = this.$session.get("shopping_cart");
      console.log(detalle);

      detalle.forEach((element) => {
        this.exportable.push({
          codigo: element.codigo_sigma,
          bodega: 1,
          cantidad: element.units,
          nombreProducto: element.nombre,
        });
      });
      console.log(this.exportable);
    },
    limpiar() {
      let dataProd = this.$session.get("subGroups");
      dataProd.forEach((sg, i) => {
        sg.productos.forEach((p, i) => {
          p.units = "";
        });
      });
      this.$session.set("subGroups", dataProd);
      console.log(this.pedido);
      this.pedido.forEach((element) => {
        element.units = "";
      });
      this.$store.dispatch("setProducts", {
        data: this.pedido,
      });
      this.$store.dispatch("updateProductsCatalogo", {
        shopProducts: this.pedido,
      });
      this.$session.set("shopping_cart", this.pedido);
    },
    selectTerceros(event) {
      console.log(event);
      this.terceroSelected = event;
    },
  },
};
</script>

<style>
#table .v-data-table-header {
  background: #7d7e7d; /* Old browsers */
  background: -moz-linear-gradient(top, #7d7e7d 0%, #0e0e0e 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #7d7e7d 0%,
    #0e0e0e 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #7d7e7d 0%,
    #0e0e0e 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7d7e7d', endColorstr='#0e0e0e',GradientType=0 ); /* IE6-9 */
}
.theme--light.cart-shop > .v-data-table__wrapper > table > thead > tr > th {
  color: rgba(255, 255, 255, 255);
}
#table .v-text-field > .v-input__control > .v-input__slot {
  cursor: text;
  min-height: 20px !important;
  font-size: 10px;
}
</style>
