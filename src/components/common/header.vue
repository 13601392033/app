<template>
    <div class="header">
        <div class='left fl' v-if="show">
            <van-icon class="icon" size="20" @click="jump" name="arrow-left" />
        </div>

        <div class="middle fl">
            {{title}}
        </div>

        <div class="rl">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<style scoped>
.rl{
    float:right;
}
.icon{
    position: absolute;
    left:5px;
    top: 50%;
    transform: translateY(-50%);
}
.middle{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.left{
    line-height: 40px;
}
.header{
    position: relative;
    width:100%;
    background: #fff;
    height:40px;
    line-height: 40px;
    border-bottom:1px solid #ddd;
}
.fl{
    float:left
}
</style>

<script>
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
    name: 'home',
    props:{
        title:String,
        to:String,
        query:{},
        show:{
            default:false,
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        jump(){
            this.$router.push({name: this.to, query:this.query});
        }
    }
}
</script>