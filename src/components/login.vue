<template>
    <div class="login" :style="{ background: 'url(' + login2 + ') no-repeat' }">
        <div class="header">
            <h3 class="title">360防疫平台</h3>
        </div>
        <div class="main">
            <!-- <div class="item">
                <input
                    class="input"
                    v-model="phone"
                    placeholder="请输入手机号"
                    type="text"
                />
            </div>
            <div class="line" style="margin: 15px auto"></div> -->
            <div class="item">
                <input
                    class="input"
                    v-model="account"
                    placeholder="请输入账号"
                    type="text"
                />
            </div>
            <div class="line" style="margin: 15px auto"></div>
            <div class="item">
                <input
                    class="input"
                    v-model="password"
                    placeholder="请输入密码"
                    type="password"
                />
            </div>
            <div class='line'></div>
            <div>
                <van-button
                    @click="submit"
                    class="submit-btn"
                    round
                    block
                    type="info"
                    native-type="submit"
                >
                    登录
                </van-button>
                <!-- <div @click="toRegister" class="register">注册</div>
                <div @click="toForget" class="forgetPass">忘记密码</div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.slider-text{
    position: absolute;
    top: 1px;
    color: #888;
    left: 50%;
    transform: translateX(-50%);
}
.slider{
    height:25px !important;
}
.manual {
    font-size: 12px;
    width: 90%;
    text-align: left;
    margin-left: 7px;
}
.tip {
    font-size: 12px;
}
.footer {
    line-height: 23px;
}
.footer::after {
    content: "";
    clear: both;
    display: block;
}
.fl {
    float: left;
}
.privacy {
    float: left;
    width: 100%;
}
.privacy::after {
    content: "";
    clear: both;
    display: block;
}
.main > div {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}
.forgetPass{
    float: right;
    text-align: right;
    margin-top: 15px;
    font-size: 16px;
}
.register {
    float: left;
    text-align: right;
    margin-top: 15px;
    font-size: 16px;
}
.header {
    top: 15%;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
}
.title {
    letter-spacing: 3px;
    font-size: 22px;
}
.code {
    min-width: 92px;
    position: absolute;
    line-height: 30px;
    right: 5%;
    background: none;
    top: -5px;
    right: 0;
    font-size: 14px;
    border-radius:50px;
    height: 28px;
    color: white;
}
.submit-btn {
    margin: 0 auto;
    margin-top: 15px;
    font-size: 18px;
}
.main {
    position: relative;
    top: 35%;
}
.line {
    width: 100%;
    height: 1px;
    margin: 10px auto;
    background: #969799;
}
.input {
    text-align: left;
    border: none;
    background: none;
    width: 100%;
}
.item {
    text-align: left;
    position: relative;
    margin-left: 5%;
}
.input::-webkit-input-placeholder {
    text-align: left;
    color: #fff;
    letter-spacing: 2px;
    text-indent: 5px;
    font-size: 16px;
}
.login {
    font-size: 16px;
    color: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover !important;
}
</style>

<script>
import Vue from "vue";
import { Form } from "vant";
import { Field } from "vant";
import { Button } from "vant";
import { Toast } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import {login} from "@/axiosFn/login"

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
/* eslint-disable */
export default {
    name: "HelloWorld",
    data() {
        return {
            phone: "",
            account:"",
            password: "",
            username: "",
            login2: require("@/assets/login2.jpg"),
        };
    },
    created(){
    },
    methods: {
        toForget(){
            this.$router.push({name:'forgetPassword'});
        },
        toRegister() {
            this.$router.push({ name: "register" });
        },
        submit() {
            // let strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
            // if (!strTemp.test(this.phone)) {
            //     Toast.fail("请输入正确的手机号！");
            //     return false;
            // }
            if(!this.password){
                Toast.fail("请输入密码！");
                return false;
            }
            if(!this.account){
                Toast.fail("请输入账号！");
                return false;
            }
            login({
                passwd: this.password,
                name: this.account,
                //phone: this.phone,
            }).then(res=>{
                if(res.data.code == 0){
                    Vue.ls.set("token", res.data.data.token);
                    Vue.ls.set("groups", res.data.groups);
                    this.$router.push({name:"list"})
                }else{
                    Toast.fail(res.data.msg)
                }
            },()=>{
                Toast.fail(this.errText)
            })
        },
    },
    props: {
        msg: String,
    },
};
</script>