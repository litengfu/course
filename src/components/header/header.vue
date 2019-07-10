<template>
  <div class="header">
    <div class="top gps-rlt gtc gps-fix gps-tl">
      <i class="iconfont icon-prev gps-abs gps-y" @click="back"></i>
      <span>{{title}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title:{
        type:String,
        default: '头部'
      }
    },
    methods: {
      back(){
        this.$router.back();
      }
    }
  }
</script>
<style scoped>
  .top{
    height: 1rem;
    width: 100%;
    background: #ff689b;
    font-size: 0.4rem;
    font-weight: bold;
    line-height: 1rem;
    color: white;
    background: #251e16;
  }
  .top i{
    font-size: 0.44rem;
    left:0.1rem;
  }
</style>