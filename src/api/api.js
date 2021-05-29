import http from './http'

export default {
  //用户登录接口
  userLogin: data => { // 加了大括号，必须要用return将结果返回，否则默认返回 undefined
    // console.log('**********')
    return http.post('loginUser', data).then(r => r)
  },

  // 开发者登录
  developerLogin: data => // 不加大括号默认返回后面那句话的结果值
    // console.log('**********')
    http.post('developerLogin', data).then(res => res),

  // 用户注册接口
  userRegister: data => http.post('registerUser', data),

  // 开发者注册
  developerRegister: data => http.post('developerRegister', data),

//  豆瓣接口
  movieList: data => http.get(`v2/movie/in_theaters?city=${data}`),

//  小董接口登录
  dongUserLogin: data => http.post(`user/login`, data)

}

