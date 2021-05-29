<template>
  <div>
    <!-- {{msg}} -->
    66
    <div class=""></div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
    <!-- <slot></slot> -->
    <slot name="info"></slot>
    <slot :people="people_name">{{ people.name }}</slot>
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
  methods: {
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
    }
  }
}
</script>
