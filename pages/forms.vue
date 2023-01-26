<template>
  <div>
    <h2>Formularios</h2>
    <v-container>
      <v-row v-for="(item, i) in forms" :key="i">
        <v-col
          cols="12"
          md="6"
          sm="12"
          v-for="(field, i) in item.fields"
          :key="i"
        >
          <v-text-field
            v-if="field.type === 'TextField' || field.type === 'NumberField'"
            v-model="formData[field.column]"
            :id="field.column"
            outlined
            :type="field.type === 'NumberField' ? 'number' : 'text'"
            :label="field.label"
            v-on:keyup="getTextField($event, field.column)"
            :rules="
              field.text_validation.trim() != ''
                ? [(v) => !!v || field.text_validation]
                : []
            "
          >
          </v-text-field>
          <v-text-field
            v-if="field.type === 'EmailField'"
            v-model="formData[field.column]"
            :id="field.column"
            type="email"
            outlined
            :label="field.label"
          >
          </v-text-field>
          <v-select
            v-if="field.type === 'SelectField'"
            :id="field.column"
            v-model="formData[field.column]"
            :items="field.options"
            :multiple="field.multiselect"
            outlined
            :label="field.label"
            :rules="
              field.text_validation.trim() != ''
                ? [(v) => !!v || field.text_validation]
                : []
            "
            v-on:change="getSelect($event, field.column)"
          ></v-select>
        </v-col>
      </v-row>
      <pre>{{ formData }}</pre>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      message: '',
    }
  },
  computed: {
    fields() {
      return this.$store.getters['getFields']
    },
    forms() {
      const forms = this.$store.getters['getForms']
      // for (const key in forms) {
      const fields = forms[0]?.fields
      for (let i = 0; i < fields?.length; i++) {
        console.log(fields[i])
        // this.formData.fields[i].column = fields[i].column;
      }
      console.log(fields)
      // }
      return this.$store.getters['getForms']
    },
  },
  created() {
    console.log(this.formData)
  },
  methods: {
    getTextField(event, column) {
      this.formData['' + column + ''] = event.target.value
    },
    getSelect(value, column) {
      console.log(value, column)
      this.formData['' + column + ''] = value
    },
  },
}
</script>