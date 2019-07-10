<template>
  <div class="student_detail">
    <top :title="title"></top>
    <scroll :data="scrollData" class="scroll">
      <div>
        <div style="height:1rem;"></div>
        <div class="detail-header">
          <div class="addQuesstion" @click="add">加入</div>
        </div>
        <ul class="detail-tab">
          <li :class="[currentTab == 1?'active':'']" @click="changeTab(1)">基本信息</li>
          <li :class="[currentTab == 2?'active':'']" @click="changeTab(2)">最终({{finallyStudent.length}}人)</li>
        </ul>
        <ul v-if="currentTab == 1" class="main gps-rlt" style="z-index:9" v-for="(item,index) in detail" :key=index>
          <li>
            发布教师:&nbsp;<span>{{item.t_name}}</span>
          </li>
          <li>
            教师编号:&nbsp;<span>{{item.t_uid}}</span>
          </li>
          <li>
            联系电话:&nbsp;<span>{{item.t_cellphone}}</span>
          </li>
          <li>
            限制人数:&nbsp;<span>{{item.p_limitNumber}}人</span>
          </li>
          <li>
            已选人数:&nbsp;<span>{{item.p_chooseNumber}}人</span>
          </li>
          <li>开始时间:&nbsp;<span>{{_getdate(item.p_beginDate)}}</span></li>
          <li>截止时间:&nbsp;<span>{{_getdate(item.p_endDate)}}</span></li>
          <li>
            所属专业:&nbsp;<span>{{item.p_speciality}}</span>
          </li>
          <li class="l-describe">
            <p class="gc-red gdp-i">描述:&nbsp;</p>
            <span>{{item.p_describe}}</span>
          </li>
          <li style="height:0.2rem;margin-bottom: 0;"></li>
        </ul>
        <dl v-if="currentTab == 2" class="choose gps-rlt" style="background: white;">
          <dd class="gps-rlt">
            <ul class="student-main">
              <li v-for="(item,index) in finallyStudent" :key="index">
                <p>姓名:{{item.s_name}}</p>
                <p>学号:{{item.s_uid}}</p>
                <p>专业:{{item.s_speciality}}</p>
              </li>
            </ul>
          </dd>
        </dl>
        <alert type='alert' :showstate='showAlert' @took='ok'>
          <div slot='text'>提示</div>
          <div slot='text'>{{err}}</div>
        </alert>
      </div>
    </scroll>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import alert from '../../../base/warn/warn'
  import scroll from '../../../base/scroll/scroll'
  import { detail, finally_student } from '../../../api/teacher/teacher_problem';
  import { getAdd } from '../../../api/student/student_problem';
  import { getdate } from '../../../assets/js/common'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        title: '',
        detail: [],
        finallyStudent: [],
        studentInfo: '',
        showAlert: false,
        err: '',
        exist: false,
        currentTab: 1
      }
    },
    created() {
      var _self = this;
      let id = this.$route.params.id;
      this._getDetail(id).then(function(res){
        _self._getFinallyStudent(res[0].p_name,res[0].p_beginDate,res[0].p_endDate)//获取选择该课题的学生
      })//获取课题详情
      this.student.then(function (res) {
        _self.studentInfo = res
      });//获取学生信息
    },
    methods: {
      add() {
        var _self = this;
        var info = _self.detail[0];
        getAdd(info.p_name, info.t_uid, _self.studentInfo.s_uid, info.p_beginTime, info.p_endTime).then(function (res) {
          _self.showAlert = true;
          _self.err = res.msg;
          if (res.code == 0) {
            _self.exist = true
          }
        })
      },
      ok() {
        var _self = this;
        this.showAlert = false
        if (_self.exist) {
          window.location.reload()
        }
      },
      _getDetail(id) {
        var _self = this;
        return detail(id).then(function (res) {
          if (res.code == 0) {
            _self.title = res.data.p_name;
            if (_self.title.length > 12) {
              _self.title = _self.title.replace(_self.title.slice(12), '...')
            }
            _self.detail.push(res.data);
            return Promise.resolve(_self.detail)
          }
        })
      },
      _getdate(time) {
        return getdate(time)
      },
      _getFinallyStudent(name,p_beginTime,p_endTime) {
        let _self = this;
        finally_student(name,p_beginTime,p_endTime).then(function (res) {
          if (res.code == 0) {
            _self.finallyStudent = res.data
          }
        })
      },
      changeTab(index) {
        this.currentTab = index;
      }
    },
    computed: {
      scrollData() {
        return this.detail && this.finallyStudent
      },
      ...mapGetters(['student'])
    },
    components: {
      top,
      alert,
      scroll
    }
  }
</script>
<style scoped>
  .scroll {
    height: 100%;
    overflow: hidden;
  }

  .l-describe {
    height: auto !important;
    min-height: 1rem;
  }

  .student_detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f3f3f3;
  }

  .choose {
    width: 90%;
    margin: auto;
    margin-top: 0.3rem;
    border-radius: 10px;
    padding: 0 0.3rem;
  }

  .choose dt {
    font-size: 0.34rem;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    background: white;
    position: relative;
    z-index: 11;
  }

  .choose dd {
    font-size: 0.28rem;
  }

  .choose .hide {
    height: 0;
    overflow: hidden;
  }

  .choose ul li {
    padding: 0.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .choose ul li p {
    margin-bottom: 0.1rem;
    margin-top: 0.1rem;
  }

  .choose ul li:last-child {
    margin-bottom: 0;
  }

  .addQuesstion {
    height: 0.9rem;
    width: 70%;
    line-height: 0.9rem;
    text-align: Center;
    color: #fff;
    border-radius: 0.12rem;
    background: #488BF1;
    font-size: 0.34rem;
  }

  .content {
    font-size: 0.34rem;
    z-index: 12;
    top: 3rem;
    background: white;
    padding: 0.2rem;
    padding-bottom: 1rem;
  }

  .content textarea {
    height: 4rem;
    width: 50%;
    outline: none;
    border: none;
  }

  .mask {
    background: rgba(0, 0, 0, .4);
  }

  .showList-enter,
  .showList-leave-to {
    transform: translateY(-100%);
  }

  .showList-enter-active,
  .showList-leave-active {
    transition: all, 0.3s;
  }

  .detail-header {
    height: 3rem;
    background: url('../../../assets/images/detail.png');
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-tab {
    font-size: 0.34rem;
    display: flex;
    justify-content: space-around;
  }

  .detail-tab li {
    margin-top: 0.3rem;
    height: 0.8rem;
    width: 2.2rem;
    border-radius: 32px 32px;
    border: 2px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-tab li.active {
    background: #ffdd06;
    color: white;
  }

  .main {
    width: 90%;
    margin: auto;
    padding: 0 0.3rem;
    border-radius: 10px;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 0.36rem;
    background: white;
  }

  .main li {
    height: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }

  .main li span {
    color: #999;
  }
</style>