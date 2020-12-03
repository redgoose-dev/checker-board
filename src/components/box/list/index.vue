<template>
  <modal-wrapper>
    <modal-header
      :title="$t('box.title')"
      @close="$emit('close')"
      class="box-list-header"/>
    <article class="box-list">
      <h2 class="box-list__title">Box list</h2>
      <ul class="box-list__index">
        <li>
          <add-item @click=""/>
        </li>
        <li v-for="(o,k) in Array(50)" :key="k">
          <item
            title="아이템 item-title"
            description="description text"
            @click-item="$emit('select-item', k)"
            @click-edit="onClickEditItem(k)"
            @click-remove="onClickRemoveItem(k)"/>
        </li>
      </ul>
    </article>
  </modal-wrapper>
</template>

<script>
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import AddItem from './add-item';
import Item from './item';
export default defineComponent({
  name: 'box-list',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'add-item': AddItem,
    'item': Item,
  },
  setup(props, context)
  {
    // methods
    const onClickEditItem = (id) => {
      console.log('edit: ', id);
    };
    const onClickRemoveItem = (id) => {
      console.log('remove: ', id);
    };

    // etc
    console.warn('call setup() in box-list');

    return {
      onClickEditItem,
      onClickRemoveItem,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
