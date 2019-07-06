<template>
  <div class="own-container">
    <top title="发布课题"></top>
    <scroll :data="problem" class="scroll" ref="scroll">
      <div>
        <problem-list :problem="problem" @linkDetail="_linkDetail"></problem-list>
        <more :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
      </div>
    </scroll>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import scroll from '../../../base/scroll/scroll'
  import problemList from '../../../components/problem_list/problem_list';
  import more from '../../../base/more/more';
  import { getPersonalProblem } from '../../../api/teacher/teacher_personal';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        problem: [],
        page: 1,
        nomore: '',
        teacherInfo: ''
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
        _self._getProblem(_self.page, _self.teacherInfo.t_uid);//获取课题
      })
    },
    methods: {
      _linkDetail(item) {
        this.$router.push({ path: `/teacher/problem/${item.p_id}` })
      },
      _clickAdd() {
        this.page++;
        this._getProblem(this.page, this.teacherInfo.t_uid);
      },
      _getProblem(page, t_uid) {
        var _self = this;
        getPersonalProblem(page, t_uid).then(function (res) {
          if (res.code == 0) {
            _self.problem = _self.problem.concat(res.data);
          }
          if (res.code != 0) {
            _self.nomore = res.msg;
          }
          _self.$refs.scroll.refresh()
        })
      }
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    components: {
      top,
      problemList,
      more,
      scroll
    }
  }
</script>
<style scoped>
  .own-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }

  .scroll {
    height: 100%;
    overflow: hidden;
  }
</style>