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
      <icon-button
        icon="edit"
        class="button"
        @click.prevent.stop="$emit('click-edit')"/>
      <icon-button
        icon="trash"
        class="button"
        @click.prevent.stop="$emit('click-remove')"/>
    </nav>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconButton from '@/components/buttons/icon-button.vue';
export default defineComponent({
  name: 'box-list-item',
  components: {
    IconButton,
  },
  props: {
    title: { type: String, required: true },
    description: String,
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
