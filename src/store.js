import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuCollapsed: false,
    logs: [],   // 练习3-8，log-vuex
  },
  mutations: {
    CHANGE_MENU_COLLAPSED(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },
    // 添加log记录
    ADD_LOG(state, log) {
      state.logs.push(new Date().toLocaleString() + ' ' + log);
    }
  },
  actions: {

  },
  getters: {
    menuCollapsed: (state) => state.menuCollapsed,
    logs: (state) => state.logs
  }
})