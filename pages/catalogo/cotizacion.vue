<template>
  <div>
    <div>
      <p class="d-flex text-md-h5 text-overline justify-center mt-4">Cotizaciones</p>
    </div>
    <div>
      <v-container class="px-0" fluid>
        <v-switch
          v-model="switch1"
          :label="`Vista: ${labelChange()}`"
          @click="otroLabelChange()"
        ></v-switch>
      </v-container>
    </div>
    <div v-if="switch1 == false">
      <v-data-table dense :headers="headers" :items="historicoPedidos">
        <template v-slot:[`item.total`]="{ item }">
          <div @click="obtenerDetalleProducto(item.id)">
            {{
              formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.total), {
                noSeparator: false,
              })
            }}
          </div>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div @click="obtenerDetalleProducto(item.id)" small>
            <v-icon color="green darken-2"> mdi-eye-circle-outline </v-icon>
          </div>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogDetail" max-width="1000">
        <v-card>
          <v-card-text>
            <DetalleOrden
              :ordenDetail.sync="ordenDetail"
              :ordenGeneral.sync="historicoPedidos"
              :ordenResume.sync="resumeOrden"
              :prefijo.sync="prefijo"
              :idOrden.sync="idOrden"
            >
            </DetalleOrden>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div v-else-if="switch1 == true">
      <v-container class="grey lighten-5 mb-6 d-flex">
        <v-row v-for="column in columns" :key="column.title" class="mt-0">
          <v-card height="30" width="200" class="text-md-center">
            {{ column.title }}
          </v-card>
        </v-row>
      </v-container>
      <v-container class="grey lighten-5 d-flex" fluid>
        <v-container
          v-for="column in columns"
          :key="column.title"
          min-width="150"
          class="d-flex"
        >
          <!--<div class="mb-10">
            {{ column.title }}
          </div>-->

          <draggable
            :list="column.ordens"
            :animation="100"
            ghost-class="moving-card"
            filter=".action-button"
            group="ordens"
          >
            <v-col v-for="item in column.ordens" :key="item.id">
              <v-card height="140" min-width="80">
                <v-card-title>{{ item.codigo }}</v-card-title>
                <v-card-subtitle>{{
                  formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.total), {
                    noSeparator: false,
                  })
                }}</v-card-subtitle>
                <v-card-text>{{ item.fecha_creacion }}</v-card-text>
              </v-card>
            </v-col>
          </draggable>
        </v-container>
      </v-container>
    </div>
  </div>
</template>
<script>
import DetalleOrden from "@/components/DetalleOrden.vue";
import API from "@/services/API.js";
import formatNumber from "format-number";
import Draggable from "vuedraggable";
export default {
  components: {
    DetalleOrden,
    Draggable,
  },
  head: {
    title: "Pedidos - Historico",
  },
  data() {
    return {
      historicoPedidos: [],
      ordenDetail: [],
      resumeOrden: [],
      prefijo: "",
      idOrden: 0,
      headers: [
        { text: "Codigo", value: "codigo", sortable: false },
        { text: "Fecha", value: "fecha_creacion", sortable: false },
        { text: "Hora", value: "hora_creacion", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Detalle", value: "action", sortable: false },
      ],
      dialogDetail: false,
      formatNumber: formatNumber,
      switch1: false,
      columns: [],
      alignments: ["start", "center", "end"],
      agregarDetalle: false,
    };
  },
  created() {
    /*API.getAllOrdenes().then((response) => {
      response?.data?.data.forEach((element) => {
        console.log(element.prefijo);
        if (element.prefijo == "COT") {
          this.historicoPedidos.push(element);
        }
      });
    });*/
    API.getAllCotizaciones().then((response) =>
      {
        this.historicoPedidos = response.data.data;
      }
      )
    this.pedido = this.$session.get("shopping_cart");
    if (this.pedido != undefined) {
      if (this.pedido.length > 0) {
        this.agregarDetalle = true; // determina que trae info de la pagina de shopping cart
        console.log(this.$session.get("idOrden"));
        this.obtenerDetalleProducto(this.$session.get("idOrden"));
      }
    }
  },
 /* updated() {
    console.log("Actulaizacion principal");
    //this.refrescar();
    /*API.getAllOrdenes().then((response) => {
      response?.data?.data.forEach((element) => {
        console.log(element.prefijo);
        if (element.prefijo == "COT") {
          //this.historicoPedidos = this.historicoPedidos.concat(element);
        }
      });
    });
    
  },*/
  methods: {
    /*
    detalle(ordenDetail) {
      this.ordenDetail = ordenDetail;
    },*/
    obtenerDetalleProducto(idOrden) {
      this.idOrden = idOrden;
      this.idOrdenConsultar = {
        ordenId: idOrden,
      };
      if (this.agregarDetalle) {
        this.ordenDetail = [];
        let detalleCarrito = this.$session.get("shopping_cart");
        detalleCarrito.forEach((element) => {
          this.ordenDetail.push({
            nombre: element.nombre,
            cantidad: element.units,
            subtotal: element.subtotal,
            producto_id: element.id,
            precio_unitario: element.lista_precio,
            subtotal: element.sub,
            iva: element.iva,
            total: element.total,
          });
        });
      } else {
        console.log(idOrden);
        API.findDetailOrden(this.idOrdenConsultar).then((response) => {
          console.log(response);
          this.ordenDetail = response?.data?.data;
        });
      }
      API.getOrdenById(this.idOrdenConsultar).then((response) => {
        this.resumeOrden = response?.data?.data;
        this.prefijo = response?.data?.data[0].codigo;
        console.log(this.prefijo);
      });
      this.dialogDetail = true;
    },
    labelChange() {
      if (!this.switch1) {
        return "Lista";
      } else {
        return "Kanban";
      }
    },
    otroLabelChange() {
      let cards = [
        {
          title: "Estado 1",
          ordens: [],
        },
        {
          title: "Estado 2",
          ordens: [],
        },
        {
          title: "Estado 3",
          ordens: [],
        },
        {
          title: "Estado 4",
          ordens: [],
        },
      ];
      this.historicoPedidos.forEach((element) => {
        if (element.cotizacion == 0) {
          cards[0].ordens.push(element);
        }
      });
      console.log(cards);
      this.columns = cards;
    },
    refrescar() {
      console.log("Hola desde principal");
      this.historicoPedidos = [];
      let vectorPrueba = [];
      API.getAllOrdenes().then((response) => {
        response?.data?.data.forEach((element) => {
          console.log(element.prefijo);
          if (element.prefijo == "COT") {
            //vectorPrueba.push(element);
          }
        });
      });
    },
  },
};
</script>
