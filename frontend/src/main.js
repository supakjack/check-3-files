import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuesax.js'
import './assets/tailwind.css'

Vue.config.productionTip = false

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
