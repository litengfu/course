<template>
  <div class="bottom">
    <template v-if="!nomore">
      <div @click="clickAdd">加载更多</div>
      <i class="iconfont icon-more"></i>
    </template>
    <div v-else>{{nomore}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      nomore: {
        type: String,
        default: ''
      }
    },
    methods: {
      clickAdd() {
        this.$emit('clickAdd');
      }
    }
  }
</script>
<style scoped>
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 1.3rem;
    background: white;
  }

  .bottom div {
    margin: 0.5rem 0 0.1rem 0;
    font-size: 0.3rem;
    line-height: 0.32rem;
    color: rgb(114, 114, 123);
  }

  .bottom i {
    font-size: 0.3rem;
    color: rgb(114, 114, 123);
  }
</style>