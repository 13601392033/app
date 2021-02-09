import Vue from 'vue'
import Router from "vue-router"
import {routerMap} from "@/config"
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
    return originalPush.call(this, location).catch((err) => err);
};

let Rou = new Router({
    mode:"history",
    routes:routerMap,
})

Rou.beforeEach((to, from, next) => {
    let token = Vue.ls.get("token");
    if(!token){
        if(to.path == "/login"){
            next();
        }else{
            next({name:"login"});
        }
    }else{
        if(to.path == "/login"){
            next({name:"list"});
        }else{
            next();
        }
    }
})

export default Rou