<template>
  <div :class="[`item`, active && `item--active`]">
    <button
      type="button"
      :disabled="active"
      class="item__head"
      @click.prevent="onClickItem">
      <strong class="item__title">{{title}}</strong>
      <span class="item__description">{{description}}</span>
    </button>
    <div class="item__bottom">
      <p class="item__reset">
        {{$t('box.manage.resetTime')}}: {{reset}}
      </p>
      <nav class="item__nav">
        <buttons-icon
          title="Edit"
          icon="edit"
          class="button"
          @click.prevent.stop="$emit('click-edit')"/>
        <buttons-icon
          title="Remove"
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
  setup(props, { emit })
  {
    const onClickItem = e => {
      if (!props.active) emit('click-item', e);
    }
    return {
      onClickItem,
    };
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
