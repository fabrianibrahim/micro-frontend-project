<template>
  <!DOCTYPE html>
  <html>

  <head>
    <title>Sign In</title>
  </head>

  <body>
    <h1>Sign In</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input v-model="username" type="text" id="username" name="username" required><br><br>
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" name="password" required><br><br>
      <button type="submit">Sign In</button>
    </form>

    <router-link to="/">Home</router-link>
  </body>

  </html>
</template>

<script>
import axios from 'axios';
import { goToMusicMicroFrontend, setAuthToken } from '../bootstrap';

export default {
  name: 'SignInPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      axios.post('https://buildingmfe.maxgallo.io/api/login', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          const token = response && response.data && response.data.data && response.data.data.token;
          setAuthToken(token);
          goToMusicMicroFrontend();
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>