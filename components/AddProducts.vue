<template>
  <div>
    <p class="d-flex text-md-h5 text-overline justify-center mt-4">Añadir</p>
    <div class="d-flex justify-space-between">
      <p class="text-h6 mt-5">Filtros:</p>
      <div class="mt-3">
        <v-btn
          @click="expandCards"
          outlined
          color="green"
          small
          class="ma-2 ml-0"
          title="Expandir"
        >
          <v-icon>mdi-arrow-expand</v-icon>
        </v-btn>
        <v-btn
          @click="collapseCards"
          outlined
          color="red"
          small
          class="ma-2"
          title="Contraer"
        >
          <v-icon>mdi-arrow-collapse</v-icon>
        </v-btn>
      </div>
    </div>
    <div id="filtros">
      <v-row class="d-flex">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            outlined
            dense
            label="Filtrar producto"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="3" class="d-flex justify-md-end justify-center">
          <v-btn color="red" dark class="mb-2 text-capitalize mr-1" @click="searchInfo()">
            Buscar
          </v-btn>
          <v-btn
            color="black"
            dark
            class="mb-2 text-capitalize"
            @click="clearSearchText()"
          >
            Limpiar
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col cols="12" sm="12" md="3">
          <v-select
            v-model="familySelected"
            class="d-flex"
            id="selectFamilias"
            label="Familias"
            item-text="nombre"
            outlined
            dense
            :items="selectFamily"
            return-object
            @change="familiaSelect($event)"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-select
            v-model="groupSelected"
            :items="selectGroup"
            label="Grupos"
            item-text="nombre"
            @change="grupoSelect($event)"
            outlined
            dense
            :disabled="disableGroup"
            return-object
            id="grupo"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-select
            v-model="subgroupSelected"
            :items="selectSubGroup"
            item-text="nombre"
            label="SubGrupo"
            @change="subGroupSelect($event)"
            outlined
            dense
            :disabled="disableSubGroup"
            id="subGrupo"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="2" class="d-flex justify-md-end justify-center">
          <v-btn color="black" dark class="mb-2 text-capitalize" @click="limpiar()">
            Limpiar
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <template>
        <div
          class="d-flex flex-column justify-space-between align-center"
          id="imageBanner"
        >
          <v-img v-if="bannerImg" :src="bannerImg"></v-img>
        </div>
      </template>
      <div class="d-flex justify-center">
        <v-btn
          @click="agregarProductos"
          outlined
          color="green"
          small
          class="ma-2 ml-0"
          title="GuardarPedido"
        >
          Agregar
        </v-btn>
      </div>
    </div>
    <div>
      <v-expansion-panels v-if="subGrupo && subGrupo.length > 0" v-model="panel" multiple>
        <v-expansion-panel v-for="(item, i) in updateCart" :key="i">
          <v-expansion-panel-header
            id="expansionHeader"
            class="white--text"
            expand-icon=""
          >
            <p class="d-flex justify-center mb-0">
              {{ item.nombre }}
            </p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="item.productos"
              hide-default-footer
              dense
              id="tables"
              class="caption"
            >
              <template v-slot:[`item.units`]="props">
                <v-text-field
                  v-model="props.item.units"
                  outlined
                  dense
                  type="number"
                  class="input-cantidad"
                >
                  <!-- @input="changeAmountProduct($event, props)" -->
                </v-text-field>
              </template>
              <template v-slot:[`item.lista_precio`]="{ item }">
                {{
                  formatNumber({ prefix: "$", suffix: "" })(item.lista_precio, {
                    noSeparator: false,
                  })
                }}
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <p v-else class="d-flex text-h6 text-overline justify-center text-center mt-4">
        {{ validationText }}
      </p>
    </div>
  </div>
</template>

