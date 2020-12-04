<template>
  <article v-if="error" class="not-support">
    <div class="not-support__wrap">
      <h1 class="not-support__title">
        {{$t(`error.${error}.title`)}}
      </h1>
      <p class="not-support__description">
        {{$t(`error.${error}.description`)}}
      </p>
    </div>
  </article>
  <Suspense v-else>
    <template #default>
      <app/>
    </template>
    <template #fallback>
      <loading/>
    </template>
  </Suspense>
</template>

<script>
import { defineComponent, onErrorCaptured, ref } from 'vue';
import App from '@/components/app';
import Loading from '@/components/etc/loading';

export default defineComponent({
  name: 'app-main',
  components: {
    'loading': Loading,
    'app': App,
  },
  setup()
  {
    const error = ref(null);
    onErrorCaptured(e => {
      if (typeof e !== 'string') console.error(e);
      switch (e)
      {
        case 'NOT_SUPPORT':
          error.value = 'notSupport';
          break;
        default:
          error.value = 'unknown';
          break;
      }
    });
    return { error };
  },
});
</script>