<template>
  <a
    href="#"
    :class="[
      'board-list-item',
      state.today && 'board-list-item--today',
    ]"
    @click.prevent="$emit('select-item')">
    <p class="label">
      {{state.label}}
    </p>
    <icons v-if="state.today" icon="check" class="icon"/>
  </a>
</template>

<script>
import { defineComponent, reactive, computed, PropType } from 'vue';
import { convertFormat, checkToday } from '@/libs/dates';
import Icons from '@/components/icons';

export default defineComponent({
  name: 'board-list-item',
  components: {
    Icons,
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  setup(props)
  {
    return {
      state: reactive({
        label: computed(() => convertFormat(props.date, 3)),
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
