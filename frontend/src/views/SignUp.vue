<template>
  <form @submit.prevent="handleSubmit" method="post" id="signup" class="card">
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
      <input type="submit" class="button" value="Inscription" />
    </div>
  </form>
</template>

<script>
//import axios from "axios";
const url = "http://localhost:3000/";

export default {
  name: "SignUp",
  data() {
    return {
      pseudo: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit");
      console.log(url);
      fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo: this.pseudo,
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
        }),
      })
      .then(function(res){
        console.log(res.json())
      }) 
      .catch(err => err.status(404).json({message : "erreur dans la création"}));
      console.log(fetch)
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