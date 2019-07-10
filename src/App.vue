<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/js/rem.js';
export default {
  name: 'app'
}
</script>

<style>
  @import "./assets/fonts/iconfont.css";
  @import "./assets/css/gast.css";
  html{
    width: 100vw;
    height: 100vh;
  }
  html *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a:active,a:link,a:hover,a:visited{
    text-decoration: none;
    background-color: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
