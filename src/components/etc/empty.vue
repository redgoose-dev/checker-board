<template>
  <div class="empty">
    <icons icon="cloud-rain" class="empty__icon"/>
    <p class="empty__description">
      not found items
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import icons from '@/components/icons';

export default defineComponent({
  name: 'empty',
  components: {
    icons,
  },
});
</script>

<style src="./empty.scss" lang="scss" scoped></style>
