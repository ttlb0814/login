import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less';
import '@/assets/global.css' // global.css

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible';
Vue.use(Vant);

import layout from '@/layout/layout'
Vue.use(layout)

import gonggongzujian from '@/components/gonggongzujian'
Vue.component('gonggong', gonggongzujian)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// import {post} from './api/http'
// Vue.prototype.$post = post;

Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.use(less);

import { Message } from 'view-design';
Vue.prototype.Message = Message

import cookie from './utils/cookie'
// Vue.use(cookie)
Vue.prototype.cookie = cookie

Vue.config.productionTip = false;

var vue = new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount("#app");
export  default vue
