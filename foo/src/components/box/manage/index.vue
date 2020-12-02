<template>
  <div class="box-create">.box-manage</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'box-manage',
  components: {},
  props: {
    type: { type: String, default: 'add' }, // add,edit
  },
});
</script>