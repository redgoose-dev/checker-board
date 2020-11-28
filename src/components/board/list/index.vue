<template>
  <modal-wrapper class="board-list">
    <modal-header
      :title="state.boxName"
      @close="$emit('close')"
      class="board-list__header"/>
    <div class="board-list__control">
      <fieldset class="board-list__filter">
        <legend>filter</legend>
        <label>
          <span>년도:</span>
          <forms-select
            name="filter_year"
            v-model="state.selectedFilter.year">
            <option
              v-for="n in state.filters.years"
              :value="n"
              :key="n">
              {{n}}
            </option>
          </forms-select>
        </label>
        <label>
          <span>월:</span>
          <forms-select
            name="filter_month"
            v-model="state.selectedFilter.month">
            <option
              v-for="n in state.filters.months"
              :value="n"
              :key="n">
              {{n}}
            </option>
          </forms-select>
        </label>
      </fieldset>
      <nav class="board-list__top-nav">
        <icon-button
          icon="edit"
          class="button"
          @click="onClickEditBox"/>
        <icon-button
          icon="trash"
          class="button"
          @click="onClickRemoveBox"/>
      </nav>
    </div>
    <article class="board-list__body">
      <h2 class="board-list__title">Board list</h2>
      <ul class="board-list__index">
        <li v-for="(o,k) in state.index" :key="k">
          <item
            :date="new Date('1995-12-17T03:24:00')"
            @select-item="onSelectItem"/>
        </li>
      </ul>
    </article>
  </modal-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { rangeNumbers } from '@/libs/number.ts';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';
import FormsSelect from '@/components/forms/select.vue';
import IconButton from '@/components/buttons/icon-button.vue';
import Item from './item.vue';
export default defineComponent({
  name: 'board-list',
  components: {
    ModalWrapper,
    ModalHeader,
    FormsSelect,
    IconButton,
    Item,
  },
  setup(props, context)
  {
    // TODO: 전체 보드 목록에서 시작 날짜와 오늘날짜를 구해서 필터의 날짜를 만들어야 한다.

    // state
    let state = reactive({
      boxName: 'box-name',
      selectedFilter: {
        year: 2000,
        month: 1,
      },
      index: new Array(30),
      filters: {
        years: computed(() => rangeNumbers(2000, 2010)),
        months: computed(() => rangeNumbers(1, 12)),
      },
    });

    // methods
    const onSelectItem = () => {
      console.log('on select item in board-list');
      context.emit('select-item');
    };
    const onClickEditBox = () => {
      console.log('on click edit box in board-list');
    };
    const onClickRemoveBox = () => {
      console.log('on click remove box in board-list');
    };

    // etc
    console.warn('call setup() in board-list');

    return {
      state,
      onSelectItem,
      onClickEditBox,
      onClickRemoveBox,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
