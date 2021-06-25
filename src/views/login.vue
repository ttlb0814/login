<template>
  <div class="login-container">

    <div class="login">
      <div class="title">
        <img src="../assets/david.png" alt="大卫" >
        大卫后台管理系统
      </div>
      <el-form>
        <el-form-item>
          <el-input
              class="input"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="username ">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              class="input"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              @change="_login"
              v-model="password">
          </el-input>
        </el-form-item>

          <el-checkbox v-model="savePassword" @change="_savePassword">记住密码</el-checkbox>

          <el-button type="primary" @click="_login" :loading="loading">登录</el-button>

      </el-form>


    </div>
  </div>

</template>

<script>
let sha1 = require('sha1')
import {createNamespacedHelpers} from 'vuex'
const {mapMutations, mapState} = createNamespacedHelpers('app')
export default {
name: "login",
  computed: {
    ...mapState({
      storeUsername: state => state.username,
      storePassword: state => state.password
    })
  },
  data() {
    return {
      img_url: './src/assets/david.png',
      username: null,
      password: null,
      savePassword: false,
      loading: false
    }
  },
  mounted () {
    console.log(localStorage.getItem('savePassword'), localStorage.getItem('username'))
    if (localStorage.getItem('savePassword')) {
      this.savePassword = true
      this.username = localStorage.getItem('username') || ''
      this.password = localStorage.getItem('password') || ''
    } else this.username = localStorage.getItem('username') || ''
  },
  methods: {
    _savePassword(e) {
      console.log(e,this.username, this.password)
      this.savePassword = e
    },
    _login (key) {
      if (!this.username) {
        this.$message.error('请填写用户名')
        return false
      } else if (!this.password) {
        this.$message.error('请填写密码')
        return
      } else if (this.username !== this.storeUsername || this.password !== this.storePassword) {
        console.log(this.storeUsername, this.storePassword)
        this.$message.error('请检查用户名或密码')
        return
      } else if (this.savePassword) {
        localStorage.setItem('savePassword', this.savePassword)
        localStorage.setItem('username', this.username)
        localStorage.setItem('password', this.password)

      } else {
        // localStorage.removeItem('username')
        localStorage.removeItem('savePassword')
        localStorage.removeItem('password')
      }
      this.$message({ message: '登录成功', type: 'success', duration: 1500 })
      this.loading = true

      let formObj = {}
      formObj.username = this.username
      // formObj.password = sha1(this.password) // sha1加密，但自己练习不使用加密
      formObj.password = this.password
      console.log(formObj)
    //  把密码加密模仿用户信息的样子，嘿嘿~
      /*
        保存cookie需要把信息以对象形式传入，后面可跟存储天数
        如 his.cookie.setCookie(userInfo， 7) 保存7天
        由于封装的方法是批量存储，所以读取时需要读取对象内的属性，无法读取对象名
       */
      const adminInfo = sha1(this.password)
      const userInfo = {user: adminInfo}
      this.cookie.setCookie(userInfo)
      console.log(this.cookie.getCookie('user'))
      this.setUserInfo(adminInfo)
      console.log(this.$store.state.app.adminInfo)
      this._closeLoading()
      this._toHomePage()
    },
  //  将用户信息同步存储到store里
    ...mapMutations([
      'setUserInfo'
    ]),
    _closeLoading() {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    _toHomePage() {
      setTimeout(() => {
        this.$router.replace('/')
      }, 2000)
    }

  }
}
</script>
<style scoped>
.el-input >>> .el-input__inner{
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
  color: #d9d9d9;
}

</style>

<style lang="less" scoped>

  .login-container{
    width: 100%;
    min-height: 100%;
    background: #2d3a4b;

    .login{
      width: 400px;
      margin: 0 auto;
      padding-top: 100px;
      text-align: left;

      .title{
        font-size: 32px;
        color: #ffffff;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }

    .el-form-item{
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.1);
      border-radius: 5px;
    }
    .el-form-item:nth-of-type(3){

    }

      .el-checkbox{
        margin-left: 14px;
        margin-bottom: 22px;
      }

      .el-button{
        width: 100%;
      }
    }
  }
</style>
