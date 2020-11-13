<template>
<main>
  <AppHeader title="하루하루의 운동운동~ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ" class="app-header">
    <template v-slot:navRight>
      <IconButton
        title="box list"
        icon="grid"
        class="app-header__button"
        @click="state.showBoxList = true"/>
      <IconButton
        title="preference"
        icon="setting"
        class="app-header__button"
        @click="state.showPreference = true"/>
    </template>
  </AppHeader>
  <BoardItem/>
  <teleport to="body">
    <transition name="modal-fade">
      <Preference
        v-if="state.showPreference"
        @close="state.showPreference = false"/>
    </transition>
    <transition name="modal-fade">
      <BoxList
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
import IconButton from '@/components/Buttons/IconButton.vue';
import BoardItem from '@/components/Board/Item/index.vue';
import Preference from '@/components/Preference/index.vue';
import BoxList from '@/components/Box/list.vue';

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
