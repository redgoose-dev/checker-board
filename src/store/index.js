import { createStore } from "vuex";
import * as storage from '@/libs/storage';
import { defaultPreference } from "@/assets/defaults";
import { modelInitialDatabase, modelGetItem, modelGetItems } from '@/libs/model';

const state = {
  preference: defaultPreference,
  current: {
    showBoxList: true,
    showBoardList: false,
    showPreference: false,
  },
}

const actions = {
  /**
   * setup
   * 로컬 스토리지에서 `preference`값이 없으면 만들고 있으면 가져와서 스토어에 업데이트를 한다.
   * 만들어진 데이터베이스가 없다면 새로 만든다.
   *
   * 셋업 과정
   * - 스토리지 값 가져와서 스토어에 적용
   * - 데이터베이스 초기화
   * - 데이터 검사하고 스토어 값 다듬기
   * - 스토어 데이터를 스토리지 저장
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
    // update storage
    storage.set('preference', state.preference);
  },
  /**
   * update preference
   * 스토어에 있는 `preference`값 업데이트하고 스토리지에 있는 값 교체한다.
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
