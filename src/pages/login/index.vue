<template>
  <div class="login gps-rlt">
    <div class="login-header gps-rlt">
      Welcome
      <span class="gps-abs gps-l0" @click="_change">三</span>
    </div>
    <div class="login-type">
      <div style="height:1rem;"></div>
      <span>{{change_content}}</span>
    </div>
    <ul class="login-main">
      <li>
        <i class="iconfont icon-username"></i>
        <input type="text" placeholder="输入用户名" v-model="username">
      </li>
      <li>
        <i class="iconfont icon-password"></i>
        <input type="password" placeholder="输入密码" v-model="password">
      </li>
    </ul>
    <div class="login-btn gps-rlt">
      <span class="gps-abs gps-x" @click="login">登录</span>
    </div>
    <transition name="login-change">
      <dl class="login-left gps-abs gps-l0 gps-t0 gh-100" v-show="change_type">
        <dt><span class="gps-abs" @click="_change">三</span></dt>
        <dd class="change-login">切换登陆</dd>
        <dd @click="_student_login">学生登录</dd>
        <dd @click="_teacher_login">教师登录</dd>
      </dl>
    </transition>
    <confirm :text="message" ref="confirm"></confirm>
  </div>
</template>
<script>
  import axios from '../../api/config';
  import CryptoJS from 'crypto-js';
  import Confirm from '../../base/confirm';
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        change_type: false,
        change_content: '学生',
        username: '',
        password: '',
        message: ''
      }
    },
    created() {

    },
    methods: {
      login() {
        if (this.change_content == '学生') {
          let _self = this;
          if (_self.username == '' || _self.password == '') {
            _self.message = '请输入用户名或密码';
            _self.$refs.confirm.show();
            return
          }
          axios.post('/users/signin', { username: 's' + this.username, password: CryptoJS.MD5(this.password).toString()}).then(function (res) {
            if (res.data.code == 0) {
              _self.setStudent()
              _self.$router.push({ path: '/student/problem' })
            } else {
              _self.message = res.data.message;
              _self.$refs.confirm.show();
            }
          })
        } else {
          let _self = this;
          if (_self.username == '' || _self.password == '') {
            _self.message = '请输入用户名或密码';
            _self.$refs.confirm.show();
            return
          }
          axios.post('/users/signin', { username: 't' + this.username, password:this.password }).then(function (res) {
            if (res.data.code == 0) {
              _self.setTeacher()
              _self.$router.push({ path: '/teacher/problem' })
            } else {
              _self.message = res.data.message;
              _self.$refs.confirm.show();
            }
          })
        }
      },
      _change() {
        this.change_type = !this.change_type;
      },
      _student_login() {
        this.change_content = '学生';
        this.change_type = false;
      },
      _teacher_login() {
        this.change_content = '教师';
        this.change_type = false;
      },
      ...mapMutations(
        {
          setTeacher: 'setTeacher',
          setStudent: 'setStudent'
        }
      )
    },
    components: {
      Confirm
    }
  }
</script>
<style scoped>
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: url('../../assets/images/user/background.png');
    background-size:100% 100%;
  }

  .login-header {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.45rem;
    color: white;
    background: url('../../assets/images/user/top.png');
    background-size: 100% 100%;
  }

  .login-header span {
    height: 1rem;
    width: 1rem;
    background: #053249;
    color: white;
  }

  .login-type {
    height: 1.2rem;
    margin-top: 0.7rem;
    font-size: 0.4rem;
    line-height: 1.2rem;
    text-align: center;
    color: white;
  }

  .login-main {
    padding: 0rem 0.3rem;
    margin-top: 3rem;
  }

  .login-main li {
    border-bottom: white 1px solid;
    height: 1.2rem;
  }

  .login-main li i {
    color: white;
    display: inline-block;
    font-size: 0.45rem;
    margin: 0 0.1rem;
  }

  .login-main li input {
    height: 30%;
    font-size: 0.3rem;
    width: 4rem;
    line-height: 0;
    border: 0;
    background-color: transparent;
    outline: 0;
    color: white;
  }

  .login-main li input::-webkit-input-placeholder {
    color: white;
    padding-left: 0.1rem;
  }

  .login-btn span {
    display: inline-block;
    width: 70%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    color: white;
    background: #39daf7;
    margin-top: 1rem;
    border-radius: 4px;
  }

  .login-left {
    background: #04364d;
  }

  .login-left dt span {
    height: 1rem;
    width: 1rem;
    background: #182030;
    color: white;
    right: -1rem;
    font-size: 0.45rem;
    text-align: center;
    line-height: 1rem;
  }

  .login-left dd {
    font-size: 0.3rem;
    height: 1rem;
    color: white;
    line-height: 1rem;
    text-align: center;
    width: 4rem;
  }

  .login-left .change-login {
    border-bottom: 1px solid white;
    margin-bottom: 0.2rem;
  }

  .login-change-enter-active,
  .login-change-leave-active {
    transition: all .5s;
  }

  .login-change-enter,
  .login-change-leave-to {
    left: -4rem;
  }
</style>