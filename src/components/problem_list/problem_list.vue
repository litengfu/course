<template>
  <div class="problem-main">
    <dl v-for="(item,index) in problem" :key="index" @click="linkDetail(item)">
      <dt>
        题目: {{item.p_name}}
        <div style="margin:0.1rem 0;font-size:0.28rem;">
          <i class="iconfont icon-people" style="font-size:0.32rem;margin-right:0.1rem;"></i>
          <span class="gc-red">{{item.p_chooseNumber}}人选择</span>
        </div>
      </dt>
      <dd>
        <span class="begin gdp-b">开始时间:{{item.p_beginDate}}</span>
        <span class="end gdp-b">结束时间:{{item.p_endDate}}</span>
        <span class="end gdp-b">所属专业:{{item.p_speciality}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
  export default {
    props: {
      problem: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      linkDetail(item) {
        this.$emit('linkDetail',item)
      }
    }
  }
</script>
<style scoped>
  .problem-main {
    padding-top:1rem;
    padding-bottom: 0.05rem;
    background: #f3f3f3;
  }

  .problem-main dl {
    margin:0.2rem;
    padding: 0.2rem;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    border-radius: 10px;
  }

  .problem-main dt {
    font-size: 0.34rem;
    line-height: 0.36rem;
    margin-bottom: 0.3rem;
  }

  .problem-main dd {
    font-size: 0.28rem;
    line-height: 0.3rem;
    color: #363636;
  }

  .problem-main dd span {
    margin-bottom: 0.2rem;
  }
</style>