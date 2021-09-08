<template>
  <el-container style="height: 100%; overflow: hidden" >
    <el-aside style="width: 230px;">
      <el-scrollbar>
        <navMenu></navMenu>
      </el-scrollbar>
    </el-aside>
    <slot></slot>
<!--    <router-view></router-view>-->
  </el-container>
</template>

<script>
import navMenu from '@/layout/navMenu'
export default {
name: "layout",
  components: {navMenu},
  data() {
    return{
      a: null,
      cookieInfo: null,
      username: null
    }
  },
  created () {
    this.cookieInfo = this.cookie.getCookie('user')
    this.username = localStorage.getItem('username')
    console.log(this.cookieInfo, this.username)
    // alert(this.cookieInfo + this.username)
  }
}
</script>

<style scoped>
  .el-scrollbar{
    height: 100%;
    background: #304156;
  }
</style>
