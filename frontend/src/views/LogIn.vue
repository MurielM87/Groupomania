<template>
  <form id="login" class="card">
    <h2 class="card_title">Connexion</h2>
    <router-link :to="{ name: 'SignIn' }">Inscription</router-link>

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
    <p class="error__message">{{ emailErrorMessage }}</p>
    <br />
    <label for="password">Mot de passe</label>
    <br />
    <input
      v-model="password"
      v-bind:type="passwordFieldType"
      ref="password"
      class="form-row_input"
      name="password"
      required
    />
    <br />
    <p class="error__message">{{ passwordErrorMessage }}</p>
    <br />
    <input type="submit" class="button" v-on:click.prevent="logingIn"
      value="Connexion" />
    <p>{{ apiResponseMessage }}</p>
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
      apiResponseMessage: "",
      passwordFieldType: "password",
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
        this.apiResponseMessage =
          "Veuillez vous identifier";
        this.emailErrorMessage = "Obligatoire";
        this.passwordErrorMessage = "Obligatoire";
      } else {
        fetch
          .post("http://localhost:3000/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$store.commit("SET_USER_ROLE", response.data.role);
            this.$store.commit("SET_USER_ID", response.data.userId);
            this.$store.commit("SET_USER_TOKEN", response.data.token);
            this.$router.push("/fil");
          })
          .catch((error) => {
            this.apiResponseMessage = error.response.data.message;
          });
      }
    },
  },
};
</script>

<style>
</style>

