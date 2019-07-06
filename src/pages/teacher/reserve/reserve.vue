<template>
  <div class="reserve-container">
    <top title="学生答辩"></top>
    <div class="reserve-main">
      <dl v-for="(item,index) in list" :key="index" class="gps-rlt">
        <dt class="gw-70" style="line-height: 0.44rem;">
          题目: {{item.p_name}}
        </dt>
        <dt>
          答辩时间: {{item.c_reserveTime}}
        </dt>
        <dd>
          <span class="begin gdp-b">姓名:{{item.s_name}}</span>
          <span class="end gdp-b">学号:{{item.s_uid}}</span>
          <span class="end gdp-b">所属专业:{{item.s_speciality}}</span>
        </dd>
        <dd>
          <div class="confirmBtn gps-abs" :class="[item.c_reserveTimeStatus !=0?'active':'']"
            @click="clickAgree(item.s_name,item.s_uid,item.p_name,item.c_reserveTimeStatus,item.c_beginTime)">
            {{status(item.c_reserveTimeStatus)}}
          </div>
        </dd>
      </dl>
    </div>
    <more v-if="list.length" :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
    <div v-else
      style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
      <img src="../../../assets/images/noHistory.png" style="width:5rem;">
    </div>
    <confirm text="是否同意学生的答辩" ref="confirm" confirmBtnText="同意" cancelBtnText="拒绝" @confirm="ok" @cancel="cancel">
    </confirm>
    <alert type='alert' :showstate='showAlert2' @took='ok2'>
      <div slot='text'>提示</div>
      <div slot="text">{{err}}</div>
    </alert>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import alert from '../../../base/warn/warn'
  import confirm from '../../../base/confirm';
  import more from '../../../base/more/more';
  import { getReserve, getReserveConfirm } from '../../../api/teacher/teacher_personal';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        page: 1,
        nomore: '',
        teacherInfo: '',
        list: [],
        showAlert2: false,
        err: '',
        s_name: '',
        sendInfo: {}
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
        _self._getReserve(_self.page, _self.teacherInfo.t_uid)
      })
    },
    methods: {
      clickAgree(s_name, s_uid, p_name, c_reserveTimeStatus,c_beginTime) {
        if (c_reserveTimeStatus != 0) {
          return
        }
        this.$refs.confirm.show();
        this.s_name = s_name;
        this.sendInfo.s_uid = s_uid;
        this.sendInfo.p_name = p_name;
        this.sendInfo.c_beginTime = c_beginTime
      },
      cancel() {
        var _self = this;
        this.sendInfo.c_reserveTimeStatus = 1;
        getReserveConfirm(this.sendInfo).then(function (res) {
          _self.showAlert2 = true;
          _self.err = res.msg
        })
      },
      ok() {
        var _self = this;
        this.sendInfo.c_reserveTimeStatus = 2;
        getReserveConfirm(this.sendInfo).then(function (res) {
          _self.showAlert2 = true;
          _self.err = res.msg
        })
      },
      ok2() {
        this.showAlert2 = false;
        window.location.reload()
      },
      status(type) {
        if (type == 0) {
          return '审核'
        }
        if (type == 1) {
          return '已拒绝'
        }
        if (type == 2) {
          return '已同意'
        }
      },
      _getReserve(page, t_uid) {
        var _self = this;
        getReserve(page, t_uid).then(function (res) {
          if (res.code == 0) {
            _self.list = _self.list.concat(res.data);
          }
          if (res.code != 0) {
            _self.nomore = res.msg;
          }
        })
      },
      _clickAdd() {
        this.page++;
        this._getReserve(this.page, this.teacherInfo.t_uid);
      }
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    components: {
      top,
      more,
      alert,
      confirm
    }
  }
</script>
<style scoped>
  .reserve-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
    overflow-y: scroll
  }

  .reserve-container {
    margin-top: 1rem;
  }

  .reserve-container dl {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    background: white;
    border-bottom: 1px solid #f2f2f2;
  }

  .reserve-container dt {
    font-size: 0.34rem;
    line-height: 0.36rem;
    margin-bottom: 0.3rem;
  }

  .reserve-container dd {
    font-size: 0.28rem;
    line-height: 0.3rem;
    color: #999;
  }

  .reserve-container dd span {
    margin-bottom: 0.2rem;
  }

  .confirmBtn {
    top: 0.2rem;
    right: 0.2rem;
    height: 0.5rem;
    width: 1.3rem;
    line-height: 0.5rem;
    text-align: Center;
    color: #fff;
    border-radius: 4px;
    background: red;
    font-size: 0.28rem;
  }

  .reserve-main {
    background: #f3f3f3;
  }

  .active {
    background: gray;
  }
</style>