import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.scss'



import { TooltipPlugin } from 'bootstrap-vue'
Vue.use(TooltipPlugin)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
