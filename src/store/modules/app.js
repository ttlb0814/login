const state = {
  adminInfo: '',
  username: 'ttlb0814',
  password: '0814521',
  user: {},
  info: '正式员工',
  num: 2
}

const mutations = {
  // 存储用户信息
  setUserInfo (state, val) {
    state.adminInfo = val
  },

  setUser (state, val) {
    state.user = val
    console.log(state)
  },
  setNum(state, val){
    state.num += val
  }
}

const getters = {
  total: state => {
    return state.num*2
  },
  discountTotal:(state, getters) => {
    console.log(getters)
    return state.num * getters.total
  }
}

const actions = {
   actionA({state, commit}, val) {
    return new Promise((res, rej) => {
      // 调用延时采取promise处理宏任务
      setTimeout(() => {
        commit('setNum', val)
        console.log(state.num)
        res()
      }, 1000)
    })
      // 常规写法
      // commit('setNum', val)
      // console.log(state.num)
  },
  async actionB({state, dispatch}, val) {
    console.log(state, val)
    await dispatch('actionA', val)
    console.log('state.num', state.num)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
