<template>
  <div class="other-container">
    <top title="学生自拟课题"></top>
      <div>
        <student-own-problem :problem="problem" :teacher="teacherPass"></student-own-problem>
        <more v-if="problem.length" :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
        <div v-else
          style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
          <img src="../../../assets/images/noHistory.png" style="width:5rem;">
        </div>
      </div>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import more from '../../../base/more/more';
  import studentOwnProblem from '../../../components/studentOwn_problem/studentOwn_problem';
  import { getStudentProblem } from '../../../api/teacher/teacher_personal';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        problem: [],
        page: 1,
        nomore: '',
        teacherInfo: '',
        teacherPass: true
      }
    },
    created() {
      var _self = this;
      this.teacher.then(function (res) {
        _self.teacherInfo = res
        _self._getProblem(_self.page, _self.teacherInfo.t_uid);//获取学生课题
      })
    },
    methods: {
      _clickAdd() {
        this.page++;
        this._getProblem(this.page, this.teacherInfo.t_uid);
      },
      _getProblem(page, t_uid) {
        var _self = this;
        getStudentProblem(page, t_uid).then(function (res) {
          if (res.code == 0) {
            _self.problem = _self.problem.concat(res.data);
          }
          if (res.code != 0) {
            _self.nomore = res.msg;
          }
        })
      }
    },
    computed: {
      ...mapGetters(['teacher'])
    },
    components: {
      top,
      more,
      studentOwnProblem
    }
  }
</script>
<style scoped>
  .other-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
    overflow-y:scroll;
  }

</style>