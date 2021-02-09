<template>
    <div class="house">
        <Header to="list" :title="title" :show="true">
        </Header>
        <van-form validate-first @failed="onFailed" @submit="onSubmit">
            <van-field v-model="no"
                       name="no"
                       label="人员编码"
                       disabled />

            <van-field v-model="name"
                       name="name"
                       label="姓名"
                       disabled />

            <van-field v-model="groupName"
                       name="groupName"
                       label="组织机构"
                       disabled />

            <van-field v-model="phone"
                       name="phone"
                       label="手机号码"
                       disabled />

            <van-field v-model="firstTime"
                       name="firstTime"
                       label="第一针"
                       disabled />
            
            <van-field v-model="secondTime"
                       name="secondTime"
                       label="第二针"
                       disabled />

            <van-field
                readonly
                clickable
                name="picker"
                :value="state"
                label="第一针签到状态"
                placeholder="点击选择签到状态"
                @click="showState = true"
            />
            <van-popup v-model="showState" position="bottom">
                <van-picker
                    show-toolbar
                    :default-index="stateIndex"
                    ref="type"
                    :columns="stateColumns"
                    @confirm="onConfirmState"
                    @cancel="showState = false"
                />
            </van-popup>

            <van-field
                readonly
                clickable
                name="picker"
                :value="firstWhy"
                label="第一针未打原因"
                placeholder="点击选择未打原因"
                @click="showFirstWhy = true"
            />
            <van-popup v-model="showFirstWhy" position="bottom">
                <van-picker
                    show-toolbar
                    :default-index="firstWhyIndex"
                    ref="type"
                    :columns="whyColumns"
                    @confirm="onConfirmFirstWhy"
                    @cancel="showFirstWhy = false"
                />
            </van-popup>

            <!-- <van-field v-model="firstWhy"
                       name="first"
                       label="第一针未打原因"
                       /> -->

            <van-field
                readonly
                clickable
                name="picker"
                :value="state2"
                label="第二针签到状态"
                placeholder="点击选择签到状态"
                @click="showState2 = true"
            />

            <van-popup v-model="showState2" position="bottom">
                <van-picker
                    show-toolbar
                    :default-index="stateIndex2"
                    ref="type"
                    :columns="stateColumns"
                    @confirm="onConfirmState2"
                    @cancel="showState2 = false"
                />
            </van-popup>


            <van-field
                readonly
                clickable
                name="picker"
                :value="secondWhy"
                label="第二针未打原因"
                placeholder="点击选择未打原因"
                @click="showSecondWhy = true"
            />
            <van-popup v-model="showSecondWhy" position="bottom">
                <van-picker
                    show-toolbar
                    :default-index="secondWhyIndex"
                    ref="type"
                    :columns="whyColumns"
                    @confirm="onConfirmSecondWhy"
                    @cancel="showSecondWhy = false"
                />
            </van-popup>
            <!-- <van-field v-model="secondWhy"
                       name="second"
                       label="第二针未打原因"
                       /> -->
            <div style="margin: 16px;">
                <van-button round
                            block
                            type="info"
                            native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped>
.here {
    color: rgb(255, 0, 51);
}
.null-tip {
    margin-top: 40px;
}
.owner {
    position: absolute;
    top: 52px;
    left: 41px;
}
.owner .label {
    font-size: 14px;
}

.right-icon {
    position: absolute;
    right: 15px;
    top: 47%;
    transform: translateY(-50%);
}
.del-icon {
    position: absolute;
    right: 52px;
    top: 47%;
    transform: translateY(-50%);
}
.house-icon {
    position: absolute;
    top: 47%;
    transform: translateY(-50%);
    left: 12px;
}
.content-row {
    display: block;
    margin-top: 1px;
    width: 220px;
    text-align: left;
}
.content {
    display: inline-block;
    font-size: 12px;
    left: 50px;
    position: relative;
    padding: 25px 0;
    left: 0;
    width: 66%;
}
.ell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.house {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    background: #f7f8fa;
}
.main {
    background: #f7f8fa;
}
.list-item {
    width: 100%;
    position: relative;
    letter-spacing: 1px;
    margin: 40px 0;
    overflow: hidden;
    background: #fff;
}
.list-item::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
    );
    /* background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%); */
    background-size: 80px;
    content: '';
}
.add-icon {
    position: absolute;
    left: 10px;
    top: 50px;
}
</style>

