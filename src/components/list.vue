<template>
    <div class="house">
        <Header to="home" :title="title">
            <template v-slot:right>
                <span @click="loginOut" style="font-size:16px;margin-right:2px;">退出</span>
            </template>
        </Header>
        <div class="main">
            <div class="main-list" v-if="show">
                <h3 v-if="isNull" class="null-tip">
                    暂无人员信息！
                </h3>
                <div
                    @click="jump('listModule', item)"
                    class="list-item"
                    v-for="(item, index) in dataList"
                    :key="index"
                >
                    <van-icon name="manager-o" class="house-icon" size="24px" />
                    <div class="content">
                        <span class="content-row">
                            <span class="label">姓名&nbsp;:&nbsp;&nbsp;</span>
                            <span class="value">{{ item.name }}</span>
                        </span>
                        <span class="content-row">
                            <span class="label"
                                >组织机构&nbsp;:&nbsp;&nbsp;</span
                            >
                            <span class="value">{{groupNames(item.groupNames)}}</span>
                        </span>
                        <span class="content-row">
                            <span class="label"
                                >第一针签到状态&nbsp;:&nbsp;&nbsp;</span
                            >
                            <span class="value">{{ item.info.qiandao | state}}</span>
                        </span>
                        <span class="content-row">
                            <span class="label"
                                >第二针签到状态&nbsp;:&nbsp;&nbsp;</span
                            >
                            <span class="value">{{ item.info.qiandao2 | state}}</span>
                        </span>
                    </div>
                    <van-icon
                        class="right-icon"
                        name="edit"
                        size="24px"
                        color="rgb(25, 137, 250)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.here{
    color: rgb(255, 0, 51);
}
.null-tip{
    margin-top: 40px;
}
.owner{
    position: absolute;
    top: 52px;
    left: 41px;
}
.owner .label{
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
    content: "";
}
.add-icon {
    position: absolute;
    left: 10px;
    top: 50px;
}
</style>

<script>
import Header from "@/components/common/header";
import Vue from "vue";
import { Picker } from "vant";
import { Icon } from "vant";
import {queryList, loginOut} from "@/axiosFn/list"
import {Toast} from "vant"
import { Dialog } from "vant";

Vue.use(Icon);
Vue.use(Picker);
export default {
    name: "home",
    components: {
        Header,
    },
    filters:{
        state(v){
            return v == 1 ? "已签到" : "未签到";
        }
    },
    data() {
        return {
            show:false,
            title: "查询列表",
            dataList: [
                {
                    name:"test",
                    groupName:"testGroup",
                    state:"0",
                    state2:"1",
                },
            ],
            isNull: false,
        };
    },
    created() {
        this.init();
    },
    methods: {
        groupNames(v){
            if(typeof v != "object" || !v){
                return "";
            }
            return v[0]
        },
        loginOut(){
            Dialog.confirm({
                title: "确定",
                message: "确定要退出了嘛？",
            })
                .then(() => {
                    loginOut().then(res=>{
                        if(res.data.code != 0){
                            Toast.fail("退出失败:" + res.data.msg);
                        }
                    },()=>{
                        Toast.fail(this.errText);
                    }).finally(()=>{
                        Vue.ls.clear();
                        this.$router.push({name:"login"});
                    })
                    
                })
                .catch(() => {
                    // on cancel
                });
            this.$router.push({name:"login"})
        },
        init() {

            queryList({groups: Vue.ls.get("groups")}).then(
                (res) => {
                    if (res.status == 200) {
                        if (res.data.entity.length <= 0) {
                            this.isNull = true;
                        } else {
                            this.dataList = res.data.entity.records;
                            // res.data.entity.records.forEach((item) => {
                            //     this.dataList.push({
                            //         name: item.plateNo,
                            //         groupName: item.bindingState,
                            //         state: item.vehicleId,
                            //         state2: item.address,
                            //     });
                            // });
                        }
                    } else {
                        Toast.fail("查询失败:" + res.data.msg);
                    }
                },
                () => {
                    Toast.fail(this.errText);
                }
            ).finally(()=>{
                this.show = true;
            });
        },
        jump(v, data){
            let obj = Object.assign(data, data.info)
            this.$router.push({name:v,query:obj})
        },
        uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },
    },
};
</script>