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
      v-on:bind="password"
      ref="password"
      class="form-row_input"
      type="password"
      name="password"
      required
    />
    <br />
    <p class="error_message">{{ passwordErrorMessage }}</p>
    <br />
    <input
      type="submit"
      class="button"
      @click.prevent="logIn"
      value="Connexion"
    />
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
  mounted() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token !== null && userId !== null) {
      this.isLoggedIn = true;
      this.$emit("userId");
      console.log("Login||mounted||userId", userId);
    } else {
      this.$router.push({ name: "LogIn" });
    }
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
.card {
  margin-bottom: 30px;
}
</style>

