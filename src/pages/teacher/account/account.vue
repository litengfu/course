<template>
  <div class="account-container">
    <top title="账户管理"></top>
    <ul class="account-info gps-abs">
      <li class="gps-rlt" @click="clickAvatar">
        <span>头像</span>
        <i class="iconfont icon-next gfr"></i>
        <template v-if="teacherInfo.t_avatar">
          <img :src="teacherInfo.t_avatar" class="gps-abs gps-y">
        </template>
        <template v-else>
          <img src="../../../assets/images/avatar.png" class="gps-abs gps-y">
        </template>
        <input type="file" @change="uploadFilds" class="g-hide" ref="avatar">
      </li>
      <li>
        <span>姓名</span>
        <span class="gfr name">{{teacherInfo.t_name}}</span>
      </li>
      <li @click="clickShowPhone">
        <span>手机号</span>
        <i class="iconfont icon-next gfr"></i>
        <span class="gfr name">{{teacherInfo.t_cellphone}}</span>
      </li>
      <li @click="clickPassword">
        <span>修改密码</span>
        <i class="iconfont icon-next gfr"></i>
      </li>
      <li class="exitBtn" @click="exit">
        退出
      </li>
    </ul>
    <div class="setPhone-wrap gps-abs gps-x" v-if="showPhone">
      <div class="gw-70">
        请输入手机号
      </div>
      <input type="number" placeholder="输入手机号" v-model="cellphone">
      <div class="gc-red gw-70" style="font-size:0.28rem;">{{info}}</div>
      <div class="gps-abs comfirmBtn" @click="_setCellphone">确定</div>
    </div>
    <div v-if="showPassword" class="setPassword-wrap gps-abs gps-x">
      <ul>
        <li>
          <div class="gfl gw-30">旧密码:</div>
          <div class="gfl gw-70 gh-70">
            <input type="password" placeholder="输入密码" v-model="oldPassword">
          </div>
        </li>
        <li>
          <div class="gfl gw-30">新密码:</div>
          <div class="gfl gw-70 gh-70">
            <input type="password" placeholder="输入密码" v-model="newPassword">
          </div>
        </li>
        <li style="border:0" class="gps-rlt">
          <!-- <div class="gc-red gw-70" style="font-size:0.28rem;">{{passwordInfo}}</div> -->
          <div class="gps-abs comfirmBtn" @click="_setPassword">确定</div>
        </li>
      </ul>
    </div>
    <alert type='alert' :showstate='showAlert' @took='ok'>
      <div slot='text'>提示</div>
      <div slot='text'>{{err}}</div>
    </alert>
    <alert type='confirm' :showstate='showAlert2' @took='ok2' @tocancel='cancel2'>
      <div slot='text'>确认退出</div>
    </alert>
    <div v-if="showPhone || showPassword" class="setPhone gps-fix gps-full" @click.capture="hidePhone">
    </div>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import CryptoJS from 'crypto-js';
  import alert from '../../../base/warn/warn'
  import { getSetCellphone, getSetPassword } from '../../../api/teacher/teacher_personal';
  import { getExit } from "../../../api/users"
  import { uploadFilds } from "../../../api/teacher/teacher_personal"
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        teacherInfo: '',
        showPhone: false,
        showPassword: false,
        cellphone: '',
        info: '',
        passwordInfo: '',
        alertMessage: '',
        oldPassword: '',
        newPassword: '',
        showAlert: false,
        err: '',
        showAlert2:false
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
      });//获取教师信息
    },
    methods: {
      ok2(){
        var _self = this;
        getExit().then(function (res) {
          if (res.code == 0) {
            _self.$router.push('/')
          } else{
            _self.showAlert = true;
            _self.err = '退出失败'
          }
        });
      },
      cancel2(){
        this.showAlert2 = false;
      },
      exit() {
        this.showAlert2 = true;
      },
      ok() {
        this.showAlert = false;
      },
      clickShowPhone() {
        this.showPhone = true;
      },
      clickPassword() {
        this.showPassword = true;
      },
      _setCellphone() {
        let re_phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if (!re_phone.test(this.cellphone)) {
          this.info = '请输入正确的手机号'
        } else {
          this.info = ''
          this.showPhone = false;
          getSetCellphone(this.teacherInfo.t_uid, this.cellphone).then(function (res) {
            if (res.code == 0) {
              window.location.reload();
            }
          })
        }
      },
      _setPassword() {
        var _self = this;
        if (!this.oldPassword) {
          this.showAlert = true;
          this.err = '旧密码不能空'
          return
        }
        if (!this.newPassword) {
          this.showAlert = true;
          this.err = '新密码不能空'
          return
        }
        let l_limit = /^[0-9]{3}$/
        if (!l_limit.test(this.newPassword)){
          this.showAlert = true;
          this.err = '请输3位数字'
          return
        }
        getSetPassword(_self.teacherInfo.t_uid, this.oldPassword, this.newPassword).then(function (res) {
          if (res.code == 0) {
            _self.showPassword = false;
          }
          _self.showAlert = true;
          _self.err = res.msg
        })
      },
      hidePhone() {
        this.showPhone = false;
        this.showPassword = false;
      },
      clickAvatar() {
        this.$refs.avatar.click()
      },
      async uploadFilds(event) {
        var _self = this;
        const files = event.target.files;
        const formDate = new FormData();
        for (let file of Object.values(files)) {
          formDate.append("avatar", file);
        }
        formDate.append("t_uid", _self.teacherInfo.t_uid);
        const response = await uploadFilds(formDate);
        if (response.data.code == 0) {
          window.location.reload()
        }
      }
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    components: {
      top,
      alert
    }
  }
</script>
<style scoped>
  .account-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }

  .account-info {
    background-color: #f2f2f2;
    top: 1rem;
    bottom: 0;
    width: 100%;
  }

  .account-info li {
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 0.23rem;
    font-size: 0.32rem;
    border-bottom: 0.02rem solid #f2f2f2;
    background-color: #ffffff;
  }

  .account-info li img {
    right: 0.7rem;
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
  }

  .account-info li .name {
    color: #666666;
  }

  .setPhone {
    background: rgba(0, 0, 0, .4);
  }

  .setPhone-wrap {
    height: 3.3rem;
    padding: 0.3rem;
    width: 70%;
    background: white;
    font-size: 0.34rem;
    top: 3rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;
  }

  .setPhone-wrap input {
    width: 70%;
    height: 0.7rem;
    font-size: 0.34rem;
    margin-top: 0.3rem;
  }

  .comfirmBtn {
    bottom: 0.2rem;
    right: 0.3rem;
    height: 0.5rem;
    width: 1rem;
    border-radius: 4px;
    line-height: 0.5rem !important;
    background: red;
    color: white !important;
    text-align: center;
  }

  .setPassword-wrap {
    height: 4.4rem;
    padding: 0.3rem;
    width: 70%;
    background: white;
    font-size: 0.34rem;
    top: 3rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;
  }

  .setPassword-wrap li {
    height: 1.2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 2px solid #f2f2f2;
  }

  .setPassword-wrap input {
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    font-size: 0.3rem;
  }

  .exitBtn {
    display: block;
    height: 0.9rem !important;
    width: 70%;
    margin: auto;
    line-height: 0.9rem !important;
    text-align: Center;
    color: #fff;
    border-radius: 0.12rem;
    background: #488BF1 !important;
    font-size: 0.34rem !important;
    margin-top: 0.4rem;
  }
</style>