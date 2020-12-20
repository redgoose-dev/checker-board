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
        @update="onUpdateBox"
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
import { checkSupport, sleep, changeTheme } from '@/libs/util';
import { modelGetItem, makeTodayItem } from '@/libs/model';
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
      if (store.state.preference.box === srl) return;
      // check new item
      let newItem = await makeTodayItem(srl);
      // update preference
      await store.dispatch('updatePreference', { box: srl, board: newItem?.srl });
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
    const onUpdateBox = async (boxSrl) => {
      if (boxSrl === store.state.preference.box) await makeTodayItem(boxSrl);
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

    // watch
    watch(() => store.state.preference.theme, changeTheme);
    watch(() => store.state.preference.box, update);

    // check support
    if (!checkSupport()) throw 'NOT_SUPPORT';

    // run setup
    await store.dispatch('setup');

    // get box item
    await update(store.state.preference.box);

    return {
      state,
      computes,
      onSelectBox,
      onSelectBoard,
      onGotoBox,
      onUpdateBox,
    };
  },
});
</script>

<style src="./app.scss" lang="scss" scoped></style>
