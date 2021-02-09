import Vue from 'vue'
import router from "./router"
import Storage from 'vue-ls';
import axios from "axios"
import "@/css/main.css" 
import App from './App.vue'

Vue.use(Storage)
Vue.prototype.ls = Storage;
Vue.prototype.$axios = axios;
Vue.prototype.errText = "服务错误，请联系管理员！";
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
