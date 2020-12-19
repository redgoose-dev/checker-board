<template>
  <main>
    <app-header :title="computes.title" class="app-header">
      <template v-slot:navRight>
        <buttons-icon
          title="box list"
          icon="grid"
          class="app-header__button"
          @click="state.showBoxList = true"/>
        <buttons-icon
          title="board list"
          icon="menu"
          class="app-header__button"
          @click="state.showBoardList = true"/>
        <buttons-icon
          title="preference"
          icon="setting"
          class="app-header__button"
          @click="state.showPreference = true"/>
      </template>
    </app-header>
    <board-item
      @update=""/>
  </main>
  <teleport to="body">
    <transition name="modal-fade">
      <preference
        v-if="state.showPreference"
        @close="state.showPreference = false"/>
    </transition>
    <transition name="modal-fade">
      <box
        v-if="state.showBoxList"
        @select-item="onSelectBox"
        @close="state.showBoxList = false"/>
    </transition>
    <transition name="modal-fade">
      <board-list
        v-if="state.showBoardList"
        @select-item="onSelectBoard"
        @goto-box="onGotoBox"
        @close="state.showBoardList = false"/>
    </transition>
  </teleport>
</template>

<script>
import { defineComponent, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { checkSupport, sleep } from '@/libs/util';
import { modelGetItems, modelGetItem, modelAddItem } from "@/libs/model";
import { defaultModelData } from '@/assets/defaults';
import AppHeader from '@/components/header';
import ButtonsIcon from '@/components/buttons/icon';
import BoardItem from '@/components/board/item';
import Preference from '@/components/preference';
import Box from '@/components/box';
import BoardList from '@/components/board/list';
export default defineComponent({
  name: 'app',
  components: {
    'app-header': AppHeader,
    'buttons-icon': ButtonsIcon,
    'board-item': BoardItem,
    'preference': Preference,
    'box': Box,
    'board-list': BoardList,
  },
  async setup()
  {
    const store = useStore();
    const { locale } = useI18n({ useScope: 'global' });

    // state
    let state = reactive({
      showPreference: false,
      showBoxList: false,
      showBoardList: false,
      box: null,
    });
    let computes = reactive({
      title: computed(() => (state.box ? state.box.name : 'none title')),
    });

    // methods
    const onSelectBox = async srl => {
      let boardSrl = null;
      const boards = await modelGetItems('board', 'box', srl);
      // TODO: 오늘날짜 확인하는 조건문 추가하기
      if (boards?.length > 0)
      {
        boardSrl = boards[boards.length - 1]?.srl;
      }
      else
      {
        // TODO: body 값은 이전 데이터껄로 가져오기
        boardSrl = await modelAddItem('board', {
          ...defaultModelData.board,
          box: srl,
        });
      }
      await store.dispatch('updatePreference', { box: srl, board: boardSrl });
      state.showBoxList = false;
    };
    const onSelectBoard = () => {
      state.showBoardList = false;
    };
    const onGotoBox = async () => {
      state.showBoardList = false;
      await sleep(100);
      state.showBoxList = true;
    };
    const changeTheme = (theme) => {
      if (!theme) return;
      const $html = document.querySelector('html');
      if ($html.classList.contains(theme)) return;
      $html.dataset.color = theme;
    };
    const update = async (srl) => {
      try
      {
        if (!srl) throw '';
        state.box = await modelGetItem('box', srl);
      }
      catch(e)
      {
        state.box = null;
      }
    };

    // check support
    if (!checkSupport()) throw 'NOT_SUPPORT';

    // run setup
    await store.dispatch('setup');

    // set color theme
    changeTheme(store.state.preference.theme);

    // get box item
    await update(store.state.preference?.box);

    // change language
    if (locale.value !== store.state.preference.language)
    {
      locale.value = store.state.preference.language;
    }

    // watch
    watch(() => store.state.preference.theme, changeTheme);
    watch(() => store.state.preference.box, update);

    return {
      state,
      computes,
      onSelectBox,
      onSelectBoard,
      onGotoBox,
    };
  },
});
</script>

<style src="./app.scss" lang="scss" scoped></style>
