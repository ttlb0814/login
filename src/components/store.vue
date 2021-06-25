<template>
  <div>
    <Button @click="set_user">一一</Button>
    <p>info:{{info}}</p>
    <Button @click="set_total">一一</Button>
    <Button @click="set_num">一一</Button>
    <div @click="div_click" @contextmenu.prevent="menu_click($event)" class="divClick">
      <p @click.stop="client($event)" @contextmenu.stop.prevent="">获取鼠标点击位置</p>
    </div>
    <p @click.native="original">监听原生事件</p>
    <p @click="router_resolve">router.resolve</p>
    <p @click="storeAdd">store.add</p>
    <Input value="input内容" />
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
// import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {createNamespacedHelpers} from 'vuex'
// const {mapState} = createNamespacedHelpers('app')
const {mapState, mapMutations} = createNamespacedHelpers('app')

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
      info: state => state.info
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
      // 使用辅助函数
      // this.setUser(this.userInfo)
      // 常规方法访问 模块中 app下的mutations
      this.$store.commit('app/setUser', this.userInfo)
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
    },
    client($event) {
      console.log($event)
    },
    div_click() {
      console.log('父级事件')
    },
    menu_click($event) {
      console.log($event)
    },
    original() {

    },
    router_resolve() {
      const obj = {
        path: '/learn'
      }
      const routeData = this.$router.resolve(obj)
      console.log(routeData)
      window.open(routeData.href, '_blank')
    },
    storeAdd() {
      this.$store.commit('add', null, {root: true})
    }


  //  你可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
  }
}
</script>

<style scoped>
  .divClick{
    height: 50px;
    width: 200px;
    border-radius: 8px;
    margin: 0 auto;
    background: cornflowerblue;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divClick p {
    padding: 8px;
    background: chocolate;
    border-radius: 8px;
  }
</style>
