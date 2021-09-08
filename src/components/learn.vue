<template>
  <div>
    <p @click="changemsg">{{msg}}</p>
    66
    <p>{{count}}</p>
    <div class=""></div>
    <slot name="header"></slot>
<!--    <slot></slot>-->
    <slot name="footer"></slot>
    <!-- <slot></slot> -->
    <slot name="info"></slot>
    <slot :people="people">默认插槽内容</slot>
    <!-- <slot :data="msg"></slot> -->
    <el-row>
      <el-col :span="12">
        <el-form>
          <el-form-item label="账号">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Button @click="changeValue(valueParent)">{{valueParent}}</Button>
    <Button @click="toStore">store组件</Button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'vue',
      user: [
        { name: 'Jack', sex: 'boy' },
        { name: 'Jone', sex: 'girl' },
        { name: 'Tom', sex: 'boy' }
      ],
      people: {
        name: '到了夏天人们爱吃西瓜'
      },
      people_name: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
    }
  },
  props: ['valueParent'],
  created () {
    console.log('使用learn组件')
  },
  computed: {
    count() {
      console.log(this.user.length ++)
      return this.user.length ++
    }
  },
  watch: {
    msg(val1, val2) {
      console.log(val1,val2)
    }
  },
  methods: {
    num() {
      console.log('挂载*************')
    },
    changemsg() {
        this.msg = "Vue"
      const count = this.count
      console.log(count)

    },
  //     function foo() {
  //     console.log(this.bar)
  //     }
  //     var bar = "bar1"
  //     var o2 = {bar: "bar2", foo: foo}
  //     var o3 = {bar: "bar3", foo: foo}
  //     foo() //

    changeValue(valueParnet) {
      console.log(valueParnet)
      // this.$parent.changevalue(valueParnet + 'changed')
      this.$emit('changeValue', valueParnet + 'changed')
    },
    toStore() {
      this.$router.push('/store')
    },

  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) next()
    else next(false)
  },
  beforeRouteEnter(to, from, next) {
    next(vm =>{
      // beforeRouteEnter 方法返回组件实例，可以通过该参数访问组件实例
      console.log(vm, vm.people.name)
    })
  }
}
</script>
