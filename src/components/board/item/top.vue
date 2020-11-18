<template>
<article class="board-item-top">
  <h2 class="board-item-top__date">2020년 12월 24일</h2>
  <small class="board-item-top__time">{{$t('board.resetTime')}}: 05:00</small>
</article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'board-item-top',
  components: {},
  methods: {},
  mounted() {
    //
  },
});
</script>

<style src="./top.scss" lang="scss" scoped></style>
