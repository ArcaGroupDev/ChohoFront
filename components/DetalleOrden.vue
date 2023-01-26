<template>
  <div v-click-outside="onClickOutside">
    <v-card>
      <div class="d-flex justify-end">
        <v-card max-width="400">
          <v-data-table
            :headers="cabeceraResumen"
            :items="ordenResume"
            hide-default-footer
            class="cart-shop"
            id="table-orden"
          >
            <template v-slot:[`item.subtotal`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.subtotal), {
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
            <template v-slot:[`item.iva`]="{ item }">
              {{
                formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.iva), {
                  noSeparator: false,
                })
              }}
            </template>
          </v-data-table>
        </v-card>
      </div>
      <v-card-title class="text-h5 d-flex justify-center mb-0">
        Detalle Orden
      </v-card-title>
      <v-card-text v-if="this.updatedOrden == false">
        <v-data-table
          dense
          :headers="headers"
          :items="ordenDetail"
          hide-default-footer
          class="cart-shop"
          id="table-orden"
          :items-per-page="-1"
        >
          <template v-slot:[`item.precio_unitario`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(
                Math.trunc(item.precio_unitario),
                {
                  noSeparator: false,
                }
              )
            }}
          </template>
          <template v-slot:[`item.subtotal`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.subtotal), {
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
          <template v-slot:[`item.iva`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.iva), {
                noSeparator: false,
              })
            }}
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-text v-else-if="this.updatedOrden == true">
        <v-data-table
          dense
          :headers="editableHeaders"
          :items="ordenDetail"
          hide-default-footer
          class="cart-shop overflow-y-auto"
          id="table-orden"
          :items-per-page="-1"
        >
          <template v-slot:[`item.cantidad`]="props">
            <v-text-field
              :value="props.item.cantidad"
              outlined
              dense
              type="number"
              class="input-cantidad mt-30"
              @input="updateOrdenDetail($event, props)"
            >
            </v-text-field>
          </template>
          <template v-slot:[`item.precio_unitario`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(
                Math.trunc(item.precio_unitario),
                {
                  noSeparator: false,
                }
              )
            }}
          </template>
          <template v-slot:[`item.subtotal`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.subtotal), {
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
          <template v-slot:[`item.iva`]="{ item }">
            {{
              formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.iva), {
                noSeparator: false,
              })
            }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn @click="deleteProduct(item)" outlined color="red" small>
              <v-icon small> mdi-trash-can-outline </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="d-flex justify-center mt-5">
          <v-btn @click="addProduct()" outlined small>
            ADD <v-icon small> mdi-plus </v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <!--<v-dialog v-model="formData.dialogAddProduct" max-width="1000">
      <v-card>
        <v-card-text>
          <AddProducts
            :addProducts.sync="formData.addProducts"
            :dialogAddProduct.sync="formData.dialogAddProduct"
            :ordenDetail.sync="ordenDetail"
          >
          </AddProducts>
        </v-card-text>
      </v-card>
    </v-dialog>-->
    <div class="d-flex justify-center" v-if="prefijo.substring(0, 3) === 'PED'">
      <download-excel
        :data="exportable"
        worksheet="My Worksheet"
        :name="prefijo + '.xls'"
      >
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
    </div>
    <div class="d-flex justify-center" v-else-if="prefijo.substring(0, 3) === 'COT'">
      <download-excel
        :data="exportable"
        worksheet="My Worksheet"
        :name="prefijo + '.xls'"
      >
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
      <v-btn
        v-if="this.updatedOrden == false"
        outlined
        color="black"
        small
        class="ma-2 ml-0"
        title="enviar a sigma"
        @click="enableUpdate()"
      >
        Modificar
      </v-btn>
      <v-btn
        v-if="this.updatedOrden == true"
        outlined
        color="black"
        small
        class="ma-2 ml-0"
        title="enviar a sigma"
        @click="saveChangesOrden()"
      >
        Guardar cambios
      </v-btn>
    </div>
    <div class="d-flex justify-center" v-else>
      <download-excel
        :data="exportable"
        worksheet="My Worksheet"
        :name="prefijo + '.xls'"
      >
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
      <v-btn
        outlined
        color="black"
        small
        class="ma-2 ml-0"
        title="enviar a sigma"
        @click="saveChangesOrden()"
      >
        Guardar Cambios
      </v-btn>
    </div>
  </div>
