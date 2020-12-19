<template>
  <button
    type="button"
    :class="[
      'item',
      active && `item--active`,
    ]"
    @click.prevent="$emit('select-item')">
    <span class="item__wrap">
      <em class="label">
        {{state.label}}
      </em>
      <icons v-if="state.today" icon="check" class="icon"/>
    </span>
  </button>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { convertFormat, checkToday } from '@/libs/dates';
import Icons from '@/components/icons';
export default defineComponent({
  name: 'board-list-item',
  components: {
    'icons': Icons,
  },
  props: {
    date: { type: Date, required: true },
    dateType: { type: [String, Number], default: 0 },
    active: Boolean,
  },
  setup(props)
  {
    return {
      state: reactive({
        label: computed(() => convertFormat(props.date, Number(props.dateType))),
        today: computed(() => checkToday(props.date)),
      }),
    };
  },
  emits: {
    'select-item': null,
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
