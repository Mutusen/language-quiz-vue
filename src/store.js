import { createStore } from 'vuex'
import { API } from './api'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      countData: null
    }
  },
  getters: {
    countData(state) {
      return state.countData;
    }
  },
  mutations: {
    setCountData(state, payload) {
      state.countData = payload;
    }
  },
  actions: {
    async fetchCountData(context) {
      if (context.getters.countData !== null) {
        return context.getters.countData;
      }
      await axios
        .get(API + "/getcount/")
        .then((response) => {
          context.commit('setCountData', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});

export default store;