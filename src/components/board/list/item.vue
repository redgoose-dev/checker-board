<template>
  <p>.item</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'board-list-item',
  components: {},
  props: {
    title: { type: String, required: true },
  },
});
</script>