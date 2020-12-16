<template>
  <header class="board-item-top">
    <h2 class="board-item-top__date">{{date}}</h2>
    <button
      v-if="!today"
      type="button"
      class="board-item-top__today"
      @click="$emit('click-goto-today')">
      {{$t('board.today')}}
    </button>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'board-item-top',
  components: {},
  props: {
    date: String,
    today: Boolean,
  },
  emits: {
    'click-goto-today': null,
  },
});
</script>

<style src="./top.scss" lang="scss" scoped></style>
