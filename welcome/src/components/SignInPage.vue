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
  </body>

  </html>
</template>

<script>
import axios from 'axios';

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
          if (response.status === 200) {
            window.bootstrap.router.navigateTo('/play');
          } else {
            throw new Error('Invalid credentials.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>