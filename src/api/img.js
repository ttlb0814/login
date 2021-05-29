import axios from 'axios'
import global from './config'
import qs from 'qs'
import { Message } from 'view-design';

// axios 配置
var http = axios.create({
  timeout: 30000,
  headers: global.headers,
  // baseURL: 'https://api.apiopen.top/'
  baseURL: global.imgURL
})
