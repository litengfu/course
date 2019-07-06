<template>
  <div class="home">
    <div class="home-bottom gps-fix gps-br gw-100 gb-fff">
      <router-link to="/student/problem" class="tab-item" tag="div">
        <i class="iconfont icon-home"></i>
        <div>课题</div>
      </router-link>
      <router-link to="/student/announcement" tag="div" class="tab-item">
        <i class="iconfont icon-global"></i>
        <div>公告</div>
      </router-link>
      <router-link to="/student/addProblem">
        <div class="add">
          <i class="iconfont icon-addProblem"></i>
        </div>
      </router-link>
      <router-link to="/student/issue" tag="div" class="tab-item">
        <i class="iconfont icon-issue"></i>
        <div>消息</div>
      </router-link>
      <router-link to="/student/personal" tag="div" class="tab-item">
        <i class="iconfont icon-personal"></i>
        <div>我的</div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped>
  .home-bottom {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.28rem;
    box-shadow: 0 1px 0px 3px #f2f2f2;
    background: #251e16;
  }

  .tab-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #71777D;
  }

  .router-link-active {
    color: #ffcb04;
  }

  .add {
    height: 1rem;
    width: 1rem;
    background: #ffcb04;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-0.1rem);
    border: 0.1rem solid #251e16;
  }

  .add i {
    font-size: 0.8rem;
    color: white;
  }

  .addProblem-enter-active,
  .addProblem-leave-active {
    transition: all 1s;
  }
  .addProblem-enter,
  .addProblem-leave-to {
    transform: translateY(100%)
  }
</style>