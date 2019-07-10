<template>
  <div class="problem-main">
    <dl v-for="(item,index) in problem" :key="index" class="gps-rlt">
      <dt class="gw-80" style="line-height: 0.44rem">
        题目: {{item.d_name}}
      </dt>
      <dd>
        <span class="end gdp-b">申请人: {{item.s_name}}</span>
        <span class="end gdp-b">所属专业: {{item.s_speciality}}</span>
        <span class="begin gdp-b">开始时间: {{item.d_beginTime}}</span>
        <span class="begin gdp-b">结束时间: {{item.d_endTime}}</span>
        <span class="gdp-b">导师编号: {{item.t_uid}}</span>
        <span class="gdp-b">描述: {{item.d_describe}}</span>
        <span class="gdp-b gc-red">目前状态: {{status(item.d_status)}}</span>
      </dd>
      <dd v-if="teacher" class="gps-abs answer" @click="clickPass(index, item.d_status)"
        :class="[item.d_status !=0?'active':'']">
        审核
      </dd>
      <dd>
        <confirm text="是否通过该学生的课题" ref="confirm" confirmBtnText="通过" cancelBtnText="不通过" @confirm="pass(item)"
          @cancel="nopass(item)"></confirm>
      </dd>
    </dl>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import confirm from '../../base/confirm';
  import alert from '../../base/warn/warn'
  import { getReview, getNoPass } from '../../api/teacher/teacher_personal'
  export default {
    data() {
      return {
        showAlert: false,
        temp: false,
        err: ''
      }
    },
    props: {
      problem: {
        type: Array,
        default: () => {
          return []
        }
      },
      teacher: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ok() {
        this.showAlert = false;
        if (this.temp == true) {
          window.location.reload();
        }
      },
      pass(problem) {//status:1不通过，status:2通过
        var _self = this;
        getReview(problem).then(function (res) {
          if (res.code == 0) {
            _self.temp = true;
          }
          _self.showAlert = true;
          _self.err = res.msg;
        })
      },
      nopass(problem) {//status:1不通过，status:2通过
        var _self = this;
        getNoPass(problem).then(function (res) {
          if (res.code == 0) {
            _self.temp = true;
          }
          _self.showAlert = true;
          _self.err = res.msg;
        })
      },

      clickPass(index, status) {
        if (status != 0) {
          return
        }
        this.$refs.confirm[index].show()
      },
      status(type) {
        if (type == 0) {
          return '待审核'
        }
        if (type == 1) {
          return '未通过'
        }
        if (type == 2) {
          return '已通过'
        }
      }
    },
    components: {
      confirm,
      alert
    }
  }
</script>
<style scoped>
  .problem-main {
    padding-top: 1rem;
    padding-bottom: 0.05rem;
    background: #f3f3f3;
  }

  .problem-main dl {
    margin: 0.2rem;
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

  .active {
    background: gray !important;
  }

  .answer {
    top: 1rem;
    right: 0.3rem;
    height: 0.5rem;
    width: 1rem;
    border-radius: 4px;
    line-height: 0.5rem !important;
    background: red;
    color: white !important;
    text-align: center;
  }
</style>