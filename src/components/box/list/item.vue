<template>
  <div :class="[`item`, active && `item--active`]">
    <a href="#" class="item__head" @click.prevent="$emit('click-item')">
      <h3 class="item__title">{{title}}</h3>
      <p class="item__description">
        {{description}}
      </p>
    </a>
    <div class="item__bottom">
      <p class="item__reset">
        Reset time: {{reset}}
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
    </div>
  </div>
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
    reset: String,
    active: Boolean,
  },
  emits: {
    'click-item': null,
    'click-edit': null,
    'click-remove': null,
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
