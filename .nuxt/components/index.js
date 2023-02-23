export { default as AddProducts } from '../../components/AddProducts.vue'
export { default as ContactTable } from '../../components/ContactTable.vue'
export { default as DetalleOrden } from '../../components/DetalleOrden.vue'
export { default as DialogForm } from '../../components/DialogForm.vue'
export { default as DirectionsTable } from '../../components/DirectionsTable.vue'
export { default as Documents } from '../../components/Documents.vue'
export { default as Gmaps } from '../../components/Gmaps.vue'
export { default as NumberField } from '../../components/NumberField.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as SelectField } from '../../components/SelectField.vue'
export { default as ShoppingCart } from '../../components/ShoppingCart.vue'
export { default as TextField } from '../../components/TextField.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
