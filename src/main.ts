import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// import scss
import './css/app.scss';

// play app
createApp(App)
  .use(store)
  .mount('#app');
