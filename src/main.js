import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker)


Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:3001/api/'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(NowUiKit);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')