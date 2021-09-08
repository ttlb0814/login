<template>
  <div>
    <h1>methods</h1>
    <Button @click="_goBack">返回</Button>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <form class="form-horizontal"
          action="http://hn216.api.yesapi.cn/?s=App.CDN.UploadImg&app_key=02D3D9753F9414A8B5E716D66AF1E4A5"
          method="post" enctype="multipart/form-data">
      <input type="file" name="file" value="xuanze">
      <button type="submit" class="btn btn-success">upload</button>
    </form>
    <p ref="info">{{ info.name }}-{{ info.age }}-{{ info.sex }}</p>
    <Button @click="_downLoad">点击下载</Button>

    <img src="/img/add.png" alt="" style="width: 100px; height: 100px;" @click="_getImg">

    <Button @click="_getDb">请求豆瓣接口</Button>

    <Button>{{ $store.state.count }}</Button>
    <Button @click="_test1">调用test.fun1</Button>
    <Button @click="_test2">调用test.fun2</Button>
    <Button @click="_test3">调用test.fun3</Button>
    <br>
    <Button @click="_generator">调用Generator</Button>
    <Button @click="changeInfo(1)">更改name</Button>
    <Button @click="changeInfo(2)">更改age</Button>
    <Button @click="changeInfo(3)">更改sex</Button>
    <Button @click="changeInfo">一键更改</Button>
    <Button @click="changeUser(1)">添加数组</Button>
    <Button @click="changeUser(2)">修改数组</Button>

  </div>
</template>

<script>
import http from '../api/http'
import { api } from '../api'
import test from '../../public/test'

export default {
  data () {
    return {
      imageUrl: '',
      imgs: '',
      img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
      dataObj: {
        app_key: '02D3D9753F9414A8B5E716D66AF1E4A5'
      },
      info: {
        name: 'alex',
        age: 12,
        sex: '男'
      },
      users: [
        {
          name: 'alex',
          age: 12,
          sex: '男'
        },
        {
          name: 'tom',
          age: 18,
          sex: '女'
        }
      ]
    }
  },
  // inject:['goods'],
  created () {
    // this._forEach()
    // this._forOf()
    // this._filter()
    // this._map()
    // this._includes()
    this._find()

  },
  mounted () {
    // console.log(this.$route.query)
    console.log(this.$route.params)
    // this._getImg()
    console.log(this.goods)
    this.getGoods()
  },
  watch: {
    info: {
      handler (val, oldVal) {
        console.log('更改info')
      },
      deep: true,
    }
  },
  methods: {
    getGoods () {
      console.log(this.goods)
    },
    _downLoad () {
      const data = {
        s: 'App.Table.GetDocx',
        app_key: '02D3D9753F9414A8B5E716D66AF1E4A5',
        model_name: 'yesapi_material_goods',
        id: '1'
      }
      http.open(`https://hn216.api.yesapi.cn/`, data, '_blank')
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(file)
    },
    beforeAvatarUpload (file) {
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
    },

    _getImg () {
      console.log(this.$data)
      this.img = ''
      this.img = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture?' + new Date()
      console.log(this.img)
    },

    async _getDb () {
      const res = await api.movieList('北京')
      console.log(res)
    },

    _forEach () {
      let arr = [1, 2, 3, 4, 5]
      arr.forEach((item, index, arr) => {
        console.log(item, index, arr)
      })
    },
    _forOf () {
      // let arr = [1,2,3,4,5]
      // for(const value of arr) {
      //     console.log(value)
      // }

      let obj = { school: 'name', age: 8 }
      for (const value of Object.keys(obj)) {
        console.log(value, obj[value])
      }
    },
    _filter () {
      let arr = [1, 2, 3, 4, 5]
      let newArr = arr.filter((item, index) => {
        return item > 3
      })
      console.log(newArr)
    },
    _map () {
      let arr = [1, 2, 3, 4, 5]
      let newArr = arr.map((item, index) => {
        return item += 3
      })
      console.log(newArr)
    },
    _includes () {
      let arr = [1, 2, 3, 4, 5]
      console.log(arr.includes(2))
      arr.includes(2)
    },
    _find () {
      let arr = [1, 2, 3, 4, 5]
      let res = arr.find((item, index) => {
        return item > 1
      })
      console.log(res)
    },
    _map2 () {
      let arr = [1, 2, 3, 4, 5]
      let mapList = arr.map(item => item)
    },
    _goBack () {
      this.$router.go(-1)
    },
    _test1 () {
      test.fun1()
    },
    _test2 () {
      test.fun2()
    },
    _test3 () {
      test.fun3()
    },
    * generator (number) {
      console.log(1)
      return number
    },
    * run (name) {
      console.log('run')
      console.log(name)
      return yield name + ' Allen'
    },
    _generator () {
      // let generator = this.generator(2)
      // generator.next()
      // generator.next(4)
      // console.log(3)
      let flashMan = this.run('Barry')
      flashMan.next() // { value: 'Barry Allen', done: false }
      // console.log(res)

    },
    changeInfo (e) {
      console.log(e)
      switch (e) {
        case 1:
          this.info.name = ''
          break
        case 2:
          this.info.age = 18
          break
        case 3:
          this.info.sex = '女'
          break
        default:
          console.log('全部更改')
          // this.info = {name: 'tony', age: 20, sex: '未知'}
          this.info.name = 'tony'
          this.info.age = 20
          this.info.sex = '性别未知'
          break
      }

      console.log(this.$refs['info'].innerHTML)
      this.$nextTick(() => {
        console.log(this.$refs['info'].innerHTML)
      })
      // setTimeout(() => {
      //     console.log(this.$refs['info'].innerHTML)
      // }, 100)
    },
    changeUser (e) {
      switch (e) {
        case 1:
          const user3 = { name: 'Sam', age: 16, sex: '男' }
          this.users.push(user3)
          console.log(this.users)
          break
        case 2:
          console.log(e)
          const newUser = { name: 'jan', age: 15, sex: '女' }
            // this.$set(this.users, 0, newUser)
            this.users[2] = newUser
          console.log(this.users)
          break
      }

    }

  }
}
</script>
