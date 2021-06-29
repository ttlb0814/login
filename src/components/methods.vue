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
        <Button @click="_downLoad">点击下载</Button>

        <img src="/img/add.png" alt="" style="width: 100px; height: 100px;" @click="_getImg">

        <Button @click="_getDb">请求豆瓣接口</Button>

        <Button>{{$store.state.count}}</Button>
    </div>
</template>

<script>
  import http from '../api/http'
  import { api } from '../api'

  export default {
    data () {
      return {
        imageUrl: '',
        imgs: '',
        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
        dataObj: {
          app_key: '02D3D9753F9414A8B5E716D66AF1E4A5'
        }
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
      console.log(this.$route.query)
      // this._getImg()
      console.log(this.goods)
      this.getGoods()
    },
    methods: {
      getGoods(){
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
      }
    }
  }
</script>
