<template>
  <div>
    <v-text-field
      :id="id"
      type="number"
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
  props: ['value', 'id', 'label', 'required', 'text'],
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', value)
      },
    },
  },
  created() {
      this.localValue = this.value
  },
}
</script>