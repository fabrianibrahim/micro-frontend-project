import { createApp } from 'vue';
import App from './App.vue';
import WelcomePage from './components/WelcomePage.vue';
import SignIn from './components/SignIn.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signin', component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: 'hello'
});

createApp(App).use(router).mount('#app');
