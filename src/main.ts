import { createApp } from 'vue';
import boardPreview from './board-preview.vue';
import store from './store';

// import scss
import './css/app.scss';

// play app
createApp(boardPreview)
  .use(store)
  .mount('#app');
