<template>
  <div class="addproblem-container">
    <top title="添加课题"></top>
    <div style="height:1rem"></div>
    <ul class="addMain">
      <li class="gavg">
        <div class="gfl gw-20">课题</div>
        <div class="gfl gw-80 gh-70">
          <input type="text" placeholder="请填写课题名" v-model="info.d_name">
        </div>
      </li>
      <li class="gavg">
          <div class="gfl gw-20">教师编号</div>
          <div class="gfl gw-80 gh-70" style="padding:0 0.1rem;">
            <input type="number" placeholder="请填写教师编号" v-model="info.t_uid">
          </div>
        </li>
      <li class="gavg">
        <div class="gfl gw-20">开始时间</div>
        <div class="gfr gw-80 gh-70" style="padding:0 0.1rem;">
          <input type="text" placeholder="开始时间" @click="beginShow" v-model="info.d_beginTime">
          <date-time type="date" ref="beginBom" @confirm="begin" format="yyyy-MM-dd">
            <div slot="prevMonth"> <i>-</i> </div>
            <div slot="nextMonth"> <i>+</i> </div>
          </date-time>
        </div>
      </li>
      <li class="gavg">
        <div class="gfl gw-20">结束时间</div>
        <div class="gfl gw-80 gh-70" style="padding:0 0.1rem;">
          <input type="text" placeholder="结束时间" @click="endShow" v-model="info.d_endTime">
          <date-time type="date" ref="endBom" @confirm="end" format="yyyy-MM-dd">
            <div slot="prevMonth"> <i>-</i> </div>
            <div slot="nextMonth"> <i>+</i> </div>
          </date-time>
        </div>
      </li>
      <li class="gavg" style="height:4.5rem;">
        <div class="gfl gw-20">描述</div>
        <div class="gfl gw-80 gh-70">
          <textarea style="width:100%;height:100%;padding:0.1rem;" v-model="info.d_describe">

          </textarea>
        </div>
      </li>
    </ul>
    <div style="height:0.1rem;"></div>
    <div class="gw-70 add-problem" @click="addBtn">
      添加课题
    </div>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import DateTime from 'vue-date-time-m'
  import top from '../../../components/header/header'
  import alert from '../../../base/warn/warn'
  import { mapGetters } from 'vuex';
  import { addProblem } from '../../../api/student/student_problem'
  export default {
    data() {
      return {
        info: {
          d_name: '',
          t_uid:'',
          d_beginTime: '',
          d_endTime: '',
          d_describe: '',
          s_uid:''
        },
        infoChinese: {
          d_beginTime: '开始时间',
          d_endTime: '结束时间',
          d_name: '课题',
          d_describe: '描述',
          t_uid:'教师编号'
        },
        studentInfo: '',
        err: '',
        showAlert: false
      }
    },
    created() {
      var _self = this;
      this.student.then(function (res) {
        _self.studentInfo = res
        _self.info.s_uid = _self.studentInfo.s_uid || true
      });//获取学生信息
    },
    computed: {
      ...mapGetters(['student'])
    },
    methods: {
      addBtn() {
        var _self = this;
        var fail = false;
        for (var i in _self.info) {
          if (!_self.info[i]) {
            _self.showAlert = true;
            _self.err = _self.infoChinese[i] + ' ' + '不能为空'
            fail = true;
            return
          }
        }
        if (fail) {
          return
        }
        this._addProblem(this.info)
      },
      _addProblem(info){
        var _self = this;
        addProblem(info).then(function(res){
          if (res.code == -2) {
            _self.login = false
          }
          _self.showAlert = true;
          _self.err = res.msg
        })
      },
      ok(){
        this.showAlert = false
        if (this.login == false) {
          this.$router.push({ path: `/`})
        }
      },
      beginShow() {
        this.$refs.beginBom.show()
      },
      begin(val) {
        this.info.d_beginTime = val
      },
      endShow() {
        this.$refs.endBom.show()
      },
      end(val) {
        this.info.d_endTime = val
      }
    },
    components: {
      top,
      DateTime,
      alert
    }
  }
</script>
<style scoped>
  .addproblem-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }

  .addMain {
    font-size: 0.34rem;
    padding: 0.23rem;
  }

  .addMain li {
    height: 1.2rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #f2f2f2;
  }

  .addMain li input {
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    font-size: 0.3rem;
  }

  .add-problem {
    height: 1rem;
    font-size: 0.4rem;
    line-height: 1rem;
    margin: auto;
    text-align: center;
    border: 1px solid #263391;
    border-radius: 4px;
  }

  .add-problem:active {
    background: #263391;
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