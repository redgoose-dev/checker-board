<template>
<ModalWrapper>
  <ModalHeader/>
  <div class="preference">
    <button type="button" @click="$emit('close')">
      <span>close</span>
    </button>
    <p>preference screen</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
    <p>0000-==</p>
  </div>
</ModalWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';

export default defineComponent({
  name: 'Preference',
  components: {
    ModalWrapper,
    ModalHeader,
  },
  methods: {},
});

// TODO: 언어설정 / `$i18n.locale='ko'`
</script>

<style src="./index.scss" lang="scss" scoped></style>