<script>
import Header from '@/components/common/header'
import Vue from 'vue'
import { Picker } from 'vant'
import {update} from "@/axiosFn/list"
import { Icon } from 'vant'
import { Toast } from 'vant'
import { Button } from 'vant'
import { Form } from 'vant'
import { Field } from 'vant'
import { Popup } from 'vant';
import { Dialog } from "vant";

Vue.use(Popup);
Vue.use(Field)
Vue.use(Form)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Picker)
export default {
    name: 'home',
    components: {
        Header,
    },
    data() {
        return {
            data:this.$route.query,
            title: '人员编辑',
            no:"",
            name:"",
            groupName:"",
            phone:"23123123",
            firstWhy:"",
            secondWhy:"",
            state:"",
            state2:"",

            firstWhyIndex:undefined,
            secondWhyIndex:undefined,
            showFirstWhy:false,
            showSecondWhy:false,
            whyColumns:[
                "因事未到场需再次安排",
                "第一剂出现异常反应",
                "因禁忌症暂缓接种",
                "因禁忌症不能接种",
                "超年龄不能接种",
                "因已返乡等原因不能接种",
                "拒绝接种"
            ],

            showState2:false,
            showState:false,
            stateIndex:undefined,
            stateValue:"",
            state2Value:"",
            stateIndex2:undefined,
            firstTime:"",
            secondTime:"",
            stateColumns:[
                {text:"已签到", code : 1},
                {text:"未签到", code : 2},
            ]
        }
    },
    created() {
        console.log(this.data)
        this.init()
        
    },
    methods: {
        searchIndex(v){
            for(let i = 0; i< this.whyColumns.length; i++){
                let item = this.whyColumns[i];
                if(v == item){
                    return i;
                }
            }
        },
        onConfirmFirstWhy(v){
            this.firstWhy = v;
            this.showFirstWhy = false;
        },
        onConfirmSecondWhy(v){
            this.secondWhy = v;
            this.showSecondWhy = false;
        },
        onSubmit(){
            update({
                id: this.data.id,
                info:{
                    qiandao: parseInt(this.stateValue),
                    qiandao2: parseInt(this.state2Value),
                    diyiweida: this.firstWhy,
                    dierweida: this.secondWhy,
                }
            }).then(res=>{
                if(res.data.code == 0){
                    Dialog.alert({message: "修改成功！",}).then(() => {
                        this.$router.push({name:"list"})
                    });
                }else{
                    Toast.fail('操作失败:' + res.data.msg);
                }
                console.log(res)
            },()=>{
                Toast.fail(this.errText)
            })
        },
        stateFilter(v){
            let ret = {};
            if(v == 1){
                ret = {
                    text:"已签到",
                    val:1
                };
            }else{
                ret = {
                    text:"未签到",
                    val:2
                };
            }
            return ret;
        },
        init(){
            this.no = this.data.no;
            this.name = this.data.name;
            this.phone = this.data.phone;
            if(typeof this.data.groupNames == "object" && this.data.groupNames != null){
                this.groupName = this.data.groupNames[0];
            }else{
                this.groupName = this.data.groupNames;
            }
            
            this.firstTime = this.timeToDate(this.data.diyizhen);
            this.secondTime = this.timeToDate(this.data.diershijian);
            this.firstWhy = this.data.diyiweida;
            this.secondWhy = this.data.dierweida;
            this.firstWhyIndex = this.searchIndex(this.data.diyiweida);
            this.secondWhyIndex = this.searchIndex(this.data.dierweida);
            let s1 = this.stateFilter(this.data.qiandao);
            let s2 = this.stateFilter(this.data.qiandao2);
            this.stateValue = this.data.qiandao;
            this.state2Value = this.data.qiandao2;
            this.state = s1.text;
            this.stateIndex = s1.val;
            this.state2 = s2.text;
            this.stateIndex2 = s2.val;
        },
        timeToDate(v){
            if(!v){
                return "";
            }
            let date = new Date(parseInt(v));
            let month = (date.getMonth()+1);
            let str = date.getFullYear() + "-" + month + "-" + date.getDate()
            return str;
        },
        onConfirmState(v){
            this.state = v.text;
            this.stateValue = v.code;
            this.showState = false;
        },
        onConfirmState2(v){
            this.state2 = v.text;
            this.state2Value = v.code;
            this.showState2 = false;
        },
        onFailed(errorInfo) {
            console.log('failed', errorInfo)
        },
        jump(v) {
            console.log(v)
            this.$router.push({ name: v })
        },
    },
}
</script>