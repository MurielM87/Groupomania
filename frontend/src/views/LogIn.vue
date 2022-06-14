<template>
  <form id="login" class="card">
    <div class="title_card">
      <h2 class="card_title">Connexion</h2>
      <router-link :to="{ name: 'SignUp' }"><h2>Inscription</h2></router-link>
    </div>
    
    <label for="email">Email</label>
    <br />
    <input
      v-model="email"
      ref="email"
      class="form-row_input"
      type="text"
      name="email"
      contenteditable
      spellcheck="false"
      required
    />
    <br />
    <p class="error_message">{{ emailErrorMessage }}</p>
    <br />
    <label for="password">Mot de passe</label>
    <br />
    <input
      v-model="password"
      v-on:bind= "password"
      ref="password"
      class="form-row_input"
      type="password"
      name="password"
      required
    />
    <br />
    <p class="error_message">{{ passwordErrorMessage }}</p>
    <br />
    <input type="submit" class="button" v-on:click.prevent="logIn"
      value="Connexion" />
  </form>
</template>

<script>

export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    showPassword: function () {
      if (this.passwordFieldType === "password") {
        this.passwordFieldType = "text";
      } else if (this.passwordFieldType === "text") {
        this.passwordFieldType = "password";
      }
    },
    logIn: function () {
      if (this.email === "" || this.password === "") {
        this.emailErrorMessage = "Obligatoire";
        this.passwordErrorMessage = "Obligatoire";
      } else {
        fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify({
              email: this.email,
              password: this.password
          })
        })    
          .then((response) => {
            this.$router.push("/publications");
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          });
      }
    },
  },
};
</script>

<style>
</style>

