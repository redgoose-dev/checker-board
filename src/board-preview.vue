<template>
<main>
  <layout-header>
    <!-- TODO: 슬롯으로 버튼 아이콘으로 들어감 (왼쪽과 오른쪽 부분) -->
  </layout-header>
  <h1>헬로우 월드!</h1>
  <img alt="Vue logo" src="./assets/logo.png">
  <p>smdigpsg sdgisg sdop gspodgos gsgsdpmgsd gmm</p>
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from './components/layout-header/index.vue';

export default defineComponent({
  name: 'board-preview',
  components: {
    'layout-header': LayoutHeader,
  },
});
</script>

<style src="./board-preview.scss" lang="scss" scoped></style>
