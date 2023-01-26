import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49f0f6a1 = () => interopDefault(import('../pages/clients.vue' /* webpackChunkName: "pages/clients" */))
const _cd4a8e26 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _5e57c4f0 = () => interopDefault(import('../pages/forms.vue' /* webpackChunkName: "pages/forms" */))
const _36e9ab1a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _051f587c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _47bf2fdf = () => interopDefault(import('../pages/catalogo/cotizacion.vue' /* webpackChunkName: "pages/catalogo/cotizacion" */))
const _35649bbe = () => interopDefault(import('../pages/catalogo/pedidos-cotizacion.vue' /* webpackChunkName: "pages/catalogo/pedidos-cotizacion" */))
const _13491277 = () => interopDefault(import('../pages/catalogo/view.vue' /* webpackChunkName: "pages/catalogo/view" */))
const _d21e8736 = () => interopDefault(import('../pages/configuracion/familias.vue' /* webpackChunkName: "pages/configuracion/familias" */))
const _b4e017de = () => interopDefault(import('../pages/configuracion/formulario.vue' /* webpackChunkName: "pages/configuracion/formulario" */))
const _ed8b626e = () => interopDefault(import('../pages/configuracion/grupos.vue' /* webpackChunkName: "pages/configuracion/grupos" */))
const _09c0f564 = () => interopDefault(import('../pages/configuracion/usuarios.vue' /* webpackChunkName: "pages/configuracion/usuarios" */))
const _1e8a74a9 = () => interopDefault(import('../pages/terceros/listado.vue' /* webpackChunkName: "pages/terceros/listado" */))
const _5b93637b = () => interopDefault(import('../pages/terceros/new.vue' /* webpackChunkName: "pages/terceros/new" */))
const _5b1f4d81 = () => interopDefault(import('../pages/sigma/productos/listado.vue' /* webpackChunkName: "pages/sigma/productos/listado" */))
const _1bfc305b = () => interopDefault(import('../pages/terceros/editar/_id.vue' /* webpackChunkName: "pages/terceros/editar/_id" */))
const _33c8b0ab = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/clients",
    component: _49f0f6a1,
    name: "clients"
  }, {
    path: "/dashboard",
    component: _cd4a8e26,
    name: "dashboard"
  }, {
    path: "/forms",
    component: _5e57c4f0,
    name: "forms"
  }, {
    path: "/inspire",
    component: _36e9ab1a,
    name: "inspire"
  }, {
    path: "/login",
    component: _051f587c,
    name: "login"
  }, {
    path: "/catalogo/cotizacion",
    component: _47bf2fdf,
    name: "catalogo-cotizacion"
  }, {
    path: "/catalogo/pedidos-cotizacion",
    component: _35649bbe,
    name: "catalogo-pedidos-cotizacion"
  }, {
    path: "/catalogo/view",
    component: _13491277,
    name: "catalogo-view"
  }, {
    path: "/configuracion/familias",
    component: _d21e8736,
    name: "configuracion-familias"
  }, {
    path: "/configuracion/formulario",
    component: _b4e017de,
    name: "configuracion-formulario"
  }, {
    path: "/configuracion/grupos",
    component: _ed8b626e,
    name: "configuracion-grupos"
  }, {
    path: "/configuracion/usuarios",
    component: _09c0f564,
    name: "configuracion-usuarios"
  }, {
    path: "/terceros/listado",
    component: _1e8a74a9,
    name: "terceros-listado"
  }, {
    path: "/terceros/new",
    component: _5b93637b,
    name: "terceros-new"
  }, {
    path: "/sigma/productos/listado",
    component: _5b1f4d81,
    name: "sigma-productos-listado"
  }, {
    path: "/terceros/editar/:id?",
    component: _1bfc305b,
    name: "terceros-editar-id"
  }, {
    path: "/",
    component: _33c8b0ab,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
