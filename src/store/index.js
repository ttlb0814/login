// import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'element-ui/packages/cascader-panel/src/store'
import fa from 'element-ui/src/locale/lang/fa'
import http from '../api/http'

import app from './modules/app'
import bus from './modules/bus'

Vue.use(Vuex)

export default new Vuex.Store({
  debug: true,
  state: {
    msg: 'Hello!',
    count: 0,
    success: false,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
    ],
    // 存储 token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      console.log(getters)
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    mutationsAddCount (state, n) {
      console.log(state, n)
      return (state.count += n)
    },
    mutationsReduceCount (state, n) {
      return (this.state.count -= n)
    },
    increment (state, data) {
      console.log(state)
      state.count += data.num
    },
    setToken (state, token) {
      console.log(token)
      state.Authorization = token
      localStorage.setItem('Authorization', token)
    },
    add(state) {
      console.log(state)
      state.count += 1
      state.success = true

    },

    // increment (state, data) {
    //   state.count ++
    // }
  },
  actions: {
    actionsAddCount (context, n = 0) {
      console.log(context)
      return context.commit('mutationsAddCount', n)
    },
    actionsReduceCount ({ commit }, n = 0) {
      console.log(commit)
      return commit('mutationsReduceCount', n)
    },

    increment (context, data) {
      console.log(context, data)
      context.commit('increment', data)
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        // commit('increment')
        console.log('incrementAsync', commit)
      }, 1000)

    },
    checkout ({ commit, state }) {
      console.log(commit, state)
      commit('incrementAsync')
    },
      yanshi ({commit}) {
        return new Promise((res, rej) =>{
          setTimeout(() => {
            commit('add')
            console.log('commit')
            res()
          }, 1000)
        })
      // setTimeout(() => {
      //   commit('add')
      // }, 1000)
      //  commit('add')
    }
  },
  strict: true,// 严格模式不能直接在actions修改state https://vuex.vuejs.org/zh/guide/strict.html
  modules: {
    namespaced: true, // 为了解决不同模块命名冲突的问题
    app,
    bus
  }
})
// export default store;
