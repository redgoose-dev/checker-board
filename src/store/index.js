import { createStore } from "vuex";
import * as storage from '@/libs/storage';
import { defaultPreference } from "@/assets/defaults";
import { modelInitialDatabase, modelGetItem, modelGetItems } from '@/libs/model';

const state = {
  preference: defaultPreference,
}

const actions = {
  /**
   * setup
   * 로컬 스토리지에서 `preference`값이 없으면 만들고 있으면 가져와서 스토어에 업데이트 한다.
   * 만들어진 데이터베이스가 없다면 새로 만든다.
   *
   * @param {Object} context
   */
  async setup(context)
  {
    const { state, commit, dispatch } = context;
    if (storage.check('preference'))
    {
      let preference = storage.get('preference', true);
      commit('updatePreference', preference);
    }
    else
    {
      storage.set('preference', state.preference);
    }
    // make database
    const initialDatabaseType = await modelInitialDatabase();
    // check box,board srl
    switch (initialDatabaseType)
    {
      case 'create':
        // 데이터베이스가 새로 만들어졌다면 새로만든 데이터번호 지정한다.
        await dispatch('updatePreference', { box: 1, board: 1 });
        break;
      default:
        // 데이터베이스 값을 조회하여 값을 검증해보고 번호를 다시 맞추는 작업을 한다.
        let box = state.preference.box;
        let board = state.preference.board;
        let res = await modelGetItem('box', box);
        if (!res)
        {
          res = await modelGetItems('box');
          box = res[res.length - 1].srl;
        }
        res = await modelGetItem('board', board);
        if (!(res && res.box === box))
        {
          res = await modelGetItems('board', 'box', box);
          if (res.length > 0)
          {
            board = res[res.length - 1].srl;
          }
        }
        await dispatch('updatePreference', { box, board });
        break;
    }
    // TODO: 여기까지 작업했는데 box 목록부분부터 작업하면 될것같다.
    console.log(state.preference);
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
