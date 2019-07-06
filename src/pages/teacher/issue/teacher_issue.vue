<template>
  <div class="issue">
    <div class="issue-header">
      消息
    </div>
    <div>
      <div class="issue-main">
        <dl class="gps-rlt" v-for="(item,index) in issueContent" :key="index">
          <dt>
            课题: <span>{{item.p_name}}</span>
          </dt>
          <dt class="gw-80 gps-rlt" style="padding-left:0.7rem;">
            <p class="gps-abs gps-tl"><span class="l-quesition">问</span></p> <span
              class="gdp-ib gw-100">{{item.m_describe}}</span>
          </dt>
          <dt v-if="item.m_status" class="gw-80 gps-rlt" style="padding-left:0.7rem;">
            <p class="gps-abs gps-tl"><span class="l-answer">答</span></p> <span
              class="gdp-ib gw-100">{{item.m_answer}}</span>
          </dt>
          <dd>
            <span class="gdp-b">提问者: {{item.s_name}}</span>
            <span class="gdp-b">提问时间: {{item.m_time}}</span>
            <span class="gdp-b">提问状态: {{status(item.m_status)}}</span>
          </dd>
          <dd class="gps-abs answer" @click="clickAnswer(item.m_status,item.m_id)"
            :class="[item.m_status == 1?'active':'']">
            {{item.m_answer?'已解答':'解答'}}
          </dd>
        </dl>
      </div>
      <more v-if="issueContent.length" :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
      <div v-else
        style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
        <img src="../../../assets/images/noHistory.png" style="width:5rem;">
      </div>
      <div v-if="answer_text" class="content gps-fix gps-x gw-90">
        <div class="gc-red">请输入: <span class="send gdp-ib gps-abs gps-x" style="bottom:0.2rem;"
            @click="_sendAnswer(current_id,answer_content)">发送</span></div>
        <textarea v-model="answer_content" style="padding:0.3rem;width:100%;"></textarea>
      </div>
      <div v-if="answer_text" class="mask gps-fix gps-full" @click="hideAnswer"></div>
    </div>
    <router-view></router-view>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import more from '../../../base/more/more';
  import alert from '../../../base/warn/warn'
  import { mapGetters } from 'vuex';
  import { getTeacherIssue, getSendAnswer } from '../../../api/teacher/teacher_issue'
  export default {
    data() {
      return {
        teacherInfo: '',
        answer_text: false,
        page: 1,
        nomore: '',
        issueContent: [],
        answer_content: '',
        current_id: '',
        showAlert: false,
        err: '',
        temp: false
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
        _self._getTeacherIssue(_self.page, _self.teacherInfo.t_uid)//根据教师uid获取问题
      });//获取教师信息
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    methods: {
      ok() {
        this.showAlert = false
        if (this.temp) {
          window.location.reload()
        }
      },
      _sendAnswer(id, content) {
        var _self = this;
        if (!content) {
          _self.showAlert = true;
          _self.err = '请输入内容'
          return
        }
        getSendAnswer(id, content).then(function (res) {
          if (res.code == 0) {
            _self.temp = true;
          }
          _self.answer_text = false
          _self.showAlert = true;
          _self.err = res.msg
        })
      },
      status(num) {
        if (num == 0) {
          return '未回答'
        }
        if (num == 1) {
          return '已解答'
        }
      },
      _getTeacherIssue(page, uid) {
        let _self = this;
        getTeacherIssue(page, uid).then(function (res) {
          if (res.code == 0) {
            _self.issueContent = _self.issueContent.concat(res.data)
          }
          if (res.code != 0) {
            _self.nomore = res.msg;
          }
        })
      },
      _clickAdd() {
        var _self = this
        this.page++;
        this._getTeacherIssue(_self.page, _self.teacherInfo.t_uid);
      },
      clickAnswer(status, id) {
        if (status == 1) {
          return
        }
        this.answer_text = true;
        this.current_id = id;
      },
      hideAnswer() {
        this.answer_text = false;
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
    padding-top:1rem;
    padding-bottom: 0.05rem;
  }

  .issue-main dt {
    font-size: 0.34rem;
    line-height: 0.36rem;
    margin-bottom: 0.3rem;
  }

  .issue-main dl {
    margin:0.2rem;
    padding: 0.2rem;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    border-radius: 10px;
  }

  .issue-main dl span {
    color: #363636;
    height: 0.5rem;
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

  .addAnnouncement {
    display: block;
    height: 0.9rem;
    width: 70%;
    margin: auto;
    line-height: 0.9rem;
    text-align: Center;
    color: #fff;
    border-radius: 0.12rem;
    background: #488BF1;
    font-size: 0.34rem;
    margin-top: 0.4rem;
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
  .l-answer{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #fedc47;
    border-radius: 4px;
    line-height: 0.5rem;
    text-align: center;
    color: white !important;
  }
</style>