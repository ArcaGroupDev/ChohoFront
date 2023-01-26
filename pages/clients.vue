<template>
  <div>
    <v-container>
      <div
        flat
        class="pa-0 title d-flex flex-wrap mb-5 justify-md-start justify-center"
      >
        <!-- <p class="d-flex text-h4 blue--text">Crear Cliente</p> -->
      </div>
      <v-row>
        <v-col cols="12" md="2" sm="12">
          <p class="title-1">Tipo ID:</p>
          <v-select
            :items="tyipeId"
            outlined
            background-color="white"
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <p class="title-1">Numero identificacion</p>
          <v-text-field outlined background-color="white" dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <p class="title-1">Nombre:</p>
          <v-text-field outlined background-color="white" dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <p class="title-1">Apellido:</p>
          <v-text-field outlined background-color="white" dense></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <p class="title-1">Genero:</p>
          <v-select
            :items="gender"
            outlined
            background-color="white"
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <p class="title-1">Fecha de nacimiento:</p>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                outlined
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                background-color="white"
                dense
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-sheet width="100%" height="100%" class="pa-5">
            <v-switch
              class="mt-6"
              v-model="switch1"
              inset
              label="¿Aplica Retención en la Fuente?"
            ></v-switch>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <p class="title-1">
            Tipo de Cliente (Marcar todos los que apliquen):
          </p>
          <!-- <v-sheet elevation="0" class="py-4 px-1"> -->
          <v-chip-group multiple active-class="primary--text">
            <v-chip>Distribuidor</v-chip>
            <v-chip>Mayorista</v-chip>
            <v-chip>Almacen</v-chip>
            <v-chip>Taller</v-chip>
          </v-chip-group>
          <!-- </v-sheet> -->
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <p class="title-1">Número de Mecánicos:</p>
          <v-text-field
            outlined
            background-color="white"
            type="number"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <p class="title-1">Datos de Contacto Principal:</p>
          <v-text-field
            outlined
            background-color="white"
            type="number"
            dense
            placeholder="Telefono fijo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <p class="title-1 white--text">-</p>
          <v-text-field
            outlined
            background-color="white"
            type="number"
            dense
            placeholder="Telefono celular"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <p class="title-1 white--text">-</p>
          <v-text-field
            outlined
            background-color="white"
            dense
            placeholder="Correo electronico"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <p class="title-1">Direccion: N/A</p>
              <v-btn
                outlined
                color="black"
                class="text-capitalize"
                @click="addAdrress = true"
                >Agregar direccion</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-dialog v-model="addAdrress" max-width="800">
          <v-card>
            <v-toolbar color="red" dark>Agregar direccion</v-toolbar>
            <v-card-text>
              <v-row class="mt-5">
                <v-col cols="12" md="4" sm="12">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        background-color="white"
                        dense
                        placeholder="Pais"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        background-color="white"
                        dense
                        placeholder="Ciudad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        background-color="white"
                        dense
                        placeholder="Barrio"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        background-color="white"
                        dense
                        placeholder="Direccion"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <!-- <div class="text-h2 pa-12">Hello world!</div> -->
                </v-col>
                <v-col cols="12" md="8" sm="12">
                  <v-card outlined min-height="420">
                    <v-card-text class="d-flex justify-center">
                      <div class="text-h2 pa-12">Mapa!</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-col
                cols="12"
                class="d-flex flex-wrap justify-md-space-between justify-center"
              >
                <v-btn
                  outlined
                  color="black"
                  class="ma-1"
                  @click="addAdrress = false"
                  >Guardar</v-btn
                >
                <v-btn
                  outlined
                  color="black"
                  class="ma-1"
                  @click="addAdrress = false"
                  >Cancelar</v-btn
                >
              </v-col>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selection: 2,
      addAdrress: false,
      switch1: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      gender: ['Masculino', 'Femenino'],
      tyipeId: [
        'Cedula ciudadania',
        'Pasaporte',
        'NIT',
        'Cedula de extranjeria',
      ],
    }
  },
}
</script>
<style lang="scss">
.title {
  .v-toolbar__content {
    padding-left: 0% !important;
  }
}
</style>