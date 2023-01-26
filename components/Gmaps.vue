<template>
  <section class="container">
    <div class="d-flex">
      <v-text-field
        id="autocomplete-input"
        outlined
        dense
        label="Ingrese la direccion"
        clearable
      ></v-text-field>
      <v-btn id="btnGuardar" color="primary" dark @click="saveAddress()" class="mx-2">
        <v-icon> mdi-floppy </v-icon>
      </v-btn>
    </div>
    <GMap
      ref="gMap"
      language="es"
      :zoom="11"
      :center="{
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      }"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GMapMarker
        ref="gMapMarker"
        :position="{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }"
        :clickable="true"
        :draggable="true"
        :icon="{
          url: require('@/assets/img/maps/map-maker.jpg'),
          scaledSize: { width: 77, height: 77 },
          labelOrigin: { x: 16, y: -10 },
        }"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <code> lat: {{ location.lat }}, lng: {{ location.lng }} </code>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </section>
</template>

<script>
import API from "@/services/API.js";
import mapMaper from "@/services/mapMapper.js";
export default {
  props: ["address", "dialog", "ciudad", "departamento", "pais"],
  data() {
    return {
      currentLocation: {},
      circleOptions: {},
      location: {
        lat: 4.717403337482688,
        lng: -74.0796651185456,
      },
      pins: {
        selected: "data:image/png;base64,iVBORw0KGgo...",
        notSelected: "data:image/png;base64,iVBORw0KGgo...",
      },
      mapStyle: [],
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff",
        },
      ],
      direccionArray: [],
    };
  },
  computed: {
    localValue: {
      get() {
        return this.address;
      },
      set(val) {
        this.$emit("update:address", val);
      },
    },
    localValueMap: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit("update:dialog", val);
      },
    },
    localValueCiudad: {
      get() {
        return this.ciudad;
      },
      set(val) {
        this.$emit("update:ciudad", val);
      },
    },
    localValueDepartamento: {
      get() {
        return this.departamento;
      },
      set(val) {
        this.$emit("update:departamento", val);
      },
    },
    localValuePais: {
      get() {
        return this.pais;
      },
      set(val) {
        this.$emit("update:pais", val);
      },
    },
  },
  mounted() {
    const gMap = this.$refs.gMap;
    let mark = this.$refs.gMapMarker;
    let input = document.getElementById("autocomplete-input");
    let options = {
      fields: ["formatted_address", "address_component", "geometry", "name", "icon"],
    };
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      this.location.lat = place.geometry.location.lat();
      this.location.lng = place.geometry.location.lng();
      let coordenadas = new google.maps.LatLng(
        parseFloat(this.location.lat),
        parseFloat(this.location.lng)
      );
      mark.marker.setPosition(coordenadas);
      gMap.map.setCenter(coordenadas);
      gMap.map.setZoom(17);
      this.direccionArray = place.formatted_address.split(",");
      this.direccionArray[0] =
        place.address_components[2].long_name + " " + this.direccionArray[0];
      console.log(this.direccionArray);
      console.log(place);
      //console.log(aud);
    });
  },
  methods: {
    saveAddress() {
      console.log(this.direccionArray);
      let input = document.getElementById("autocomplete-input");
      if (!input.value) {
        alert("La direccion es un campo obligatorio");
      } else {
        this.localValue = this.direccionArray[0];
        //this.localValueCiudad = this.direccionArray[1];
        //this.localValueDepartamento = this.direccionArray[(this.direccionArray.length-2)];
        //this.localValuePais = this.direccionArray[(this.direccionArray.length-1)]
        this.localValueMap = false;
        if (this.direccionArray[this.direccionArray.length - 1]) {
          API.getPaisByName(this.direccionArray[this.direccionArray.length - 1]).then(
            (response) => {
              this.localValuePais = response.data.data;
              //setTimeout(this.$forceUpdate())
            }
          );
        }
        if (this.direccionArray[this.direccionArray.length - 2]) {
          API.getDepartamentByName(
            this.direccionArray[this.direccionArray.length - 2]
          ).then((response) => {
            this.localValueDepartamento = response.data.data;
          });
        }
        if (this.direccionArray[1]) {
          const x = mapMaper.mapCities(this.direccionArray[1]);
          API.getCiudadByName(x.length > 0 ? x[0].value : this.direccionArray[1]).then(
            (response) => {
              console.log(response);
              this.localValueCiudad = response.data.data;
            }
          );
        }
      }
    },
  },
};
</script>
