<template>
    <div>
    </div>
</template>

<script>
export default {
    name: 'home',
    props:{
        title:String,
        to:String,
        query:{},
    },
    data(){
        return{
        }
    },
    methods:{
        showMe(){
            let gif = require("@/assets/loading.gif");
            let img = document.createElement("img");
            img.setAttribute("src", gif);
            img.setAttribute("class", "loading");
            let div = document.createElement("div");
            div.appendChild(img);
            div.setAttribute("class","mask");
            document.getElementById("app").appendChild(div);
        },
        hide(){
            let app = document.getElementById("app");
            let list = document.getElementsByClassName("mask");
            for(let i = 0; i< list.length; i++){
                app.removeChild(list[i]);
            }
        }
    }
}
</script>