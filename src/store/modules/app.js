const state = {
  user: {},
  info: '正式员工',
  num: 2
}

const mutations = {
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
  async actionA({state, commit}, val) {
    setTimeout(() => {
      commit('setNum', val)
      console.log(state.num)
    }, 1000)
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
