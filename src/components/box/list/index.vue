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
          <add-item/>
        </li>
        <li v-for="(o,k) in Array(50)" :key="k">
          <item
            title="아이템 item-title"
            description="description text"
            @click-item="foo('foo ==> item')"
            @click-edit="foo('foo ==> edit')"
            @click-remove="foo('foo ==> remove')"/>
        </li>
      </ul>
    </article>
  </modal-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';
import Item from './item.vue';
import AddItem from './add-item.vue';
export default defineComponent({
  name: 'box-list',
  components: {
    ModalWrapper,
    ModalHeader,
    Item,
    AddItem,
  },
  setup()
  {
    const foo = (msg:string) => {
      console.log(msg);
    };
    return {
      foo,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
