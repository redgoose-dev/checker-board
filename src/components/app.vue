<template>
  <main>
    <app-header title="하루하루의 운동운동~" class="app-header">
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
    <board-item/>
    <hr>
    <nav>
      <button type="button" @click="addData">add data</button>
    </nav>
  </main>
  <teleport to="body">
    <transition name="modal-fade">
      <preference
        v-if="state.showPreference"
        @close="state.showPreference = false"/>
    </transition>
    <transition name="modal-fade">
      <box-list
        v-if="state.showBoxList"
        @select-item="onSelectBox"
        @close="state.showBoxList = false"/>
    </transition>
    <transition name="modal-fade">
      <board-list
        v-if="state.showBoardList"
        @select-item="onSelectBoard"
        @close="state.showBoardList = false"/>
    </transition>
  </teleport>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { checkSupport } from '@/libs/util';
import AppHeader from '@/components/header';
import ButtonsIcon from '@/components/buttons/icon';
import BoardItem from '@/components/board/item';
import Preference from '@/components/preference';
import BoxList from '@/components/box/list';
import BoardList from '@/components/board/list';

export default defineComponent({
  name: 'app',
  components: {
    'app-header': AppHeader,
    'buttons-icon': ButtonsIcon,
    'board-item': BoardItem,
    'preference': Preference,
    'box-list': BoxList,
    'board-list': BoardList,
  },
  async setup()
  {
    const store = useStore();
    const { locale } = useI18n({ useScope: 'global' });
    let state = reactive({
      showPreference: false,
      showBoxList: true,
      showBoardList: false,
    });

    // methods
    const onSelectBox = () => {
      state.showBoxList = false;
      state.showBoardList = true;
    };
    const onSelectBoard = () => {
      state.showBoardList = false;
    };

    // check support
    if (!checkSupport()) throw 'NOT_SUPPORT';

    // run setup
    await store.dispatch('setup');

    // change language
    if (locale.value !== store.state.preference.language)
    {
      locale.value = store.state.preference.language;
    }

    return {
      state,
      onSelectBox,
      onSelectBoard,
    };
  },
});
</script>

<style src="./app.scss" lang="scss" scoped></style>
