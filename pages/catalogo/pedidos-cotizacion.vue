<template>
  <div>
    <div>
      <p class="d-flex text-md-h5 text-overline justify-center mt-4">Pedidos</p>
    </div>
    <div>
      <v-data-table dense :headers="headers" :items="historicoPedidos">
        <template v-slot:[`item.total`]="{ item }">
          {{
            formatNumber({ prefix: "$", suffix: "" })(Math.trunc(item.total), {
              noSeparator: false,
            })
          }}
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn @click="obtenerDetalleProducto(item.id)" outlined color="black" small>
            VER
          </v-btn>
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
            >
            </DetalleOrden>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import DetalleOrden from "@/components/DetalleOrden.vue";
import API from "@/services/API.js";
import formatNumber from "format-number";
export default {
  components: {
    DetalleOrden,
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
      headers: [
        { text: "Codigo", value: "codigo", sortable: false },
        { text: "Fecha", value: "fecha_creacion", sortable: false },
        { text: "Hora", value: "hora_creacion", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Detalle", value: "action", sortable: false },
      ],
      dialogDetail: false,
      formatNumber: formatNumber,
    };
  },
  created() {
      API.getAllPedidos().then((response) =>
      {
        this.historicoPedidos = response.data.data;
      }
      )
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    obtenerDetalleProducto(idOrden) {
      this.idOrdenConsultar = {
        ordenId: idOrden,
      };
      console.log(idOrden);
      API.findDetailOrden(this.idOrdenConsultar).then((response) => {
        console.log(response);
        this.ordenDetail = response?.data?.data;
      });
      API.getOrdenById(this.idOrdenConsultar).then((response) => {
        this.resumeOrden = response?.data?.data;
        this.prefijo = response?.data?.data[0].codigo;
        console.log(this.prefijo);
      });
      this.dialogDetail = true;
    },
  },
};
</script>
