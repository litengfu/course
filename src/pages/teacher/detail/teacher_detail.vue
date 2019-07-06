<template>
  <div class="teacher_detail">
    <top :title="title"></top>
    <scroll :data="scrollData" class="scroll">
      <div>
        <div style="height:1rem;"></div>
        <div class="detail-header"></div>
        <ul class="detail-tab">
          <li :class="[currentTab == 1?'active':'']" @click="changeTab(1)">基本信息</li>
          <li :class="[currentTab == 2?'active':'']" @click="changeTab(2)">已选({{chooseStudent.length}}人)</li>
          <li :class="[currentTab == 3?'active':'']" @click="changeTab(3)">最终({{finallyStudent.length}}人)</li>
        </ul>
        <ul v-if="currentTab == 1" class="main gps-rlt" style="z-index:9;" v-for="(item,index) in detail" :key=index>
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
        <dl v-if="currentTab == 2" class="choose gps-rlt" style="z-index:8;background: white;">
          <dd class="gps-rlt">
            <ul class="student-main">
              <li v-for="(item,index) in chooseStudent" :key="index" class="gps-rlt">
                <p>姓名:{{item.s_name}}</p>
                <p>学号:{{item.s_uid}}</p>
                <p>专业:{{item.s_speciality}}</p>
                <template v-if="teacherInfo.t_uid == item.t_uid">
                  <div class="gps-abs confirm" :class="[item.c_status != 0?'active':'']"
                    @click="confirm(item.c_status,item.s_name,item.p_name,item.s_uid,item.c_beginTime)">
                    同意
                  </div>
                  <div class="gps-abs confirm" style="right:1.5rem;" :class="[item.c_status != 0?'active':'']"
                    @click="reject(item.c_status,item.s_name,item.p_name,item.s_uid,item.c_beginTime)">
                    拒绝
                  </div>
                </template>
              </li>
            </ul>
          </dd>
        </dl>
        <dl v-if="currentTab == 3" class="choose gps-rlt" style="background: white;">
          <dd class="gps-rlt">
            <ul class="student-main">
              <li v-for="(item,index) in finallyStudent" :key="index">
                <p>姓名:{{item.s_name}}</p>
                <p>学号:{{item.s_uid}}</p>
                <p>专业:{{item.s_speciality}}</p>
                <template v-if="item.h_grade">
                  <p>成绩:{{item.h_grade}}</p>
                </template>
                <template v-if="teacherInfo.t_uid == item.t_uid">
                  <p style="height: 1rem;display: flex;align-items: center;">
                    <span class="gdp-ib addgrade" @click="showAddgrade(item)"
                      :class="[item.h_grade?'haveGrade':'']">评分</span>
                    <span class="gdp-ib addgrade" @click="showUPdateGrade(item)" :class="[item.h_grade?'':'haveGrade']"
                      style="background:#15faac;margin-left: 0.2rem;">修改</span>
                  </p>
                </template>
              </li>
            </ul>
          </dd>
        </dl>
        <alert type='confirm' :showstate='show' @took='ok' @tocancel='cancel'>
          <div slot='text'>{{pre}}选择:{{msg}}</div>
        </alert>
        <alert type='alert' :showstate='showAlert' @took='cancel'>
          <div slot='text'>提示</div>
          <div slot='text'>{{err}}</div>
        </alert>
        <alert type='confirm' :showstate='showGrade' @took='addgrade' @tocancel='cancel'>
          <div slot='text'>
            成绩:
            <div class="l-grade">
              <input type="number" v-model="grade">
            </div>
          </div>
        </alert>
        <alert type='confirm' :showstate='showUpdate' @took='updateGrade' @tocancel='cancel'>
          <div slot='text'>
            修改成绩:
            <div class="l-grade">
              <input type="number" v-model="grade_update">
            </div>
          </div>
        </alert>
      </div>
    </scroll>
  </div>
