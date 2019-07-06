<template>
  <div class="student_detail">
    <top :title="title"></top>
    <scroll :data="scrollData" class="scroll">
      <div>
        <div style="height:1rem;"></div>
        <div class="detail-header">
          <div class="addQuesstion" @click="addQuesstion">提问</div>
          <div class="addQuesstion" @click="reserveTime">预约答辩</div>
        </div>
        <ul class="detail-tab">
          <li :class="[currentTab == 1?'active':'']" @click="changeTab(1)">基本信息</li>
          <li :class="[currentTab == 2?'active':'']" @click="changeTab(2)">组员({{finallyStudent.length}}人)</li>
        </ul>
        <ul v-if="currentTab == 1" class="main gps-rlt" style="z-index:9" v-for="(item,index) in detail" :key=index>
          <li>
            发布教师:&nbsp;<span>{{item.t_name}}</span>
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
        <date-time ref="endBom" @confirm="end" format="yyyy-MM-dd hh:mm:00">
          <div slot="prevMonth"> <i>-</i> </div>
          <div slot="nextMonth"> <i>+</i> </div>
        </date-time>
        <div style="font-size:0.28rem;display: flex;justify-content: center;margin-bottom: 0.3rem">
          答辩时间:
          <span class="gc-red">
            {{showTime}}{{reserveTimeStatus(timeStatus)}}
          </span>
        </div>
      </div>
    </scroll>
    <div v-if="quesstion_text" class="content gps-abs gps-x gw-90">
      <div class="gc-red">问题: <span class="send gdp-ib gps-abs gps-x" style="bottom:0.2rem;"
          @click="_sendQuesstion">发送</span></div>
      <textarea v-model="quesstion_content" style="width:100%;padding:0.3rem;"></textarea>
    </div>
    <div v-if="quesstion_text" class="mask gps-fix gps-full" @click="hideQuesstion"></div>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import DateTime from 'vue-date-time-m'
  import scroll from '../../../base/scroll/scroll'
  import top from '../../../components/header/header';
  import alert from '../../../base/warn/warn'
  import { finally_student } from '../../../api/teacher/teacher_problem';
  import { detail } from '../../../api/student/student_problem';
  import { getAddQuesstion } from '../../../api/student/student_issue';
  import { getReserveTime } from '../../../api/student/student_personal';
  import { getdate } from '../../../assets/js/common'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        title: '',
        detail: [],
        finallyStudent: [],
        quesstion_text: false,
        quesstion_content: '',
        studentInfo: '',
        showAlert: false,
        err: '',
        c_reserveTime: '',
        timeStatus: '',
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
      reserveTimeStatus(status) {
        if (status == null) {
          return '待选择'
        }
        if (status == 0) {
          return '待确认'
        }
        if (status == 1) {
          return '拒绝'
        }
        if (status == 2) {
          return '已同意'
        }
      },
      end(val) {
        this.c_reserveTime = val;
        var _self = this;
        getReserveTime(_self.studentInfo.s_uid, _self.detail[0].p_name, _self.c_reserveTime,_self.detail[0].p_beginDate).then(function (res) {
          _self.showAlert = true;
          _self.err = res.msg;
        })
      },
      reserveTime() {
        if (this.timeStatus == 2) {
          this.showAlert = true;
          this.err = '你已预约';
          return
        }
        this.$refs.endBom.show()
      },
      ok() {
        this.showAlert = false;
        if (this.timeStatus != 2) {
          window.location.reload()
        }
      },
      hideQuesstion() {
        this.quesstion_text = false;
      },
      addQuesstion() {
        this.quesstion_text = true;
      },
      _sendQuesstion() {
        var _self = this;
        if (!_self.quesstion_content) {
          this.showAlert = true;
          this.err = '请输入问题';
          return
        }
        getAddQuesstion(_self.quesstion_content, _self.studentInfo.s_uid, _self.detail[0].t_uid, _self.detail[0].p_name).then(function (res) {
          if (res.code == 0) {
            _self.quesstion_text = false;
          }
          _self.showAlert = true;
          _self.err = res.msg
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
      scrollData(){
        return this.detail && this.finallyStudent
      },
      showTime() {
        var time = '';
        for (var i in this.finallyStudent) {
          if (this.finallyStudent[i].s_uid == this.studentInfo.s_uid) {
            console.log(this.finallyStudent[i])
            if (this.finallyStudent[i].c_reserveTime == 0) {
              time = ''
            } else {
              time = this.finallyStudent[i].c_reserveTime
            }
            this.timeStatus = this.finallyStudent[i].c_reserveTimeStatus
          }
        }
        return time
      },
      ...mapGetters(['student'])
    },
    components: {
      top,
      alert,
      DateTime,
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

  .choose dt {
    font-size: 0.34rem;
    padding: 0 0.2rem;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    background: white;
    position: relative;
    z-index: 11;
  }

  .choose {
    width: 90%;
    margin: auto;
    margin-top: 0.3rem;
    border-radius: 10px;
    padding: 0 0.3rem;
    margin-bottom: 0.3rem;
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
    border-bottom: 1px solid #f2f2f2;
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
    height: 7rem;
    border-radius: 6px;
  }

  .content textarea {
    height: 4.5rem;
    outline: none;
    border: solid 1px #999999;
    border-radius: 10px;
    margin-top: 0.2rem;
  }

  .send {
    width: 90%;
    height: 1rem;
    background-color: #fdb22a;
    border-radius: 5px;
    line-height: 1rem !important;
    color: white !important;
    text-align: center;
    font-size: 0.34rem !important;
  }

  .mask {
    background: rgba(0, 0, 0, .4);
  }

  .detail-header {
    height: 3rem;
    background: url('../../../assets/images/detail.png');
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    margin-bottom: 0.3rem;
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