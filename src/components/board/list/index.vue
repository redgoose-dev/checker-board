<template>
  <modal-wrapper class="board-list" @close="$emit('close')">
    <modal-header :title="state.boxName" @close="$emit('close')"/>
    <loading v-if="state.loading" class="board-list__loading"/>
    <template v-else>
      <div class="board-list__control">
        <fieldset class="board-list__filter">
          <legend>filter</legend>
          <label>
            <span>년도:</span>
            <forms-select
              name="filter_year"
              v-model="state.selectedFilter.year">
              <option v-for="n in filters.years" :value="n" :key="n">
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
        </fieldset>
      </div>
      <article class="board-list__body">
        <h2 class="board-list__title">Board list</h2>
        <ul class="board-list__index">
          <li v-for="(o,k) in state.index" :key="k">
            <item
              :date="o.date"
              :active="preference.board === o.srl"
              :date-type="preference.dateFormat"
              @select-item="onSelectItem(o?.srl)"/>
          </li>
        </ul>
      </article>
    </template>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { rangeNumbers } from '@/libs/number';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import ButtonsIcon from '@/components/buttons/icon';
import Item from './item';
import Loading from '@/components/etc/loading';
import { modelGetItem, modelGetItems } from '@/libs/model';
import * as util from '@/libs/util';
export default defineComponent({
  name: 'board-list',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
    'buttons-icon': ButtonsIcon,
    'item': Item,
    'loading': Loading,
  },
  setup(props, context)
  {
    const store = useStore();
    const { preference } = store.state;
    const today = new Date();

    // state
    let state = reactive({
      loading: true,
      boxName: '',
      selectedFilter: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      },
      index: [],
    });
    let filters = reactive({
      rangeYear: [ today.getFullYear(), today.getFullYear() ],
      rangeMonth: [ 1, today.getMonth() + 1 ],
      years: computed(() => rangeNumbers(Number(filters.rangeYear[0]), Number(filters.rangeYear[1]))),
      months: computed(() => rangeNumbers(Number(filters.rangeMonth[0]), Number(filters.rangeMonth[1]))),
    });

    // methods
    const onSelectItem = async srl => {
      if (!srl) return;
      await store.dispatch('updatePreference', { board: srl });
      context.emit('select-item');
    };

    // lifecycles
    onMounted(async () => {
      try
      {
        // get box item
        let box = await modelGetItem('box', preference.box);
        if (!box) return;
        state.boxName = box.name;
        // get board items
        let boards = await modelGetItems('board', 'box', box.srl);
        if (!(boards && boards.length > 0)) state.index = [];
        state.index = boards.reverse();
        // set date range in filters
        const dateRange = [ state.index[0]?.date, state.index[state.index.length - 1]?.date ];
        filters.rangeYear = [ dateRange[0]?.getFullYear(), dateRange[1]?.getFullYear() ];
        filters.rangeMonth = [ dateRange[0]?.getMonth() + 1, dateRange[1]?.getMonth() + 1 ];
        // off loading
        state.loading = false;
      }
      catch (e)
      {
        state.index = [];
        state.loading = false;
      }
    });

    return {
      state,
      filters,
      preference,
      onSelectItem,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
