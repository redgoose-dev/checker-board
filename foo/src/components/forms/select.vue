<template>
  <label class="forms-select">
    <select
      :name="name"
      :id="id"
      :value="modelValue"
      class="forms-select__unit"
      @change="changeValue">
      <slot/>
    </select>
    <icons icon-name="down" class="forms-select__icon"/>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/icons/index.vue';

export default defineComponent({
  name: 'forms-select',
  components: {
    Icons,
  },
  props: {
    name: { type: String, required: true },
    id: String,
    modelValue: [String, Number],
  },
  setup(props, context)
  {
    const changeValue = (e: { target: HTMLInputElement }) =>
      context.emit('update:modelValue', e.target.value);

    return {
      changeValue,
    };
  },
});
</script>

<style src="./select.scss" lang="scss" scoped></style>
