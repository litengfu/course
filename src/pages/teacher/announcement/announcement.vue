<template>
  <div class="announcement">
    <div class="announcement-header">
      公告
    </div>
    <div class="announcement-wrap">
      <ul>
        <li v-for="(item,index) in announcementList" :key="index">
          <div class="l-top">
            <template v-if="item.t_avatar">
              <img :src="item.t_avatar">
            </template>
            <template v-else>
              <img src="../../../assets/images/avatar.png">
            </template>
            {{item.t_name}}
          </div>
          <div class="l-content" style="line-height:0.4rem;margin-bottom:0.7rem;">{{item.a_describe}}</div>
          <div class="gtr"><i class="iconfont icon-time2"></i>&nbsp;{{item.a_time}}</div>
        </li>
      </ul>
      <div class="addAnnouncement" @click="addAnnouncement">添加公告</div>
      <div v-if="announcement_text" class="content gps-fix gps-x gw-90">
        <div class="gc-red">公告: <span class="send gdp-ib gps-abs gps-x" style="bottom:0.2rem;"
            @click="_sendAnnouncemen">发送</span></div>
        <textarea v-model="announcement_content" style="padding:0.2rem;width:100%"></textarea>
      </div>
      <div v-if="announcement_text" class="mask gps-fix gps-full" @click="hideannouncement"></div>
      <alert type='alert' :showstate='showAlert' @took='ok'>
        <div slot='text'>提示</div>
        <div slot='text'>{{err}}</div>
      </alert>
      <more v-if="announcementList.length" :page="page2" :nomore="nomore2" @clickAdd="_clickAdd2"></more>
      <div v-else
        style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
        <img src="../../../assets/images/noHistory.png" style="width:5rem;">
      </div>
    </div>
  </div>
</template>
<script>
  import more from '../../../base/more/more';
  import alert from '../../../base/warn/warn'
  import { mapGetters } from 'vuex';
  import { getAnnouncement, getAddAnnouncement } from '../../../api/teacher/teacher_issue'
  export default {
    data() {
      return {
        teacherInfo: '',
        announcement_text: false,
        announcementList: [],
        page2: 1,
        nomore2: '',
        announcement_content: '',
        showAlert: false,
        err: '',
        temp: false
      }
    },
    created() {
      var _self = this;
      _self._getAnnouncement(this.page)//公告
      this.teacher.then(function (res) {
        _self.teacherInfo = res
      });//获取教师信息
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    methods: {
      _getAnnouncement(page) {
        var _self = this;
        getAnnouncement(page).then(function (res) {
          if (res.code == 0) {
            _self.announcementList = _self.announcementList.concat(res.data);
          }
          if (res.code != 0) {
            _self.nomore2 = res.msg;
          }
        })
      },
      hideannouncement() {
        this.announcement_text = false;
      },
      addAnnouncement() {
        this.announcement_text = true;
      },
      _sendAnnouncemen() {
        var _self = this
        if (!this.announcement_content) {
          this.showAlert = true;
          this.err = '请输入公告'
          return
        }
        getAddAnnouncement(this.teacherInfo.t_uid, this.announcement_content).then(function (res) {
          if (res.code == 0) {
            _self.temp = true;
            _self.announcement_text = false;
          }
          _self.showAlert = true;
          _self.err = res.msg
        })
      },
      _clickAnnouncement() {
        this.currentTab = 'announcement';
      },
      ok() {
        if (this.temp) {
          window.location.reload()
        }
        this.showAlert = false
      },
      _clickAdd2() {
        var _self = this
        this.page2++;
        this._getAnnouncement(_self.page2, _self.teacherInfo.t_uid);
      }
    },
    components: {
      more,
      alert
    }
  }
</script>
<style scoped>
  .announcement-header {
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

  .announcement-wrap {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    width: 100%;
  }

  .announcement-wrap ul {
    background: #f3f3f3;
    padding-bottom: 0.05rem;
  }

  .announcement-wrap li {
    margin: 0.2rem;
    padding: 0.2rem;
    background: white;
    font-size: 0.34rem;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
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

  .mask {
    background: rgba(0, 0, 0, .4);
  }

  .l-top {
    display: flex;
    align-items: center;
    height: 0.9rem;
    border-bottom: 1px solid #f2f2f2;
    color: #282828;
    font-size: 0.36rem;
  }

  .l-top img {
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    margin-right: 0.2rem;
  }

  .l-content {
    margin-top: 0.2rem;
  }
</style>