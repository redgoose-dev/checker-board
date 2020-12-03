<template>
  <a
    href="#"
    class="item"
    @click.prevent="$emit('click-item')">
    <h3 class="item__title">{{title}}</h3>
    <p class="item__description">
      {{description}}
    </p>
    <nav class="item__nav">
      <buttons-icon
        icon="edit"
        class="button"
        @click.prevent.stop="$emit('click-edit')"/>
      <buttons-icon
        icon="trash"
        class="button"
        @click.prevent.stop="$emit('click-remove')"/>
    </nav>
  </a>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonsIcon from '@/components/buttons/icon';
export default defineComponent({
  name: 'box-list-item',
  components: {
    'buttons-icon': ButtonsIcon,
  },
  props: {
    title: { type: String, required: true },
    description: String,
  },
  emits: {
    'click-item': null,
    'click-edit': null,
    'click-remove': null
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
