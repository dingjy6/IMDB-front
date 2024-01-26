import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from '../node_modules/element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI,{locale})
Vue.use(Vant);

new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
