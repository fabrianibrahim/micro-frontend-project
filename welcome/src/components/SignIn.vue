<template>
  <div class="signin-page">
    <div class="text polka-dot-bg">
      <h1>SignIn</h1>
      <div class="separator" />
      <form id="signin">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <button @click.prevent="submit">Submit!</button>
      </form>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import FooterSection from './FooterSection.vue';
import axios from 'axios';
import { goToMusicMicroFrontend, setAuthToken } from '../bootstrap';

export default {
  components: {
    FooterSection
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submit() {
      axios({
        method: 'post',
        url: 'https://buildingmfe.maxgallo.io/api/login',
        data: {
          username: this.username,
          password: this.password,
        }
      })
        .then(response => {
          const token = response && response.data && response.data.data && response.data.data.token;
          setAuthToken(token);
          goToMusicMicroFrontend();
        })
        .catch(error => {
          console.error(error);
        })
    }
  },
}
</script>

<style>
.signin-page {
  background-image: url('../assets/vinyl2-bg.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
  color: var(--mint-cream);
  font-family: sans-serif;
}

button {
  display: block;
  margin-top: 5px;
}

input {
  margin: 5px 0px;
}
</style>
