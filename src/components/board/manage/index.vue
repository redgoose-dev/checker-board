<template>
  <modal-wrapper>
    <modal-header
      title="edit board"
      @close="$emit('close')"
      class="board-manage-header">
    </modal-header>
    <div class="board-manage">
      <div class="board-manage__body">
        <p>board edit</p>
      </div>
      <nav class="board-manage__nav">
        <buttons-basic type="button" skin="dark" @click="$emit('close')">
          {{$t(`base.cancel`)}}
        </buttons-basic>
        <buttons-basic type="button" @click="onSubmit">
          {{$t(`base.edit`)}}
        </buttons-basic>
      </nav>
    </div>
  </modal-wrapper>
</template>

<script>
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import ButtonsBasic from '@/components/buttons/basic';

export default defineComponent({
  name: 'board-manage',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'buttons-basic': ButtonsBasic,
  },
  setup()
  {
    const onSubmit = e => {
      console.log('on submit');
    }

    return {
      onSubmit,
    };
  },
  emits: {
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