</template>
<script>
  import top from '../../../components/header/header'
  import alert from '../../../base/warn/warn'
  import scroll from '../../../base/scroll/scroll'
  import { mapGetters } from 'vuex';
  import { detail, choose_student, finally_student, confirmStudent, getAddGrade, getUpdateGrade } from '../../../api/teacher/teacher_problem'
  import { getdate } from '../../../assets/js/common'
  export default {
    data() {
      return {
        title: '',
        detail: [],
        chooseStudent: [],
        finallyStudent: [],
        show: false,
        showAlert: false,
        showGrade: false,
        showUpdate: false,
        msg: '',
        pre: '',
        err: '',
        sendInfo: {},
        teacherInfo: '',
        currentTab: 1,
        grade: '',
        grade_update: ''
      }
    },
    created() {
      var _self = this;
      let id = this.$route.params.id;
      this._getDetail(id).then(function (res) {
        _self._getChooseStudent(res[0].p_name, res[0].p_beginDate, res[0].p_endDate)//获取选择该课题的学生
        _self._getFinallyStudent(res[0].p_name, res[0].p_beginDate, res[0].p_endDate)//获取选择该课题的学生
      })//获取课题详情
      this.teacher.then(function (res) {
        _self.teacherInfo = res
      });//获取教师信息
    },
    computed: {
      scrollData() {
        return this.detail && this.chooseStudent && this.finallyStudent
      },
      ...mapGetters(['teacher'])
    },
    methods: {
      showUPdateGrade(item) {
        if (!item.h_grade) {
          return
        }
        this.showUpdate = true;
        this.gradeInfo = item;
      },
      updateGrade() {
        var _self = this;
        if (!this.grade_update) {
          this.showAlert = true;
          _self.showUpdate = false;
          this.err = '请输入成绩'
          return
        }
        this.gradeInfo.h_grade = this.grade_update;
        getUpdateGrade(this.gradeInfo).then(function (res) {
          _self.showUpdate = false;
          _self.showAlert = true;
          _self.err = res.msg;
        })
      },
      showAddgrade(item) {
        if (item.h_grade) {
          return
        }
        this.showGrade = true;
        this.gradeInfo = item;
      },
      addgrade() {
        var _self = this;
        if (!this.grade) {
          this.showAlert = true;
          _self.showGrade = false;
          this.err = '请输入成绩'
          return
        }
        this.gradeInfo.h_grade = this.grade;
        getAddGrade(this.gradeInfo).then(function (res) {
          _self.showGrade = false;
          _self.showAlert = true;
          _self.err = res.msg;
        })
      },
      confirm(status, s_name, p_name, s_uid, c_beginTime) {
        if (status != 0) {
          return
        }
        this.show = true;
        this.msg = s_name;
        this.pre = '同意';
        this.sendInfo = {
          p_name,
          s_uid,
          c_status: 2,
          c_beginTime
        }
      },
      reject(status, s_name, p_name, s_uid, c_beginTime) {
        if (status != 0) {
          return
        }
        this.show = true;
        this.msg = s_name;
        this.pre = '拒绝';
        this.sendInfo = {
          p_name,
          s_uid,
          c_status: 1,
          c_beginTime
        }
      },
      ok() {
        var _self = this;
        this.show = false;
        confirmStudent(this.sendInfo).then(function (res) {
          if (res.code == 0) {
            window.location.reload()
          } else {
            _self.showAlert = true;
            _self.err = res.msg;
          }
        })
      },
      cancel() {
        this.show = false;
        this.showAlert = false;
        this.showGrade = false;
        this.showUpdate = false
      },
      _getdate(time) {
        return getdate(time)
      },
      _getFinallyStudent(name, p_beginTime, p_endTime) {
        let _self = this;
        finally_student(name, p_beginTime, p_endTime).then(function (res) {
          if (res.code == 0) {
            _self.finallyStudent = res.data
          }
        })
      },
      _getChooseStudent(name, p_beginTime, p_endTime) {
        let _self = this;
        choose_student(name, p_beginTime, p_endTime).then(function (res) {
          if (res.code == 0) {
            _self.chooseStudent = res.data
          }
        })
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
      changeTab(index) {
        this.currentTab = index;
      }
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

  .teacher_detail {
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

  .student-main li {
    border-bottom: 0.02rem solid #f2f2f2;
    background: white;
  }

  .confirm {
    right: 0.3rem;
    height: 0.5rem;
    width: 1rem;
    border-radius: 4px;
    line-height: 0.5rem !important;
    background: red;
    color: white !important;
    text-align: center;
  }

  .confirm.active {
    background: gray;
  }

  .detail-header {
    height: 3rem;
    background: url('../../../assets/images/detail.png');
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

  .l-describe {
    height: auto !important;
    min-height: 1rem;
  }

  .addgrade {
    height: 0.5rem;
    width: 1rem;
    border-radius: 4px;
    line-height: 0.5rem !important;
    background: #fac127;
    color: white !important;
    text-align: center;
  }

  .l-grade {
    height: 0.7rem;
    width: 2rem;
    border: solid 1px #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .l-grade input {
    height: 70%;
    width: 100%;
    padding: 0.05rem;
    outline: none;
    border: none;
  }

  .haveGrade {
    background: gray !important;
  }
</style>