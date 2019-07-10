<template>
  <div class="finally-container">
    <top title="我的课题"></top>
    <div class="problem-main">
      <dl v-for="(item,index) in problem" :key="index" @click="_linkDetail(item)">
        <dt>
          题目: {{item.p_name}}
        </dt>
        <dd>
          <span class="begin gdp-b">开始时间:{{item.c_beginTime}}</span>
          <span class="end gdp-b">结束时间:{{item.c_endTime}}</span>
          <template v-if="item.h_grade">
            <span class="end gdp-b">成绩:{{item.h_grade}}</span>
          </template>
          <template v-else>
            <span class="end gdp-b">成绩:待评分</span>
          </template>
        </dd>
      </dl>
    </div>
    <div v-if="!problem.length" style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
      <img src="../../../assets/images/noHistory.png" style="width:5rem;">
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import { getFinallyProblem } from '../../../api/student/student_personal';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        problem: [],
        studentrInfo: ''
      }
    },
    created() {
      var _self = this;
      this.student.then(function (res) {
        _self.studentrInfo = res
        _self._getFinallyProblem(_self.studentrInfo.s_uid);//获取课题
      })
    },
    methods: {
      _getFinallyProblem(s_uid) {
        var _self = this;
        getFinallyProblem(s_uid).then(function (res) {
          if (res.code == 0) {
            _self.problem = res.data
          }
        })
      },
      _linkDetail(item) {
        this.$router.push({ path: `/student/personal/finally/${item.c_id}` })
      }
    },
    computed: {
      ...mapGetters(['student'])
    },
    components: {
      top
    }
  }
</script>
<style scoped>
  .finally-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }

  .main {
    padding: 0 0.2rem;
    font-size: 0.36rem;
    background: white;
  }

  .main li {
    margin-bottom: 0.2rem;
  }

  .main li span {
    color: #999;
  }

  .choose dt {
    font-size: 0.34rem;
    padding: 0 0.2rem;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    background: white;
    position: absolute;
    z-index: 11;
  }

  .choose dd {
    font-size: 0.28rem;
    padding: 0 0.2rem;
    transition: all 0.5s;
  }

  .choose .hide {
    height: 0;
    overflow: hidden;
  }

  .student-main li {
    padding: 0.1rem 0;
  }

  .problem-main {
    margin-top: 1rem;
  }

  .problem-main dl {
    padding: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .problem-main dt {
    font-size: 0.34rem;
    line-height: 0.36rem;
    margin-bottom: 0.3rem;
  }

  .problem-main dd {
    font-size: 0.28rem;
    line-height: 0.3rem;
    color: #999;
  }

  .problem-main dd span {
    margin-bottom: 0.2rem;
  }
</style>