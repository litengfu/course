<template>
  <div class="problem">
    <div>
      <div class="problem-header gps-fix gps-tl gw-100 gtc">
        课题
      </div>
      <problem-list :problem="problem" @linkDetail="_linkDetail"></problem-list>
      <more :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
      <alert type='alert' :showstate='showAlert' @took='ok'>
        <div slot='text'>提示</div>
        <div slot='text'>{{err}}</div>
      </alert>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import more from '../../../base/more/more';
  import alert from '../../../base/warn/warn'
  import problemList from '../../../components/problem_list/problem_list';
  import { getProblem } from '../../../api/teacher/teacher_problem';
  export default {
    data() {
      return {
        add_problem: false,
        problem: [],
        page: 1,
        nomore: '',
        showAlert:false,
        err:''
      }
    },
    created() {
      this._getProblem();//获取课题
    },
    methods: {
      ok(){
        this.showAlert = false
        this.$router.push({ path: `/`})
      },
      _linkDetail(item){
        this.$router.push({ path: `/teacher/problem/${item.p_id}`})
      },
      _getProblem() {
        let _self = this;
        getProblem(_self.page).then(function (res) {
          if (res.code == 0) {
            _self.problem = _self.problem.concat(res.data);
          }
          if (res.code == -2) {
            _self.showAlert = true
            _self.err = res.msg
          } else {
            _self.nomore = res.msg;
          }
        })
      },
      _clickAdd() {
        this.page++;
        this._getProblem();
      }
    },
    components: {
      more,
      problemList,
      alert
    }
  }
</script>
<style scoped>
  .problem-header {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.38rem;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0px 1px #f2f2f2;
    background: #251e16;
    color:white;
  }

  .problem-header i {
    margin-right: 0.2rem;
    font-size: 0.34rem;
    color: black;
    z-index: 20;
  }

  .add {
    font-size: 0.28rem;
    right: 0.8rem;
    height: 0.6rem;
    width: 2rem;
    background-color: pink;
    line-height: 0.6rem;
    border-radius: 4px;
  }

  .add::after {
    display: block;
    position: absolute;
    right: -0.5rem;
    top: 0rem;
    content: '';
    border-left: 0.3rem solid pink;
    border-bottom: 0.3rem solid transparent;
    border-top: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
  }

</style>