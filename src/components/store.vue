<template>
  <div>
    <Button @click="set_user">一一</Button>
    <p>info:{{info}}</p>
    <Button @click="set_total">一一</Button>
    <Button @click="set_num">一一</Button>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {createNamespacedHelpers} from 'vuex'
// const {mapState} = createNamespacedHelpers('app')
const {mapMutations} = createNamespacedHelpers('app')

export default {
name: "store",
  data() {
    return {
      userInfo: {
        name: 'zxt',
        age: 18,
        sex: '男'
      },
      newNum: 1
    }
  },
  computed: {
    ...mapState({
      info: state => state.app.info
    }),

  },

  methods: {
    // setUser() {
    //   this.$store.commit('app/setUser', this.user)
    //   console.log(this.$store.state.app.user)
    // },
    // ...mapMutations('app',
    //     [
    //         'setUser'
    //     ]
    // ),
    ...mapMutations([
        'setUser'
    ]),
    ...mapGetters('app',[
      'total',
      'discountTotal'
    ]),
    ...mapActions('app',[
       'actionB'
    ]),
    set_user() {
      this.setUser(this.userInfo)

      console.log('this.info', this.info)
    },
    set_total() {
      const num = this.total()
      const discount = this.discountTotal()
      console.log(num, discount)
      console.log(this.$store.state.app.num)
    },
    set_num() {
      this.actionB(this.newNum)
    }



  //  你可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
  }
}
</script>

<style scoped>

</style>
