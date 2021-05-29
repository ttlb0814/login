<template>
    <div class="home">
        <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
        欢迎~~
        <Input disabled v-model="account" />
        <!--      <Input disabled v-model="account" />-->
        <p>{{$route.name}}</p>
        <Button type="primary" @click="_loginout" style="margin-right: 8px; margin-bottom: 8px;">退出</Button>
        <!--      <router-link to="/warn">-->
        <Button type="primary" @click="_toMethods" style="margin-bottom: 8px;">
            <div class="children" >我是子路由组件</div>
        </Button>
        <!--      </router-link>-->
        <div class="content">
            <router-view></router-view>
            <!--      <router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方，会被匹配到的组件替换掉-->
        </div>

        <Button @click="_cahangeStore1">mutatuon 改变 store</Button>
        <Button @click="_cahangeStore2"> actions改变 store</Button>
        <input type="text" v-model="count"/>
        <Button @click="_defineProperty(1)"> _defineProperty</Button>
        <Button @click="observe(library)"> observe</Button>
        <Button @click="changeLibrary"> changeLibrary</Button>
        <Button @click="_yibu">异步</Button>
        <div class="btn-box">
            <input type="text" value="按钮" />
            <div class="btn-box-btn">按钮</div>
        </div>
        <Button @click="_downLoad">下载</Button>
        <learn v-slot:default="muchPeople" :valueParent="parentValue" @changeValue="change_value">
          <p class="people">{{muchPeople.people}}</p>
          <p v-for="(item, index) in muchPeople.people">{{ item }}</p>
            <!-- <p>把我放在插槽里</p>
            <template v-slot:header>
              <h1>我要去找名字叫做“header”的插槽</h1>
              </template>
            <div slot="footer">我要去找名字叫做“footer”的插槽</div>
            <span>我没写名字，就把我放在没写名字的插槽里吧</span>
            <p slot="info">{{info}}</p>
            <div slot-scope="user">
              <div v-for="(item, index) in user.data" :key="index">
                {{item}}
              </div>
            </div> -->
        </learn>
        <!-- <learn v-slot:default="people">
          {{people}}
        </learn> -->
        <!-- <learn v-slot:default="people">
          {{people}}
        </learn> -->
        <div v-for="(item,index) in list" :key="index">
            <div :data="item">{{item}}</div>
            <Button @click="delClick(index)">{{item}}</Button>
        </div>
        <Button>{{$store.state.count}}</Button>
        <Button @click="mutationsAddCount(1)">加法</Button>
        <Button @click="mutationsReduceCount(1)">减法</Button>
        <Button @click="actionsAddCount(1)">加法</Button>
        <Button @click="actionsReduceCount(1)">减法</Button>
        <Button @click="yanshi">调用setTimeout</Button>
        <Button @click="mutationsAddCount(1)">使用mapMutations</Button>
        <Button @click="actionsAddCount(1)">使用mapActions</Button>
        <input v-model="message"></input>
        <p>{{copyMessage}}</p>
        <Button @click="changeMessage">改变信息数据</Button>
        <p>id:{{myObj.id}}, name:{{myObj.name}}, age:{{myObj.age}}</p>
        <Button @click="proxy">proxy双向绑定</Button>
        <p>{{parentValue}}</p>
    </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from "@/components/HelloWorld.vue";
  import learn from '../components/learn'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapActions} from 'vuex'
  import {reactive} from 'vue'
  import http from '../api/http'

  export default {
    name: 'Home',
    components: {
      // HelloWorld
      learn

    },
    watch: {
      //如果要监听obj.a.b则需要设置deep:true,表示监听obj对象中a的变化，如果有初始值，并想要监听初始值的话也可以设置immediate:true(默认为false)
      message: [
        'handleMessage',

        'handleMessage2',
      ]
    },
    provide(){
      return{
        goods: 'provide_货物'

      }
    },
    data () {
      return {
        goods: '',
        info: '父组件的信息',
        account: '',
        state: {},
        // name: '',
        library: {
          book1: {name: ''},
          book2: ''
        },
        yibuCount: 1,
        list: [
          {
            msg: 'k1',
            id: 1
          },
          {
            msg: 'k2',
            id: 2
          },
          {
            msg: 'k3',
            id:3
          }
        ],
        message: '信息1',
        copyMessage: '',
        myObj: {
          id: '我是myObj的ID',
          name: 'mvvm',
          age:25
        },
        parentValue: '传一句话给子组件'
      }
    },
    computed: {
      count () {
        return '大卫'
      },
      ...mapGetters([
        `doneTodosCount`,
      ])
    },
    // computed: mapState({
    //   doneTodosCount () {
    //     return console.log(111)
    //     // return this.$store.state.todos.filter(todo => todo.done).length
    //   },
    //   // 箭头函数可使代码更简练
    //   count: state => state.count,
    //
    //   // 传字符串参数 'count' 等同于 `state => state.count`
    //   countAlias: 'count',
    //
    //   // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    //   countPlusLocalState (state) {
    //     return state.count + this.localCount
    //   }
    // }),
    mounted () {
      console.log(process.env.NODE_ENV)
      console.log(this.$store.getters.doneTodosCount)
      console.log(this.$store.getters.getTodoById(2)) // -> { id: 2, text: '...', done: false }
      this.account = this.cookie.getCookie('LoginName')
      console.log(localStorage.getItem('loginInfo'))
      console.log(this.$store.state)
      // this._defineProperty()
    },
    beforeDestroy() {
      console.log('页面销毁之前')
    },
    destroyed() {
      console.log('页面销毁')
    },
    methods: {
      _loginout () {
        // 调用 cookie的 clearCookie 方法删除 cookie
        this.cookie.clearCookie('LoginName')
        this.cookie.clearCookie('openId')
        localStorage.clear()
        // 跳转至登录界面
        this.$router.replace('/login')
      },
      _toMethods () {
        const id = '1'
        // this.$router.push({
        //   path: `/motheds/${id}`
        // }) 需要设置路由为 path: "/motheds/：id",
        // parmary 方式 ，需要和 路由配置的 name对应，不用 path
        this.$router.push({
          name: 'Motheds',
          params: {
            id: id
          }
        })
        // query方式，需用path
        // this.$router.push({
        //   path: 'motheds',
        //   query: {
        //     id: id
        //   }
        // })
      },
      _cahangeStore1 () {
        this.$store.commit('increment', { num: 2 })

        console.log(this.$store.state.count) // -> 1
      },
      _cahangeStore2 () {
        // this.$store.dispatch('increment', {
        //   num: 10
        // })
        // console.log(this.$store.state.count)
        // this.$store.dispatch('incrementAsync', {
        //   num: 10
        // })
        this.$store.dispatch('checkout')
      },

      _defineProperty (num) {
        let Book = {}
        // let name = ''
        console.log('_defineProperty')
        Object.defineProperty(Book, 'name', {
          get: function () {
            return '《' + name + '》'
            // return 111
          },
          set: function (value) {
            name = value;
            console.log('你取了一个书名叫做' + value);
          },
        })
        Book.name = 'vue权威指南' + num;  // 你取了一个书名叫做vue权威指南
        console.log(Book.name);  // 《vue权威指南》
        console.log(Book)
      },

      observe (data, string) {
        console.log(1, typeof data !== 'object', typeof data)
        console.log(2, Object.keys(data))
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach((key, i) => {
          this.defineReactive(data, key, data[key], i + 1, string)
        })
      },

      // library: {
      //   book1: {name: ''},
      //   book2: ''
      // }

      defineReactive (data, key, val, sort, string) {
        console.log(111)
        console.log(val, 1)
        this.observe(val, 'defineReactive调用的observe'); // 递归遍历所有子属性
        console.log('this.library', sort, this.library.book1.name, this.library.book2, string || '不是defineReactive调用observe')
        Object.defineProperty(data, key, {
          enumerable: false,
          configurable: false,
          get () {return val},
          set (newVal) {
            console.log('newVal', newVal)
            val = newVal
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
          }
        })
      },

      changeLibrary () {
        console.log('changeLibrary')
        this.library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
        this.library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
        console.log(this.library)
        this.observe(this.library)
      },

      _yibu (val) {
        this.yibuCount += 1
        this._yibu2()
        console.log('异步', val)
      },

      _yibu2 () {
        if (this.yibuCount === 3) return
        console.log('异步2')
        this._yibu(2)
      },

      _downLoad () {
        http.getExel("/quotation/exportExcel", {id:'5f41c216e13ccb55ab3d656f'})
          .then(response => {
            let a = document.createElement('a');

            //ArrayBuffer 转为 Blob
            let blob = new Blob([response.data], { type: "application/vnd.ms-excel" });

            let objectUrl = URL.createObjectURL(blob);
            a.setAttribute("href", objectUrl);
            a.setAttribute("download", '计划单电子表格.xls');
            a.click();
          });
      },
      delClick(idx) {
        console.log(idx)
        this.list.splice(idx, 1)
      },
      mutationsAddCount(count) {
        // this.$store.commit('mutationsAddCount', count)
        this.mutationsAddCount(count)
      },
      mutationsReduceCount(count) {
        this.$store.commit('mutationsReduceCount', count)
      },
      actionsAddCount(n) {
        // this.$store.dispatch('actionsAddCount', n)
        this.actionsAddCount(n).then(() =>{})
      },
      actionsReduceCount(n) {
        this.$store.dispatch('actionsReduceCount', n)
      },
      yanshi() {
        this.$store.dispatch('yanshi').then( () => {
          console.log(this.$store.state.count)
        })
      },
      ...mapMutations([
        'mutationsAddCount'
      ]),
      ...mapActions([
        'actionsAddCount'
      ]),
      changeMessage() {
        this.message += 1
      },
      handleMessage(value) {
        console.log(value)
        this.copyMessage = value
      },
      handleMessage2(value) {
        console.log(value)
        this.copyMessage = this.copyMessage + '*'
      },
      proxy() {
        const myObj = {
          id: '我是myObj的ID',
          name: 'mvvm',
          age: 25
        }
        const myProxy = new Proxy(myObj, {
          get (target, propKey) {
            if (propKey === 'age') {
              console.log('年龄很私密，禁止访问');
              return '*';
            }
            return target[propKey];
          },
          set (target, propKey, value, receiver) {
            console.log(propKey, value, receiver, receiver.time)
            if (propKey === 'name') {
              console.log('id无权修改');
              return true;
            }
            target[propKey] = value + (receiver.time || '');
          },
        })
        console.log(myProxy)
        myProxy.name = 34;
      },
      change_value(valueChild) {
        console.log(valueChild)
        this.parentValue = valueChild
      }

    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }


    .people{
      color: cornflowerblue;
      font-size: 24px;
      font-family: SimSun,serif;

    }
</style>

<style lang="less">
    @color: red;
    @padding: 25px;
    @radius: 10px;
    .btn-radius(@radius: 10px) {
        -webkit-border-radius: @radius;
        -moz-border-radius: @radius;
        -ms-border-radius: @radius;
        -o-border-radius: @radius;
        border-radius: @radius;
    }

    .btn-box {
        color: @color;
        &-btn {
            background-color: blue;
            width: 200px;
            height: 20px;
            padding: @padding;
            .btn-radius(30px)
        }

    }



</style>
