<template>
  <div class="personal-container">
    <div class="personal-top gps-fix gps-tl">
      个人中心
    </div>
    <div class="personal-header gps-rlt">
      <template v-if="teacherInfo.t_avatar">
        <img :src="teacherInfo.t_avatar" class="gps-abs gps-y">
      </template>
      <template v-else>
        <img src="../../../assets/images/avatar.png" class="gps-abs gps-y">
      </template>
      <div class="name">{{teacherInfo.t_name}}</div>
      <div class="cell">{{teacherInfo.t_cellphone}}</div>
    </div>
    <ul class="personal-list">
      <li class="gps-rlt callService" @click="own">
        <i class="iconfont icon-own gps-abs gps-y" style="left:0.3rem;font-size: 0.38rem;color:red"></i>
        <span>我发布的课题</span>
        <i class="iconfont icon-next gfr"></i>
      </li>
      <li class="gps-rlt" @click="other">
        <i class="iconfont icon-student gps-abs gps-y" style="left:0.3rem;font-size: 0.38rem;color:red"></i>
        <span>学生自拟的课题</span>
        <i class="iconfont icon-next gfr"></i>
      </li>
      <li class="gps-rlt" @click="reserve">
          <i class="iconfont icon-time gps-abs gps-y" style="left:0.3rem;font-size: 0.38rem;color:red"></i>
          <span>学生预约答辩</span>
          <i class="iconfont icon-next gfr"></i>
        </li>
      <li @click="account" class="gps-rlt">
        <i class="iconfont icon-set gps-abs gps-y" style="left:0.3rem;font-size: 0.38rem;color:red"></i>
        <span>账号管理</span>
        <i class="iconfont icon-next gfr"></i>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        teacherInfo:''
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
      });//获取教师信息
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    methods: {
      account(){
        this.$router.push({path:'/teacher/personal/account'})
      },
      own(){
        this.$router.push({path:'/teacher/personal/own'})
      },
      other(){
        this.$router.push({path:'/teacher/personal/other'})
      },
      reserve(){
        this.$router.push({path:'/teacher/personal/reserve'})
      }
    }
  }
</script>
<style scoped>
  .personal-top {
    height: 1rem;
    width: 100%;
    background-color: #251e16;
    line-height: 1rem;
    color: #ffffff;
    font-size: 0.36rem;
    padding-left: 0.23rem;
  }

  .personal-header {
    height: 1.8rem;
    padding: 0.3rem 0.3rem 0.3rem 1.65rem;
    margin-top: 1rem;
    color: #ffffff;
    background-color: #251e16;
  }

  .personal-header img {
    width: 1.2rem;
    height: 1.2rem;
    left: 0.23rem;
    border: 0.04rem solid #ffffff;
    border-radius: 50%;
  }

  .personal-header .name {
    font-size: 0.36rem;
    line-height: 0.4rem;
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
  }

  .personal-header .cell {
    font-size: 0.32rem;
    line-height: 0.36rem;
  }

  .personal-list li {
    list-style: none;
    font-size: 0.31rem;
    line-height: 1rem;
    height: 1rem;
  }

  .personal-list li {
    padding: 0 0.3rem 0 0.9rem;
    border-bottom: 0.02rem solid #f2f2f2;
  }

  .personal-list .list-icon {
    width: 0.4rem;
    left: 0.3rem;
  }

  .personal-list span {
    vertical-align: middle;
  }

  .personal-list .list-right {
    width: 0.15rem;
    right: 0.3rem;
  }
</style>