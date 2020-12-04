<template>
  <article class="board-item-top">
    <h2 class="board-item-top__date">2020년 12월 24일</h2>
    <!-- TODO: 오늘날짜 데이터가 아니라면 버튼 출력하기 -->
    <button
      v-if="true"
      type="button"
      class="board-item-top__today"
      @click="$emit('click-today')">
      {{$t('board.today')}}
    </button>
  </article>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'board-item-top',
  components: {},
  emits: {
    'click-today': null,
  },
});
</script>

<style src="./top.scss" lang="scss" scoped></style>
