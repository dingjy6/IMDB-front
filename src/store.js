import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuCollapsed: false
  },
  mutations: {
    CHANGE_MENU_COLLAPSED(state) {
      state.menuCollapsed = !state.menuCollapsed;
    }
  },
  actions: {

  },
  getters: {
    menuCollapsed: (state) => state.menuCollapsed
  }
})