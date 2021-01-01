import { createStore } from "vuex";
import * as storage from '@/libs/storage';
import { useI18n } from 'vue-i18n';
import { defaultPreference } from '@/assets/defaults';
import { initialDatabase, getItem, getItems, makeTodayItem } from '@/libs/model';
import { changeTheme } from '@/libs/util';
const pkg = require('../../package.json');

const state = {
  preference: defaultPreference,
  version: pkg.version,
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
    const { locale } = useI18n({ useScope: 'global' });
    const { state, commit, dispatch } = context;
    if (storage.check('preference'))
    {
      let preference = storage.get('preference', true);
      commit('updatePreference', preference);
    }
    // make database
    const initialDatabaseType = await initialDatabase();
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
        let boxItem = await getItem('box', box);
        if (!boxItem)
        {
          let boxItems = await getItems({ store: 'box' });
          box = boxItems[boxItems.length - 1]?.srl;
        }
        let boardItems = await getItems({
          store: 'board',
          key: 'box',
          value: box,
          order: 'date',
          sort: 'asc',
        });
        board = boardItems[boardItems.length - 1]?.srl;
        await dispatch('updatePreference', { box, board });
        break;
    }
    // update storage
    storage.set('preference', state.preference);
    // change language
    if (locale.value !== state.preference.language)
    {
      locale.value = state.preference.language;
    }
    // set color theme
    changeTheme(state.preference.theme);
    // make today item
    await makeTodayItem(state.preference.box);
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

export default createStore({
  state,
  mutations,
  actions,
});
