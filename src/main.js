import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './styles/element-variables.scss'
import CForm from './packages/index'
import CCrud from './packages/index'
import './components/automatic/index'

Vue.use(ElementUI)

Vue.use(CForm)
Vue.use(CCrud)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
