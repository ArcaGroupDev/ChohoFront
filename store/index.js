// State
export const state = () => ({
    shopping_cart: [],
    summaryOrder: [],
    updateCatalogo: []
})

// Getter
export const getters = {
    getProducts(state) {
        return state.shopping_cart
    },
    getSummary(state) {
        // console.log(state);
        return state.summaryOrder
    },
}

// Action
export const actions = {
    setProducts({ commit }, value) {
        commit('addProducts', value.data);
    },
    calculateSummary({ commit }) {
        commit('summaryOrder');
    },
    updateProductsCatalogo({ commit }, value){
        commit('updateProductsUnits', value.shopProducts)
    }

}


// Mutattions
export const mutations = {
    addProducts(state, value) {
        state.shopping_cart = value
    },
    summaryOrder(state) {
        let subtotal = 0
        let iva = 0
        let total = 0

        state.shopping_cart?.forEach((element, i) => {
            subtotal = subtotal + element.sub
            iva = iva + element.iva
            total = total + element.total
        });
        const data =
        {
            subtotal: subtotal,
            iva: iva,
            total: total
        }
        // console.log(data);
        state.summaryOrder = [data]
    },
    updateProductsUnits(state,value) {
        state.shopping_cart = value
    },

}