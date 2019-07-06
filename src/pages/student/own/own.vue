<template>
  <div class="other-container">
    <top title="学生自拟课题"></top>
    <scroll :data="problem" class="scroll">
      <div>
        <student-own-problem :problem="problem"></student-own-problem>
        <more v-if="problem.length" :page="page" :nomore="nomore" @clickAdd="_clickAdd"></more>
        <div v-else
          style="position: absolute;top:1rem;bottom:3rem;width: 100%;display: flex;justify-content: center;align-items: center;">
          <img src="../../../assets/images/noHistory.png" style="width:5rem;">
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import top from '../../../components/header/header';
  import more from '../../../base/more/more';
  import scroll from '../../../base/scroll/scroll'
  import studentOwnProblem from '../../../components/studentOwn_problem/studentOwn_problem';
  import { getStudentProblem } from '../../../api/student/student_personal';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        problem: [],
        page: 1,
        nomore: '',
        studentInfo: ''
      }
    },
    created() {
      var _self = this;
      this.student.then(function (res) {
        _self.studentInfo = res
        console.log(res)
        _self._getStudentProblem(_self.page, _self.studentInfo.s_uid);//获取学生课题
      })
    },
    methods: {
      _clickAdd() {
        this.page++;
        this._getStudentProblem(this.page, this.studentInfo.s_uid);
      },
      _getStudentProblem(page, s_uid) {
        var _self = this;
        getStudentProblem(page, s_uid).then(function (res) {
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
      ...mapGetters(['student'])
    },
    components: {
      top,
      more,
      studentOwnProblem,
      scroll
    }
  }
</script>
<style scoped>
  .scroll {
    height: 100%;
    overflow: hidden;
  }

  .other-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }
</style>