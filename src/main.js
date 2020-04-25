import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'

import store from '@/store/index'

var options = {
  persist: true
}

Vue.use(VueSession, options)

Vue.config.productionTip = true


  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App),
  }).$mount('#app')