import { createStore } from "vuex";
import * as storage from '@/libs/storage';
import defaultPreference from "@/assets/defaultPreference";

const state = {
  preference: defaultPreference,
}

const actions = {
  /**
   * setup
   * 로컬 스토리지에서 `preference`값이 없으면 만들고 있으면 가져와서 스토어에 업데이트 한다.
   *
   * @param {Object} context
   */
  async setup(context)
  {
    const { commit, state } = context;
    if (storage.check('preference'))
    {
      let preference = storage.get('preference', true);
      commit('updatePreference', preference);
    }
    else
    {
      storage.set('preference', state.preference);
    }
  },
  /**
   * update preference
   *
   * @param {Object} context
   * @param {Object} value / new preference value
   */
  async updatePreference(context, value)
  {
    const { commit, state } = context;
    commit('updatePreference', value);
    storage.set('preference', state.preference);
  },
}

const mutations = {
  updatePreference(state, value)
  {
    state.preference = {
      ...state.preference,
      ...value,
    };
  },
};

const modules = {};


export default createStore({
  state,
  mutations,
  actions,
  modules,
});
