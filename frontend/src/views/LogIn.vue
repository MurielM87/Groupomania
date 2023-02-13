<template>
  <div id="login_container">
    <form id="login">
      <div class="title_card">
        <h2 class="card_title">
          Connexion
        </h2>
        <router-link :to="{ name: 'SignUp' }">
          <h2>Inscription</h2>
        </router-link>
      </div>

      <label for="email">Email</label>
      <br>
      <input
        ref="email"
        v-model="email"
        class="form-row_input"
        type="text"
        name="email"
        contenteditable
        spellcheck="false"
        required
      >
      <br>
      <p class="error_message">
        {{ emailErrorMessage }}
      </p>
      <br>
      <label for="password">Mot de passe</label>
      <br>
      <input
        ref="password"
        v-model="password"
        class="form-row_input"
        type="password"
        name="password"
        required
        @bind="password"
      >
      <br>
      <p class="error_message">
        {{ passwordErrorMessage }}
      </p>
      <br>
      <input
        type="submit"
        class="button"
        value="Connexion"
        @click.prevent="logIn"
      >
    </form>
  </div>
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
    logIn: function () {
      if (this.email === "" || this.password === "") {
        this.emailErrorMessage = "Adresse email invalide";
        this.passwordErrorMessage = "Mot de passe invalide";
      } else {
        fetch(`http://localhost:3000/api/users/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
#login_container {
  height: 100%;
  margin-bottom: 30%;
}
</style>

