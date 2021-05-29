<template>
    <div>
        <div class="container">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="4">
                    <Radio-group v-model="radio" @on-change="radioChange">
                        <Radio label="1">开发者</Radio>
                        <Radio label="2">用户</Radio>
                    </Radio-group>
                    <Form v-if="user==='2'" :model="formObj" ref="formObj" :rules="rules" :label-width="55">

                        <Form-item v-show=" user==='2' " label="昵称" style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <label>
                                <Input v-model="formObj.nikeName" ></Input>
                            </label>
                        </Form-item>
                        <Form-item label="账号" prop="name"
                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <label>
                                <Input v-model="formObj.name"></Input>
                            </label>
                        </Form-item>
                        <Form-item label="密码" prop="passwd"
                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <label>
                                <Input v-model="formObj.passwd" ></Input>
                            </label>
                        </Form-item>

                        <Form-item label="头像"
                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <el-upload
                                    action='https://jsonplaceholder.typicode.com/posts/'
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleAvatarSuccess"
                                    :on-change="changeFile"
                                    :auto-upload="true"
                                    :show-file-list="false"
                                    class="avatar-uploader">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt=""/>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </Form-item>
                    </Form>
                    <Form v-if="user==='1'" :model="formObj" ref="formObj" :rules="rules" :label-width="55">

                        <Form-item label="账号" prop="name"
                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <label>
                                <Input v-model="formObj.name"></Input>
                            </label>
                        </Form-item>
                        <Form-item label="密码" prop="passwd"
                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">
                            <label>
                                <Input v-model="formObj.passwd" @on-enter="_handleSubmit('formObj')"></Input>
                            </label>
                        </Form-item>
<!--                        <Form-item label="电子邮箱" prop="email"-->
<!--                                   style="display: flex; justify-content: center; align-items: center; margin-left: 5px">-->
<!--                            <label>-->
<!--                                <Input v-model="formObj.email"></Input>-->
<!--                            </label>-->
<!--                        </Form-item>-->
                    </Form>

                            <Button style="margin-right: 15px" type="primary" @click="_handleSubmit('formObj')">登录
                            </Button>
                            <Button @click="_handleRegister('formObj')">注册</Button>

                </Col>
            </Row>

        </div>
    </div>
</template>

<script>
  // import { userLogin } form '../api'
  // import { userLogin } from '../api/api'
  import { api } from '../api'
  import global from '../api/config'

  export default {

    data () {
      return {
        radio: '1',
        user: '1',
        apikey: '',
        action: global.baseURL,
        imageUrl: '',
        formObj: {
          nikeName: '',
          name: '',
          passwd: '',
          email: '',
          headerImg: ''
        },
        userToken: '',
        rules: {
          name: [
            { required: true, message: 'Please fill in the name', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: 'Please fill in the passwd.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The passwd length cannot be less than 6 bits', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please fill in the email', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      const token = localStorage.getItem('Authorization')
      console.log(token)
      if(token) this.$router.replace('/')
    },
    methods: {
      _handleSubmit (name) {

        this.$refs[name].validate(async valid => {
            console.log(valid)
          if (valid) {
            const res = await api.developerLogin(this.formObj)
            console.log(res)
            if (res) {
              this.apikey = res.apikey
              this.$Message.success('Success!')
              this.userToken = this.apikey
              this.$store.commit('setToken', this.userToken)
              // 以json格式传给setCookie方法存入信息,方法里面会循环遍历该json以单个数据存储的方式，多次存入cookie中
              // 注：cookie不支持直接以json的方式存入
              // let loginInfo={
              //   LoginName:this.formObj.name,
              //   openId:"asfafsfsfsdfsdfsdfdsf"
              // }
              // 调用setCookie方法，同时传递需要存储的数据，保存天数
              // this.cookie.setCookie(loginInfo,7)
              // localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
              //   alert("登录成功")
              // 跳转到首页
               const token = localStorage.getItem('Authorization')
                if(token) this.$router.replace('/')

            } else {
              this.$Message.success('登录信息有误，请检查用户名及密码!')
            }

          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      _handleRegister (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            let newFormObj = {}
            for (const key in this.formObj) {
              if (this.formObj[key] !== '') {
                newFormObj[key] = this.formObj[key]
              }
              // newFormObj
            }
            console.log(newFormObj)
            // if (this.user === '1') {
            //   console.log(this.formObj)
            //   const res = await api.developerRegister(this.formObj)
            // } else {
            //   console.log(this.formObj)
            //   // this.formObj.apikey = 'c8327a07fd7c00aca85eece9ea7eb731'
            //   const res = await api.userRegister(this.formObj)
            // }

          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      radioChange (e) {
        this.user = e === '1' ? '1' : '2'
        console.log(e, this.user)
      },
      changeFile (file) {
        console.log(file)
      },
      handleAvatarSuccess (res, file) {
        console.log(res, file)
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        console.log(1)
        console.log(file)
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
    .container {
        padding: 0;
        margin: 0;
    }

    .container {
        /*font-size: 16px !important;*/
    }

    .ivu-form-item >>> .ivu-form-item-content {
        margin-left: 0 !important;
    }

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
</style>
