<template>
  <label class="forms-input">
    <input
      :type="type"
      :name="name"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="forms-input__unit"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur:modelValue', $event.target.value)">
  </label>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'forms-input',
  props: {
    type: { type: String, default: 'text' }, // text,tel
    name: String,
    id: String,
    placeholder: String,
    required: Boolean,
    modelValue: [ String, Number ],
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>