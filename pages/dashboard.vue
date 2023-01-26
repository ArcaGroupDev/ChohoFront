<template>
  <div>
    <div class="d-flex justify-center">
      <v-card v-if="this.carga == true" class="d-flex justify-center pa-5 mt-md-16" width="300" flat>
        <h1>Bienvenido</h1>
      </v-card>
      <!-- <v-card v-else class="d-flex" width="300" flat>
      <h1>Cargando</h1>
      <loading v-model: active
        :is-full-page="false"
        :loader="bars"
        />  
      </v-card> -->
    </div>
    <div v-if="this.carga == false">
      <h2 id="titulo" class="d-flex justify-center">Cargando información, por favor espere.</h2>
      <!-- <loading id="loading" v-model: active
        :is-full-page="false"
        :loader="bars"
        />   -->
    </div>
  </div>
</template>
<script>
import API from '@/services/API.js'
// import Loading from 'vue-loading-overlay';
//import 'vue-loading-overlay/dist/css/index.css';
export default {
  name: 'Dashboard',
  data() {
    return {
      carga : false,
      bars : "dots",
    }
  },
  components: {
    //Loading
  },
  created() {
    this.getDataGeneral()
  },
  methods: {
    getDataGeneral() {
      API.getProducts().then((response) => {
        this.carga = true;
        console.log(response.data.data)
        this.$session.set('subGroups', response.data.data)
      })
    },
  },
}
</script>

<style>
  #titulo{
    /* position:absolute; 
    left: 30%;
    top: 42%;
    color: red; */
    bottom: 10%;
    left: 0px;
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
    display: none;
    justify-content: center;
    overflow: hidden;
    z-index: 9999;
  }
</style>