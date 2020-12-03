<template>
  <div class="board-manage">
    <p>board edit</p>
    <nav>
      <button type="button" @click="$emit('close')">close</button>
    </nav>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'board-manage',
  components: {},
  setup()
  {
    // etc
    console.warn('call setup() in board-manage');

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
