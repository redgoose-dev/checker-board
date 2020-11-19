<template>
  <modal-wrapper>
    <modal-header
      :title="$t('box.title')"
      @close="$emit('close')"
      class="box-list-header"/>
    <article class="box-list">
      <p v-for="(o,k) in Array(50)" :key="k">
        text
      </p>
    </article>
  </modal-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';

export default defineComponent({
  name: 'box-list',
  components: {
    ModalWrapper,
    ModalHeader,
  },
  methods: {},
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
