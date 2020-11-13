<template>
<div class="preview-bottom">
  <button class="preview-bottom__edit" @click="$emit('edit')">
    <Icons icon-name="setting"/>
  </button>
  <p class="preview-bottom__graph">
    <i :style="{width: `${computedPercent}%`}"></i>
  </p>
  <p class="preview-bottom__percent">{{computedPercent}}%</p>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/Icons/index.vue';

export default defineComponent({
  name: 'PreviewBottom',
  components: {
    Icons,
  },
  computed: {
    computedPercent():number
    {
      return 69;
    },
  },
  methods: {
    //
  },
});
</script>

<style src="./Bottom.scss" lang="scss" scoped></style>
