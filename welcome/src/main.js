import { createApp } from 'vue';
import App from './App.vue';
import LandingPage from './components/LandingPage.vue';
import SignInPage from './components/SignInPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signin', component: SignInPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: 'hello'
});

createApp(App).use(router).mount('#app');
