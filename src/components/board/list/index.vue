<template>
  <modal-wrapper class="board-list">
    <modal-header
      :title="state.boxName"
      @close="$emit('close')"
      class="board-list__header"/>
    <nav class="board-list__filter">
      <label>
        <span>년도:</span>
        <forms-select
          name="filter_year"
          v-model="state.selectedFilter.year">
          <option
            v-for="n in filters.years"
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
            v-for="n in filters.months"
            :value="n"
            :key="n">
            {{n}}
          </option>
        </forms-select>
      </label>
    </nav>
    <article class="board-list__body">
      <h2 class="board-list__title">Board list</h2>
      <p>{{state.selectedFilter.year}}년, {{state.selectedFilter.month}}월</p>
      <ul class="board-list__index">
        <li v-for="(o,k) in Array(10)" :key="k">
          <item :date="new Date('1995-12-17T03:24:00')"/>
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
import Item from './item.vue';
export default defineComponent({
  name: 'board-list',
  components: {
    ModalWrapper,
    ModalHeader,
    FormsSelect,
    Item,
  },
  setup()
  {
    // TODO: 전체 보드 목록에서 시작 날짜와 오늘날짜를 구해서 필터의 날짜를 만들어야 한다.
    return {
      state: reactive({
        boxName: 'box-name',
        selectedFilter: {
          year: 2000,
          month: 1,
        },
      }),
      filters: reactive({
        years: computed(() => rangeNumbers(2000, 2010)),
        months: computed(() => rangeNumbers(1, 12)),
      }),
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