</template>

<script>
import API from "@/services/API.js";
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import vClickOutside from "v-click-outside";
//import AddProducts from "@/components/AddProducts.vue";
Vue.use(vClickOutside);
Vue.component("downloadExcel", JsonExcel);
import formatNumber from "format-number";
export default {
  props: ["ordenDetail", "ordenGeneral", "ordenResume", "prefijo", "idOrden"],
  data() {
    return {
      dialog: false,
      cabeceraResumen: [
        { text: "SUBTOTAL", value: "subtotal", align: "center", sortable: false },
        { text: "IVA", value: "iva", align: "center", sortable: false },
        { text: "TOTAL A PAGAR", value: "total", align: "center", sortable: false },
      ],
      headers: [
        { text: "NOMBRE", width: "60%", value: "nombre", sortable: false },
        { text: "PRECIO", width: "10%", value: "precio_unitario", sortable: false },
        { text: "UND", width: "10%", value: "cantidad", sortable: false },
        { text: "SUBTOTAL", value: "subtotal", sortable: false },
        { text: "IVA", value: "iva", sortable: false },
        { text: "TOTAL", value: "total", sortable: false },
      ],
      editableHeaders: [
        { text: "NOMBRE", width: "60%", value: "nombre", sortable: false },
        { text: "PRECIO", width: "10%", value: "precio_unitario", sortable: false },
        { text: "UND", width: "10%", value: "cantidad", sortable: false },
        { text: "SUBTOTAL", value: "subtotal", sortable: false },
        { text: "IVA", value: "iva", sortable: false },
        { text: "TOTAL", value: "total", sortable: false },
        { text: "Eliminar", value: "action", sortable: false },
      ],
      exportable: [],
      updatedOrden: false,
      validacionOrden: [],
      formatNumber: formatNumber,
      formData: {
        addProducts: {},
        dialogAddProduct: {},
      },
      eliminarProducto: false,
      //idOrden: null,
      pruebaDetalle: [],
    };
  },
  computed: {
    refrescar() {
      let sub = 0;
      let iva = 0;
      let tot = 0;
      let modificacionProducts = [];
      console.log("Hola desde computed");
      if (this.formData.addProducts.length > 0) {
        this.formData.addProducts.forEach((element) => {
          modificacionProducts.push({
            nombre: element.nombre,
            producto_id: element.id,
            precio_unitario: element.lista_precio,
            cantidad: element.units,
            subtotal: element.lista_precio * element.units,
            iva: element.lista_precio * element.units * 0.19,
            total:
              element.lista_precio * element.units * 0.19 +
              element.lista_precio * element.units,
          });
        });
        this.ordenDetail.forEach((element) => {
          sub = sub + Number(element.subtotal);
          iva = iva + Number(element.iva);
          tot = tot + Number(element.total);
          console.log("Entre!!!");
        });
        this.ordenResume[0].subtotal = sub;
        this.ordenResume[0].iva = iva;
        this.ordenResume[0].total = tot;
        this.ordenDetail = [];
        this.ordenDetail = modificacionProducts;
        console.log(this.ordenResume);
      }
    },
    /*renderizarDetalleOrden() {
      API.findDetailOrden({ ordenId: 313 }).then((detalleInDB) => {
        console.log(detalleInDB);
        this.ordenDetail = detalleInDB.data.data; //Warning avoid mutating
      });
    },*/
    localValueUpdateDetail: {
      get() {
        return this.ordenDetail;
      },
      set(val) {
        this.$emit("update:ordenDetail", val);
      },
    },
    localValueUpdateResumeDetail: {
      get() {
        return this.ordenResume;
      },
      set(val) {
        this.$emit("update:ordenResume", val);
      },
    },
    localValueUpdateOrdenGeneral: {
      get() {
        return this.ordenGeneral;
      },
      set(val) {
        this.$emit("update:ordenGeneral", val);
      },
    },
  },
  beforeUpdate() {
    this.validacionOrden = this.ordenResume;
  },

  updated() {
    console.log("Hola desde updated");
    if (this.actualizarOrdenResumen) {
      console.log("ENtreee");
      this.actualizarOrdenResumen = false;
      this.pedido.forEach((element) => {
        this.updateOrdenDetail(element.units, { item: element });
      });
    }
  },
  created() {
    this.pedido = this.$session.get("shopping_cart");
    if (this.pedido != undefined) {
      if (this.pedido.length > 0) {
        this.actualizarOrdenResumen = true;
        this.enableUpdate();
      }
    }
  },
  methods: {
    updateOrdenDetail(event, props) {
      this.updatedOrden = true;
      let totalOrdenResumen = 0;
      let subOrdenResumen = 0;
      let ivaOrdenResumen = 0;
      //Mostrar el cambio en el frontend
      props.item.cantidad = event;
      props.item.subtotal = props.item.cantidad * props.item.precio_unitario;
      props.item.iva = props.item.subtotal * 0.19;
      props.item.total = props.item.iva + props.item.subtotal;
      if (this.eliminarProducto == true) {
        this.eliminarProducto = false;
        console.log("Entree");
        console.log(this.pruebaDetalle);
        this.pruebaDetalle.forEach((element) => {
          totalOrdenResumen = totalOrdenResumen + Number(element.total);
          subOrdenResumen = subOrdenResumen + Number(element.subtotal);
          ivaOrdenResumen = ivaOrdenResumen + Number(element.iva);
        });
        console.log(totalOrdenResumen);
      } else {
        this.ordenDetail.forEach((element) => {
          totalOrdenResumen = totalOrdenResumen + Number(element.total);
          subOrdenResumen = subOrdenResumen + Number(element.subtotal);
          ivaOrdenResumen = ivaOrdenResumen + Number(element.iva);
        });
        console.log(totalOrdenResumen);
      }
      if (this.ordenResume[0] != undefined) {
        console.log("Entre x 2");
        console.log(totalOrdenResumen);
        this.ordenResume[0].total = totalOrdenResumen;
        this.ordenResume[0].subtotal = subOrdenResumen;
        this.ordenResume[0].iva = ivaOrdenResumen;
      }
    },
    saveChangesOrden() {
      this.updatedOrden = false;
      let añadirProducto = true;
      let msg = false;
      console.log(this.ordenResume);
      let updateData = {
        idOrden: parseInt(this.ordenResume[0].id),
        totalOrden: Number(this.ordenResume[0].total),
        subTotalOrden: Number(this.ordenResume[0].subtotal),
        ivaOrden: Number(this.ordenResume[0].iva),
        productosOrden: [],
      };
      API.findDetailOrden({ ordenId: parseInt(this.ordenResume[0].id) }).then(
        (productsInDb) => {
          console.log(productsInDb.data.data);
          console.log(this.ordenDetail);
          this.ordenDetail.forEach((productoActualizar) => {
            añadirProducto = true;
            productsInDb.data.data.forEach((productoGuardado) => {
              if (productoGuardado.producto_id == productoActualizar.producto_id) {
                console.log(productoActualizar, "Debe acualizarse");
                updateData.productosOrden.push(productoActualizar);
                añadirProducto = false;
              }
            });
            if (añadirProducto == true) {
              API.saveProducts({
                idOrden: this.ordenResume[0].id,
                idProduct: productoActualizar.producto_id,
                units: productoActualizar.cantidad,
                lista_precio: productoActualizar.precio_unitario,
                sub: productoActualizar.subtotal,
                iva: productoActualizar.iva,
                total: productoActualizar.total,
              }).then((response) => {
                console.log(response);
                if (msg == false) {
                  if (response.data.success) {
                    msg = true;
                    if (response.data.success) {
                      //this.$session.set("shopping_cart", []);
                      alert("Orden actualizada con exito");
                    } else {
                      alert("Error al actualizar la orden");
                    }
                  }
                }
              });
            }
          });
          console.log(updateData);
          API.updateOrdenById(updateData).then((response) => {
            if (msg == false) {
              if (response.data.success) {
                //this.$session.set("shopping_cart", []);
                alert("Orden actualizada con exito");
              } else {
                alert("Error al actualizar la orden");
              }
            }
            this.updateOrdenGeneral();
          });
        }
      );
      this.$session.set("shopping_cart", []);
    },
    exportExcel() {
      this.updatedOrden = false;
      this.exportable = [];
      this.ordenDetail.forEach((element) => {
        this.exportable.push({
          codigo: element.codigo_sigma,
          bodega: 1,
          cantidad: element.cantidad,
          nombreProducto: element.nombre,
        });
      });
      console.log(this.exportable);
    },
    enableUpdate() {
      this.updatedOrden = true;
    },
    deleteProduct(product) {
      let opcion = confirm("eliminar producto " + product.nombre);
      console.log(product.id);
      if (opcion) {
        this.eliminarProducto = true;
        API.deleteProductById(product).then((response) => {
          console.log(response);

          API.findDetailOrden({ ordenId: parseInt(product.ordenes_id) }).then(
            (detalleInDB) => {
              //this.ordenDetail = detalleInDB.data.data; //Warning avoid mutating
              this.localValueUpdateDetail = detalleInDB.data.data;
              this.pruebaDetalle = detalleInDB.data.data;
              console.log(this.pruebaDetalle);
              console.log(detalleInDB.data.data);
              this.updateOrdenDetail(detalleInDB.data.data[0].cantidad, {
                item: detalleInDB.data.data,
              });
              let updateData = {
                idOrden: parseInt(this.ordenResume[0].id),
                totalOrden: Number(this.ordenResume[0].total),
                subTotalOrden: Number(this.ordenResume[0].subtotal),
                ivaOrden: Number(this.ordenResume[0].iva),
                productosOrden: [],
              };
              //Error en updateOrdenById
              API.updateOrdenById(updateData).then((response) => {
                //No esta entrando
                console.log("Hola desde updateOrdenByID");
                this.updateOrdenGeneral();
              });
            }
          );
        });
      }
    },
    onClickOutside() {
      console.log("Hola desde click outside");

      if (this.formData.dialogAddProduct) {
        this.refrescar;
      } else {
        this.updatedOrden = false;
      }
    },
    addProduct() {
      //this.formData.dialogAddProduct = true;
      let ordenToSend = []; //Orden para enviar al catálogo
      console.log("Hola desde ADD product");
      console.log(this.ordenDetail);
      //Destructuring
      this.ordenDetail.forEach((element) => {
        ordenToSend.push({
          id: element.producto_id,
          nombre: element.nombre,
          codigo_sigma: element.codigo_sigma,
          lista_precio: element.precio_unitario,
          units: element.cantidad,
          iva: element.iva,
          sub: element.subtotal,
          total: element.total,
        });
      });
      this.$session.set("shopping_cart", ordenToSend);
      this.$store.dispatch("setProducts", {
        data: this.$session.get("shopping_cart"),
      });
      this.$session.set("idOrden", this.idOrden);
      window.location.href = "../catalogo/view/";
      console.log(this.idOrden);
    },
    prueba() {
      this.refrescar; //Ejecutar el metodo dentor del computed
      console.log(this.formData.dialogAddProduct);
    },
    updateOrdenGeneral() {
      API.getAllCotizaciones().then((response) =>
      {
        this.localValueUpdateOrdenGeneral = response.data.data;
      }
      )
    },
  },
};
</script>
<style>
#table-orden .v-data-table-header {
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
#table-orden .v-text-field > .v-input__control > .v-input__slot {
  cursor: text;
  min-height: 20px !important;
  min-width: 70px !important;
  font-size: 12px;
}
</style>
