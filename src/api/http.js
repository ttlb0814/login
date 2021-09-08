import axios from 'axios'
import global from './config'
import qs from 'qs'
import { Message } from 'view-design';
import el from 'element-ui/src/locale/lang/el'

// axios 配置
var http = axios.create({
  timeout: 30000,
  headers: global.headers,
  // baseURL: 'https://api.apiopen.top/'
  // baseURL: global.baseURL
  baseURL: '/api'
})
// http.defaults.baseURL = global.baseURL;
// http.defaults.withCredentials = true;
var _this = this
console.log(this)
//拦截重复请求
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removeRepeatUrl = (config) => {
  let comValue = config.method === 'get' ? qs.stringify(config.params) : qs.stringify(config.data);
  for(let p in pending){
    if(pending[p].u === config.url + '&' + config.method + '&' + comValue) { //当前请求在数组中存在时执行函数体
      pending[p].f();         //执行取消操作
      pending.splice(p, 1);   //把这条记录从数组中移除
    }
  }
}
let saveRepeatUrl = (config) =>{
  let comValue = config.method === 'get' ? qs.stringify(config.params) : qs.stringify(config.data);
  console.log(comValue)
  config.method === 'get'? config.params: config.data = comValue

  config.cancelToken = new cancelToken((c)=>{
    pending.push({ u: config.url + '&' + config.method + '&' + comValue, f: c });  // 自定义唯一标识

  });
}

// 添加请求拦截器
http.interceptors.request.use(config => {

  // 在发送请求之前做些什么，比如传token
  removeRepeatUrl(config);       //在一个ajax发送前执行一下取消操作
  saveRepeatUrl(config);         //保存请求地址
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization');
  }
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error) // for debug
  return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use(response => {
  console.log(http.interceptors)
  removeRepeatUrl(response.config);        //执行取消操作，把已经完成的请求从pending中移除
  // 对响应数据做点什么
  if (response.data.code === 200) {
    console.log(response)
    console.log(response.data.result)
    return response.data.result
  } else {
    Message.warning(response.data.message)
    console.log(response.data.message)

  }
  //对错误代码做处理
  return response.data.result;
}, error => {
  // 对响应错误做点什么
  console.log('err' + error)// for debug
  return Promise.reject(error);
});
// 下载
http.open = function(url, data, target, method) {
  console.log(url, data, target, method)
  const form = document.createElement('form')
  form.action = global.baseURL + url
  form.method = method || 'post'
  form.target = target || '_blank'
  if (data) {
    for (const key in data) {
      const input = document.createElement('textarea')
      input.name = key
      input.value =
        typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]
      form.appendChild(input)
    }
  }
  form.style.display = 'none'
  document.body.appendChild(form)
  form.submit()
};

http.getExel=function(url, params, index) {
  console.log(url, params)
  return new Promise(function (resolve, reject) {
    let data = {
      method: "POST",
      url: '/api' + url,
      data: params,
      responseType: 'arraybuffer'
    }
    resolve(axios(data));
  })
}

export default http;

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    http.post(url, data).then(response => {
      //对接口错误码做处理
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
}

/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: data
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装所有请求
 * @param methed
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */
export function request(methed,url, data = {},headers) {
  return new Promise((resolve, reject) => {
    http({
      method: methed || 'post',
      url:url,
      params: methed === 'get' ? data :'',
      data: methed !== 'get' ?  data :'',
      headers: headers || {'Content-Type':'application/json'},
    })
      .then(response => {
        //对接口错误码做处理
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
