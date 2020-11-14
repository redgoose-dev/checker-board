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
        @click="state.showBoxList = false"/>
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
import Preference from '@/components/Preference/index.vue';
import BoxList from '@/components/box/list.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    IconButton,
    Preference,
    BoxList,
    BoardItem,
  },
  setup()
  {
    const store = useStore();

    // mounted
    onMounted(() => {
      console.log('mount App component');
    });

    return {
      state: reactive({
        showPreference: false,
        showBoxList: false,
      }),
    };
  },
});
</script>

<style src="./App.scss" lang="scss" scoped></style>
