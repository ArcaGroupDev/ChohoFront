import colors from 'vuetify/es5/util/colors'

const backendUrl = process.env.BACKEND_URL || "http://localhost:8081/api" //Local                                          
//const backendUrl = process.env.BACKEND_URL || "https://507350081719.us-west-2.amazonaws.com"
//const backendUrl = process.env.BACKEND_URL || "http://dev-chohowms.us-west-2.elasticbeanstalk.com/" //AWS
//const backendUrl = process.env.BACKEND_URL || "http://dev-chohow/"
const apiGoogleMaps = process.env.API_GOOGLE_MAPS || "AIzaSyA3JK3zmYtyFihrt6RZSI6FVbo4FebUOp0"
const urlSigma = process.env.URL_BASE_SIGMA || "https://ws.dsnube.co/api"
const secretKeySigma = process.env.SIGMA_KEY || "cjJoT1JJMDZ1blRiMS81UWwxUE5pMEtkK3lSWUxmWG5UdHlUZFNjYTBuZnk5QWQvZEk1ZkR4aGVVOWRpNkJsWUxFeFNjSWc4eDNxbzF0S1FhUGRBaDE3OU9ydDV2VDd3M2JYYy92ZGFuL1QyVEtzVlNNRkcwcHlCeTlzQjdhcmNGSUFJOElVTWpKalg5MGtLRlFCU25BPT06MlJlR0FVdC81dzl4V2U4K1lSa080NWFwUUU1dUJ0SlN3YitVem5iNGRKQkxYWkhmQUFMZkpMeHZWNUxXQmdVQ0lwMWc3Y1BjaFlnR1hHa2s2UlNvMWZ1cDlCeHJTWG5iM210S01KcS9xRU9uNXgvTEZMaVFEMmU2QjQzYTZ6S21VcE0vdmtnRUNGekx3ZUI5UXo4aXZQT0JEbEl6S0JyQktqTExUQWxkWlhVPQ=="
export default {
  env: {
    backendUrl,
    apiGoogleMaps,
    secretKeySigma,
    urlSigma
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Choho WMS',   
    title: 'Choho WMS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key='+apiGoogleMaps+'&libraries=places'
      }
    ]
  },
  

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/VueOffline.js' },
    { src: '~/plugins/VueSession.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // ['nuxt-gmaps', {
    //   key: apiGoogleMaps,
    //   //libraries: ['places']
    // }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: backendUrl,
  },

  // pwa: {
  //   icon: false, // disables the icon module
  //   meta: {
  //     title: 'My PWA',
  //     author: 'Me',
  //   },
  //   manifest: {
  //     name: 'Nuxt.js PWAs are so easy',
  //     short_name: 'Nuxt.js PWA',
  //     lang: 'en',
  //   },

  //   workbox: {
  //     dev: true
  //   },
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    return: [
      '/login',
    ]
  }
}
