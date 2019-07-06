<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="hide">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="operate-btn left" @click="cancel">{{cancelBtnText}}</div>
            <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>
<style scoped>
  .confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .confirm .confirm-wrapper{
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    top:4rem;
    z-index: 999;
  }
  .confirm .confirm-wrapper .confirm-content{
    width: 6.4rem;
    border-radius: 0.3rem;
    background: #333;
  }
  .confirm .confirm-wrapper .confirm-content .text{
    padding: 0.45rem 0.35rem;
    line-height: 0.52rem;
    text-align: center;
    font-size: 0.43rem;
    color: rgba(255,255,255,0.5);
  }
  .confirm .confirm-wrapper .confirm-content .operate{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    font-size: 0.43rem;
  }
  .confirm .confirm-wrapper .confirm-content .operate .operate-btn.left{
    border-right: 1px solid rgba(0,0,0,0.3);
  }
  .confirm .confirm-wrapper .confirm-content .operate .operate-btn{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    line-height: 0.52rem;
    padding: 0.24rem 0;
    border-top: 1px solid rgba(0,0,0,0.3);
    color: rgba(255,255,255,0.3);
  }

</style>