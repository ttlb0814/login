<template>
  <div>
    <el-menu :default-active="$route.path" unique-opened router class="menu" @select="menuSelect">
      <el-submenu index="1">
        <template slot="title"  class="menu-out"><span style="color: rgb(191, 203, 217);">首页</span></template>
        <el-menu-item index="/methods">子路由组件</el-menu-item>
        <el-menu-item index="/store">store组件</el-menu-item>
      </el-submenu>
      <el-menu-item index="/" class="menu-out">消息中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data() {
    return{
      activeIndex: '1'
    }
  },
  methods: {
    menuSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>

<style scoped>
.el-submenu__title{
  color: rgb(191, 203, 217);
}
  .el-menu, .el-menu-item, .el-submenu__title{
    background: #304156;
    color: rgb(191, 203, 217);
  }
  .el-menu-item.is-active{
    color: #409EFF;
  }
  .el-scrollbar__wrap{
    height: 100%;
    background: #304156;
  }
  ul.el-menu--inline li.el-menu-item {
    background: #1f2d3d;
  }
  ul.el-menu--inline li.el-menu-item:hover{
    background: rgb(38, 52, 96);
  }
  .menu-out:hover{
    background: rgb(38, 52, 96) !important;
  }
  .el-submenu>>>.el-submenu__title:hover{
    background: rgb(38, 52, 96) !important;
  }
</style>
