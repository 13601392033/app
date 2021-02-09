<template>
    <div id="app">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
}
body{
    margin:0;
}

.fade-enter-active,
.fade-leave-active,
.fade-enter-active,
.fade-leave-active {
    will-change: transform;
    transition: transform 300ms;
    position: fixed !important;
}
.fade-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.fade-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
</style>
