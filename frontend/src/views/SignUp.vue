<template>
  <form @submit.prevent="handleSubmit" id="signup" class="card">
    <h2 class="card_title">Inscription</h2>
    <div class="form-row">
      <label for="pseudo">Votre pseudo</label>
      <br />
      <input
        v-model="pseudo"
        ref="pseudo"
        class="form-row_input"
        type="text"
        name="pseudo"
      />
      <br />
    </div>
    <div class="form-row">
      <label for="firstname">Prénom</label>
      <br />
      <input
        v-model="firstname"
        ref="firstname"
        class="form-row_input"
        type="text"
        name="firstname"
      />
      <br />
      <label for="lastname">Nom</label>
      <br />
      <input
        v-model="lastname"
        ref="lastname"
        class="form-row_input"
        type="text"
        name="lastname"
      />
    </div>
    <div class="form-row">
      <label for="email">Email</label>
      <br />
      <input
        v-model="email"
        ref="email"
        class="form-row_input"
        type="text"
        name="email"
      />
    </div>
    <div class="form-row">
      <label for="password">Mot de passe</label>
      <br />
      <input
        v-model="password"
        ref="password"
        class="form-row_input"
        type="password"
        name="password"
      />
    </div>
    <div class="form-row">
      <button type="submit" class="button">Inscription</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/User/signup";

export default {
  name: "SignUp",
  data() {
    return {
      pseudo: "",
      email: "",
      firstname: "",
      lastname: "",
      password: ""

    };
  },
  methods: {
    async handleSubmit() {
      const submitData = await axios.post(url, {
        pseudo: this.pseudo,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
      });
      console.log(submitData);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
form {
  color: black;
  background-color: white;
  width: 400px;
  margin: auto;
}
</style>