import { createApp } from 'vue';
// import ListData from "./components/ListData.vue"
import { createRouter, createWebHashHistory } from 'vue-router';

import AllUsers from './components/pages/AllUsers.vue';
import CourseGoals from './components/pages/CourseGoals.vue';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';

const app = createApp(App);

app.component('base-modal', BaseModal);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AllUsers
    },
    {
      path: '/goals',
      component: CourseGoals
    }
  ]
});

app.use(router);

// stop animation from playing when app is first loaded
router.isReady().then(() => {
  app.mount('#app');
});
