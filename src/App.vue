<template>
  <div id="app">
<!--    <div id="nav">-->

<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/learn">Learn</router-link> |-->
<!--      <router-link to="/motheds">Motheds</router-link>-->
<!--    </div>-->
<!--    <p>{{$route.meta.keepAlive}}</p>-->
    <layout v-if="!$route.meta.keepAlive"><router-view /></layout>
    <router-view v-if="$route.meta.keepAlive" />
<!--    设置路由缓存 方法一  -->
<!--    <keep-alive include="store">-->
<!--    <router-view></router-view>-->
<!--    </keep-alive>-->
    <!--    设置路由缓存 方法二  -->
<!--    <keep-alive><router-view  v-if="this.$route.meta.keepAlive" /></keep-alive>-->
<!--    <keep-alive v-if="!this.$route.meta.keepAlive"><router-view></router-view></keep-alive>-->

  </div>
</template>
<script>
import layout from '@/layout/layout'
export default {
  name: 'App',
  components:{layout},
  mounted () {
    console.log('app.vue', this.$route)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
