<template>
  <form @submit.prevent="handleSubmit" id="login" class="card">
    <h2 class="card_title">Connexion</h2>

    <label for="email">Email</label>
    <br />
    <input
      v-model="email"
      ref="email"
      class="form-row_input"
      type="text"
      name="email"
    />
    <br />
    <label for="password">Mot de passe</label>
    <br />
    <input
      v-model="password"
      ref="password"
      class="form-row_input"
      type="password"
      name="password"
    />
    <br />
    <button type="submit" class="button">Connexion</button>
  </form>
</template>

<script>
import axios from 'axios';
const url = "http://localhost:3000/users/login";

export default {
  name: 'LogIn',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async handleSubmit() {
      const submitData = await axios.post(url + 'login/',  {
        email: this.email,
        password: this.password
      })
      console.log(submitData);
    }
  }
}
</script>

<style>

</style>

