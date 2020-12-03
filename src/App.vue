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
          title="preference"
          icon="setting"
          class="app-header__button"
          @click="state.showPreference = true"/>
      </template>
    </app-header>
    <board-item/>
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
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
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
  setup()
  {
    // state
    let state = reactive({
      showPreference: false,
      showBoxList: false,
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

    return {
      state,
      onSelectBox,
      onSelectBoard,
    };
  },
});
</script>

<style src="./app.scss" lang="scss" scoped></style>
