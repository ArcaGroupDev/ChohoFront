<template>
  <div>
    <v-select
      :id="id"
      v-model="localValue"
      :label="label"
      :items="options"
      :multiple="multiple"
      outlined
      :rules="required != '' ? [(v) => !!v || text] : []"
    ></v-select>
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