<script>
import API from "@/services/API.js";
import formatNumber from "format-number";
export default {
  props: ["addProducts", "ordenDetail", "dialogAddProduct"],
  components: {},
  data() {
    return {
      formatNumber: formatNumber,
      bannerImg: null,
      bannerFamily: null,
      validationText: "",
      unitProductsChange: [],
      dialog: false,
      snack: false,
      snackColor: "",
      snackText: "",
      disableGroup: true,
      disableSubGroup: true,
      selectFamily: [],
      familySelected: "",
      selectGroup: [],
      groupSelected: "",
      selectSubGroup: [],
      subgroupSelected: "",
      search: "",
      panel: [],
      headers: [
        {
          text: "Código",
          width: "20%",
          align: "start",
          sortable: false,
          value: "codigo_sigma",
        },
        { text: "Nombre", value: "nombre", sortable: false },
        {
          text: "Precio",
          width: "10%",
          value: "lista_precio",
          sortable: false,
        },
        { text: "Cantidad", width: "6.5%", value: "units", sortable: false },
      ],
      subGrupo: [],
      countProducts: 0,
      updatedInput: false,
      //moreProducts: [],
    };
  },
  computed: {
    updateCart() {
      let subGrupos = this.$session.get("subGroups");
      console.log("Hola desde computed");
      this.$store.getters["getProducts"];
      this.ordenDetail.forEach((prodDetail) => {
        subGrupos.forEach((element) => {
          element.productos.forEach((product) => {
            if (product.codigo_sigma == prodDetail.codigo_sigma) {
              console.log("Entre");
              product.units = prodDetail.cantidad;
            }
          });
        });
      });

      return subGrupos;
    },
    localValueAddProducts: {
      get() {
        return this.addProducts;
      },
      set(val) {
        this.$emit("update:addProducts", val);
      },
    },
    localValueCerrarVentana: {
      get() {
        return this.dialogAddProduct;
      },
      set(val) {
        this.$emit("update:dialogAddProduct", val);
      },
    } /*
    localValueCerrarVentana: {
      get() {
        return this.dialogAddProduct;
      },
      set(val) {
        this.$emit("update:dialogAddProduct", val);
      },
    },*/,
  },
  created() {
    /*this.$store.dispatch("setProducts", {
      data: this.$session.get("shopping_cart"),
    });*/
    //this.$store.dispatch("calculateSummary");
    this.getDataGeneral();
    this.getFamilysRemote();
    //this.expandCards();
    //this.computed;
  },
  methods: {
    getFamilysRemote() {
      API.getFamilys().then((response) => {
        this.selectFamily = response.data.data;
      });
    },
    getGroupsRemote(family) {
      API.getGroups(family).then((response) => {
        this.selectGroup = response.data.data;

        this.disableSubGroup = true;
        this.disableGroup = false;
      });
    },

    getSubgroupsRemote(group) {
      API.getSubgroups(group).then((response) => {
        this.selectSubGroup = response.data.data;

        this.disableSubGroup = false;
      });
    },

    getDataGeneral() {
      setTimeout(() => {
        this.subGrupo = this.$session.get("subGroups");
        this.expandCards();
      }, 1500);
    },
    /*
    changeAmountProduct(event, props) {
      console.log(props.item);
      this.addProducts.push(props.item);
      return;
    }
    addToShoppingCart(value) {
      let actualizar = false;
    },*/
    searchInfo() {
      let subGrupos = [];
      if (this.search && this.search.trim() !== "") {
        this.$session.get("subGroups").forEach((sg, i) => {
          let exist = sg.productos.filter((p) =>
            p.codigo_sigma.includes(this.search.toUpperCase())
          );
          if (exist.length > 0) {
            subGrupos.push(sg);
          } else {
            let exist2 = sg.productos.filter((p) =>
              p.nombre.includes(this.search.toUpperCase())
            );
            if (exist2.length > 0) {
              subGrupos.push(sg);
            }
          }
        });
      }
      this.subGrupo = subGrupos;

      if (this.subGrupo.length < 1) {
        this.validationText = "El producto buscado no existe";
      }
    },
    familiaSelect(e) {
      if (e && e.nombre.trim() !== "") {
        this.disableGroup = true;
        this.getGroupsRemote(e.nombre);
      }
      this.bannerImg = e.banner;
      this.bannerFamily = e.banner;
      this.expandCards();
    },
    grupoSelect(e) {
      if (e && e.nombre.trim() !== "") {
        this.disableSubGroup = true;
        this.getSubgroupsRemote(e.nombre);
        const group = this.selectGroup.filter((g) => g.nombre === e.nombre);
        if (group[0].id) {
          this.subGrupo = this.$session
            .get("subGroups")
            .filter((sg) => sg.grupo_id === group[0].id);

          if (this.subGrupo.length < 1) {
            this.validationText =
              "Los subgrupos del grupo seleccionado no tiene productos asociados";
          }
        }
      }

      if (e.banner) {
        this.bannerImg = e.banner;
      } else {
        this.bannerImg = this.bannerFamily;
      }
      this.expandCards();
    },
    subGroupSelect(e) {
      if (e && e.trim() !== "") {
        this.subGrupo = this.$session.get("subGroups").filter((sg) => sg.nombre === e);
      }
      this.expandCards();
    },
    limpiar() {
      this.familySelected = "";
      this.groupSelected = "";
      this.subgroupSelected = "";
      this.bannerImg = "";
      let dataProd = this.$session.get("subGroups");
      dataProd.forEach((sg, i) => {
        sg.productos.forEach((p, i) => {
          p.units = null;
        });
      });
      this.$session.set("subGroups", dataProd);
      this.subGrupo = this.$session.get("subGroups");

      this.disableGroup = true;
      this.disableSubGroup = true;
      this.expandCards();
    },
    clearSearchText() {
      this.search = "";
      let dataProd = this.$session.get("subGroups");
      dataProd.forEach((sg, i) => {
        sg.productos.forEach((p, i) => {
          p.units = null;
        });
      });
      this.$session.set("subGroups", dataProd);
      this.subGrupo = this.$session.get("subGroups");
    },
    expandCards() {
      this.panel = [...Array(this.subGrupo?.length).keys()].map((k, i) => i);
    },
    collapseCards() {
      this.panel = [];
    },
    agregarProductos() {
      let allProducts = [];
      let otroVector = [];
      let moreProducts = [];
      this.localValueAddProducts = [];
      this.updateCart.forEach((element) => {
        //Se extraen los productos de los subgrupos
        otroVector.push(element.productos);
      });
      otroVector.forEach((element) => {
        //Se concatena todos los productos de diferentes subgrupos en un solo vector
        allProducts = allProducts.concat(element);
      });
      allProducts.forEach((element) => {
        if (parseInt(element.units) > 0) {
          moreProducts.push(element);
        }
      });
      this.localValueAddProducts = moreProducts;
      setTimeout(this.cerrarVentana, 500);
    },
    cerrarVentana() {
      console.log("Hola desde cerrarventana");
      this.localValueCerrarVentana = false;
    },
  },
};
</script>
<style>
.v-text-field__details {
  display: none !important;
}
.v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0px !important;
}
td.text-start {
  font-size: 90% !important;
}
div #filtros {
  margin-bottom: 30px;
}
.v-expansion-panel-header {
  align-items: center;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  font-size: 0.9375rem;
  line-height: 1;
  min-height: 35px;
  outline: none;
  padding: 16px 24px;
  position: relative;
  transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 35px;
}
div #imageBanner {
  margin-bottom: 30px;
}
.v-expansion-panel-content__wrap {
  padding: 0px 24px 0px;
  flex: 1 1 auto;
  max-width: 100%;
}
#tables .v-data-table-header {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,d7e0e2+50,ced6db+67,9b9b9b+100 */
  background: #ffffff; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #ffffff 0%,
    #d7e0e2 50%,
    #ced6db 67%,
    #9b9b9b 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #ffffff 0%,
    #d7e0e2 50%,
    #ced6db 67%,
    #9b9b9b 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff 0%,
    #d7e0e2 50%,
    #ced6db 67%,
    #9b9b9b 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#9b9b9b',GradientType=0 ); /* IE6-9 */
}
#expansionHeader {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7d7e7d+0,0e0e0e+100;Black+3D */
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
  height: 35px;
}
/* Input cantidad */
#tables .v-text-field > .v-input__control > .v-input__slot {
  cursor: text;
  min-height: 20px !important;
  font-size: 12px;
}
</style>
