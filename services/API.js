import axios from "axios"
import Cookies from 'js-cookie'


const tokenAuth = Cookies.get('wms_token')

// console.log(tokenAuth);
const api = axios.create({
    baseURL: process.env.backendUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenAuth}`,
    }
})

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        window.location.href = '/login'
    }
    return error;
});

export default {
    login(data) {
        const api2 = axios.create({
            baseURL: process.env.backendUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return api2.post('/login_check', data)
    },
    saveForm(data) {
        return api.post('/formulario/store', data)
    },
    editField(data) {
        return api.post('/campo/edit', data)
    },
    getForms() {
        return api.get('/formulario/rows')
    },
    getEntities() {
        return api.get('/formulario/entitys')
    },
    getTypeFields() {
        return api.get('/tipo/campo/all')
    },
    saveSection(data) {
        return api.post('/seccion/store', data)
    },
    saveField(data) {
        return api.post('/campo/store', data)
    },
    getFormEntity(entityName) {
        return api.get('/formulario/entity/' + entityName)
    },
    getItems(url) {
        return api.get(url)
    },
    saveClient(data) {
        return api.post('/tercero/store', data)
    },
    updatedOptionsField(data) {
        return api.post('/campo/options', data)
    },
    getAllClient() {
        return api.get('/tercero/all')
    },
    getDepartamentByName(data) {
        return api.post('/departamentos/name', data)
    },
    getPaisByName(data) {
        return api.post('/pais/name', data)
    },
    getCiudadByName(data) {
        return api.post('ciudades/name', data)
    },
    getFamilys() {
        return api.get('/familia/all')
    },
    getGroups(family) {
        return api.post('/grupo/all', family)
    },
    getSubgroups(group) {
        return api.post('/subgrupo/all', group)
    },
    getProducts(filter = null) {
        return api.post('/producto/list', filter)
    },
    updateFamily(family) {
        return api.post('/familia/edit', family)
    },
    updateGroup(family) {
        return api.post('/grupo/edit', family)
    },
    getUsers() {
        return api.get('/usuario/all')
    },
    updateUser(user) {
        return api.post('/usuario/' + user.id + '/edit', user)
    },
    saveUser(data) {
        return api.post('/usuario/new', data)
    },
    resetPassword(user) {
        return api.post('/usuario/' + user.id + '/reset-password', user)
    },
    //Mis APIS
    getAllOrdenes(){
        return api.get('/ordenes/all');
    },
    findDetailOrden(data){
        return api.post('/detalleOrdenes/detallesByOrdenId',data)
    },
    getOrdenById(data){
        return api.post('/ordenes/getOrdenById',data);
    },
    saveOrden(data){
        return api.post('/ordenes/saveOrden',data);
    },
    saveProducts(data){
        return api.post('/detalleOrdenes/saveProduct',data);
    },
    updateOrdenById(data){
        return api.post('/ordenes/updateOrdenById',data);
    },
    deleteProductById(data){
        return api.post('/detalleOrdenes/deleteProductById',data);
    },
    getAllCotizaciones(){
        return api.get('/ordenes/getCot');
    },
    getAllPedidos(){
        return api.get('/ordenes/getPed');
    },
    updateProductSigma(){
        return api.get('/producto/updateBySigma')
    }
}