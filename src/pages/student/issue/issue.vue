<template>
  <div class="issue">
    <div class="issue-header">
      消息
    </div>
    <div>
      <div class="issue-main">
        <dl class="gps-rlt" v-for="(item,index) in issueContent" :key="index">
          <dt class="gw-85 gps-rlt" style="padding-left:0.9rem;">
            <p class="gps-abs gps-tl" style="line-height: 0.5rem;">课题:</p><span>{{item.p_name}}</span>
          </dt>
          <dt class="gw-85 gps-rlt" style="padding-left:0.9rem;">
            <p class="gps-abs gps-tl"><span class="l-quesition">问</span></p> <span
              class="gdp-ib gw-100">{{item.m_describe}}</span>
          </dt>
          <dt v-if="item.m_status == 1" class="gw-85 gps-rlt" style="padding-left:0.9rem;">
            <p class="gps-abs gps-tl"><span class="l-answer">答</span></p> <span
              class="gdp-ib gw-100">{{item.m_answer}}</span>
          </dt>
          <dd>
            <span class="gdp-b">提问时间: {{item.m_time}}</span>
            <span class="gdp-b">提问状态: {{status(item.m_status)}}</span>
          </dd>
          <dd v-if="item.m_status == 0" class="no_answer gps-abs">
            <div>
              未回答
            </div>
          </dd>
          <dd v-if="item.m_status == 1" class="_answer gps-abs">
            <div>
              已回答
            </div>
          </dd>
        </dl>
      </div>
      <more v-if="issueContent.length" :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
      <div v-else
        style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
        <img src="../../../assets/images/noHistory.png" style="width:5rem;">
      </div>
    </div>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import more from '../../../base/more/more';
  import { getStudentIssue } from '../../../api/student/student_issue'
  import { mapGetters } from 'vuex';
  import alert from '../../../base/warn/warn'
  export default {
    data() {
      return {
        page: 1,
        nomore: '',
        showAlert: false,
        err: '',
        issueContent: [],
        studentInfo: '',
        showText: -1
      }
    },
    created() {
      var _self = this;
      this.student.then(function (res) {
        _self.studentInfo = res
        _self._getStudentIssue(_self.page, _self.studentInfo.s_uid)//根据教师uid获取问题
      });//获取学生信息
    },
    computed: {
      ...mapGetters(['student'])
    },
    methods: {
      _getStudentIssue(page, s_uid) {
        let _self = this;
        getStudentIssue(page, s_uid).then(function (res) {
          if (res.code == 0) {
            _self.issueContent = _self.issueContent.concat(res.data);
            for (var i in _self.issueContent) {
              _self.issueContent[i].showText = false;
            }
          }
          if (res.code != 0) {
            _self.nomore = res.msg;
          }
        })
      },
      status(num) {
        if (num == 0) {
          return '未回答'
        }
        if (num == 1) {
          return '已回答'
        }
      },
      ok() {
        this.showAlert = false
      },
      _clickAdd() {
        var _self = this
        this.page++;
        this._getStudentIssue(_self.page, _self.studentInfo.s_uid);
      }
    },
    components: {
      more,
      alert
    }
  }
</script>
<style scoped>
  .issue-header {
    position: fixed;
    top: 0;
    height: 1rem;
    width: 100%;
    line-height: 1rem;
    font-size: 0.38rem;
    background: #251e16;
    color: white;
    text-align: center;
    z-index: 11;
  }

  .issue-tab {
    position: fixed;
    top: 1rem;
    width: 100%;
    background: #251e16;
    z-index: 11;
  }

  .issue-tab ul {
    display: flex;
    color: white;
    font-size: 0.3rem;
  }

  .issue-tab ul li {
    height: 1rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .issue-tab ul .active::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: #ffcb04;
  }

  .issue-main {
    background-color: #f0f0f0;
    padding-top: 1rem;
    padding-bottom: 0.05rem;
  }

  .issue-main dt {
    font-size: 0.34rem;
    line-height: 0.36rem;
    margin-bottom: 0.3rem;
  }

  .issue-main dl {
    margin: 0.2rem;
    padding: 0.2rem;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    border-radius: 10px;
  }

  .issue-main dl span {
    color: #363636;
    line-height: 0.5rem;
  }

  .issue-main dd {
    font-size: 0.28rem;
    line-height: 0.3rem;
    color: #999;
  }

  .issue-main dd span {
    margin-bottom: 0.2rem;
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

  .send {
    height: 0.5rem;
    width: 1rem;
    border-radius: 4px;
    line-height: 0.5rem !important;
    background: red;
    color: white !important;
    text-align: center;
  }

  .mask {
    background: rgba(0, 0, 0, .4);
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

  .answer.active {
    background: gray;
  }

  .announcement-wrap {
    padding: 0.2rem;
    position: absolute;
    top: 2rem;
    bottom: 1rem;
    width: 100%;
  }

  .announcement-wrap li {
    padding: 0.1rem 0;
    font-size: 0.34rem;
    border-bottom: 1px solid #f2f2f2;
    height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .l-quesition {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #ff5353;
    border-radius: 4px;
    line-height: 0.5rem;
    text-align: center;
    color: white !important;
  }

  .l-answer {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #fedc47;
    border-radius: 4px;
    line-height: 0.5rem;
    text-align: center;
    color: white !important;
  }

  .no_answer {
    height: 1.8rem;
    width: 1.8rem;
    border: 0.5rem solid transparent;
    border-bottom: 0.5rem solid #ff4c39;
    color: white !important;
    right:-0.9rem;
    top: -0.9rem;
    transform:rotate(45deg);
  }
  .no_answer div{
    width: 1rem;
    height:0.5rem;
    letter-spacing: 0.05rem;
    position: absolute;
    bottom: -0.63rem;
  }
  ._answer{
    height: 1.8rem;
    width: 1.8rem;
    border: 0.5rem solid transparent;
    border-bottom: 0.5rem solid #00d4c3;
    color: white !important;
    right:-0.9rem;
    top: -0.9rem;
    transform:rotate(45deg);
  }
  ._answer div{
    width: 1rem;
    height:0.5rem;
    letter-spacing: 0.05rem;
    position: absolute;
    bottom: -0.63rem;
  }
</style>