<template>
  <div>
    <v-text-field
      :id="id"
      v-model="localValue"
      :label="label"
      outlined
      :rules="required != '' ? [(v) => !!v || text] : []"
    >
    </v-text-field>
  </div>
</template>
<script>
export default {
  props: ['value', 'id', 'label', 'required', 'text', 'new'],
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      },
    },
  },
  created() {
      this.localValue = (!this.new) ? this.value : ''
  },
}
</script>