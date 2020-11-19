<template>
<main>
  <app-header title="하루하루의 운동운동~" class="app-header">
    <template v-slot:navRight>
      <icon-button
        title="box list"
        icon="grid"
        class="app-header__button"
        @click="state.showBoxList = true"/>
      <icon-button
        title="preference"
        icon="setting"
        class="app-header__button"
        @click="state.showPreference = true"/>
    </template>
  </app-header>
  <board-item/>
  <teleport to="body">
    <transition name="modal-fade">
      <preference
        v-if="state.showPreference"
        @close="state.showPreference = false"/>
    </transition>
    <transition name="modal-fade">
      <box-list
        v-if="state.showBoxList"
        @close="state.showBoxList = false"/>
    </transition>
  </teleport>
</main>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/components/header.vue';
import IconButton from '@/components/buttons/icon-button.vue';
import BoardItem from '@/components/board/item/index.vue';
import Preference from '@/components/preference/index.vue';
import BoxList from '@/components/box/list/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    IconButton,
    Preference,
    BoxList,
    BoardItem,
  },
  setup(props, context)
  {
    // TODO: 이 영역이 beforeCreate 후크 부분이라는 셈이다.
    // TODO: 추후에 `localstorage`에서 값 가져와서 붙이기. 아니면 store 부분에서 값 가져오기

    // TODO: 나중에 사용할 예정
    // const store = useStore();

    console.warn('before-setup on app');

    // hooks
    onMounted(() => {
      console.log('mount App component');
    });

    return {
      state: reactive({
        showPreference: false,
        showBoxList: true,
      }),
    };
  },
});
</script>

<style src="./app.scss" lang="scss" scoped></style>
