<template>
  <div class="finally-container">
    <top title="已选课题"></top>
    <scroll :data="problem" class="scroll">
      <div>
        <div style="height: 1rem;"></div>
        <div class="problem-main">
          <dl v-for="(item,index) in problem" :key="index">
            <dt>
              题目: {{item.p_name}}
            </dt>
            <dt>
              导师: {{item.t_name}}
            </dt>
            <dd>
              <span class="begin gdp-b">开始时间:{{item.c_beginTime}}</span>
              <span class="end gdp-b">结束时间:{{item.c_endTime}}</span>
            </dd>
            <dd>
              <span class="gc-red gdp-b">状态: {{status(item.c_status)}}</span>
            </dd>
          </dl>
        </div>
        <div v-if="!problem.length"
          style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
          <img src="../../../assets/images/noHistory.png" style="width:5rem;">
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import scroll from '../../../base/scroll/scroll'
  import { getAlready } from '../../../api/student/student_personal';
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
        _self._getAlready(_self.studentrInfo.s_uid);//获取课题
      })
    },
    methods: {
      status(type) {
        if (type == 0) {
          return '待确定'
        }
        if (type == 1) {
          return '拒绝'
        }
        if (type == 2) {
          return '已加入'
        }
      },
      _getAlready(s_uid) {
        var _self = this;
        getAlready(s_uid).then(function (res) {
          if (res.code == 0) {
            _self.problem = res.data
          }
        })
      }
    },
    computed: {
      ...mapGetters(['student'])
    },
    components: {
      top,
      scroll
    }
  }
</script>
<style scoped>
  .scroll {
    height: 100%;
    overflow: hidden;
  }
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
    background: #f3f3f3;
  }

  .problem-main dl {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    background: white;
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