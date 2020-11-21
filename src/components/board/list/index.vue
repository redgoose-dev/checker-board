<template>
  <modal-wrapper>
    <modal-header
      :title="state.boxName"
      @close="$emit('close')"
      class="board-list-header"/>
    <nav class="select-date">
      nav: select-date
    </nav>
    <article class="board-list">
      <h2 class="board-list__title">Board list</h2>
      <ul class="board-list__index">
        <li>
          <item title="asd"/>
        </li>
      </ul>
    </article>
  </modal-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';
import Item from './item.vue';
export default defineComponent({
  name: 'board-list',
  components: {
    ModalWrapper,
    ModalHeader,
    Item,
  },
  setup()
  {
    return {
      state: reactive({
        boxName: 'box-name',
      }),
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
