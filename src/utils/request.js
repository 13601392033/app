import Vue from 'vue'
import vueCookies from 'vue-cookies'
import axios from 'axios'
import { Toast } from "vant";
import router from "@/router"
import Wait from "@/components/common/waiting";
import Qs from 'qs'

Vue.use(Wait);
Vue.use(Toast)
Vue.use(vueCookies);

axios.prototype.baseUrl = "/api";

let baseUrl = "";
baseUrl = "http://123.59.211.242:80"//外网地址

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 60000;
axios.defaults.headers = {
    //请求的方式
    'Accept': 'application/json, text/plain, */*',
    // 'Content-type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    //"Content-Type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Origin': '*',
}

axios.interceptors.request.use(
    config => {
        if(config.type == "www"){
            config.headers["Content-Type"] = "application/x-www-form-urlencoded"
            config.data = Qs.stringify(config.data)
        }
        console.log(Vue.ls)
        var t = Vue.ls.get("token");
        if (t) {
            config.headers['token'] = t
        }
        Wait.methods.showMe();
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use((response)=>{
    if(response.data.message == "error"){//token失效过期
        Vue.ls.clear();
        router.push({name:"login"});
    }
    Wait.methods.hide();
    return response;
}, (error)=>{
    console.log(error)
    Wait.methods.hide();
    let originalRequest = error.config;
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        Toast.fail("连接超时，请检查网络重试！");
        return error;
    }
    return Promise.reject(error);
});

export default axios
