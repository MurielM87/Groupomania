<template>
  <form method="post" id="signup" class="card">
    <router-link :to="{ name: 'LogIn' }"><h2>Connexion</h2></router-link>
    <h2 class="card_title">Inscription</h2>
    <div class="form-row">
      <label for="pseudo">Votre pseudo</label>
      <br />
      <input
        v-model="pseudo"
        v-on:input="checkPseudo"
        ref="pseudo"
        class="form-row_input"
        type="text"
        name="pseudo"
        contenteditable
        spellcheck="false"
        required
      />
      <br />
      <p class="error__message">{{ pseudoErrorMessage }}</p>
      <br />
    </div>
    <div class="form-row">
      <label for="firstname">Prénom</label>
      <br />
      <input
        v-model="firstname"
        v-on:input="checkUsername"
        ref="firstname"
        class="form-row_input"
        type="text"
        name="firstname"
        contenteditable
        spellcheck="false"
        required
      />
      <br />
      <p class="error__message">{{ usernameErrorMessage }}</p>
      <br />
      <label for="lastname">Nom</label>
      <br />
      <input
        v-model="lastname"
        ref="lastname"
        class="form-row_input"
        type="text"
        name="lastname"
        contenteditable
        spellcheck="false"
        required
      />
      <br />
      <p class="error__message">{{ usernameErrorMessage }}</p>
    </div>
    <div class="form-row">
      <label for="email">Email</label>
      <br />
      <input
        v-model="email"
        v-on:input="checkEmail"
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
    </div>
    <div class="form-row">
      <label for="password">Mot de passe</label>
      <br />
      <input
        v-model="password"
        v-on:input="checkPassword"
        v-bind:type="passwordFieldType"
        ref="password"
        class="form-row_input"
        name="password"
        contenteditable
        spellcheck="false"
        required
      />
      <br />
      <p class="error__message">{{ passwordErrorMessage }}</p>
      <br />
    </div>
    <div class="form-row">
      <input
        v-on:click.prevent="signingUp"
        type="submit"
        class="button"
        value="Inscription"
      />
    </div>
    <p>{{ apiResponseMessage }}</p>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      pseudo: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      pseudoErrorMessage: "",
      usernameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      passwordConfirmErrorMessage: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    checkPseudo: function(){
      const pseudoRegex = /^([a-zA-Z0-9-_]{2,36})$/gi;
      if(this.pseudo.match(pseudoRegex)) {
        this.pseudoErrorMessage = "";
      } else {
        this.pseudoErrorMessage = "Choississez un autre pseudo"
      }
    },
    checkUsername: function () {
      const usernameRegex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
      if (this.username.match(usernameRegex)) {
        this.usernameErrorMessage = "";
      } else {
        this.usernameErrorMessage = `Vous ne pouvez utiliser que des lettres, espaces, - et ' "`;
      }
    },
    checkEmail: function () {
      const mailRegex = /^[a-z0-9-._]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
      if (this.email.match(mailRegex)) {
        this.emailErrorMessage = "";
      } else {
        this.emailErrorMessage = "Format incorrect";
      }
    },
    checkPassword: function () {
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&?!*-]).{8}$/;
      if (this.password.match(passwordRegex)) {
        this.passwordErrorMessage = "";
      } else {
        this.passwordErrorMessage =
          "Utilisez au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial";
      }
    },
    signUp: function () {
      if (
        this.pseudo === "" || this.firstname === "" || this.lastname === "" || this.email === "" || this.password === ""
      ) {
        this.apiResponseMessage = "Veuillez renseigner tous les champs !";
        this.pseudoErrorMessage = "Obligatoire";
        this.usernameErrorMessage = "Obligatoire";
        this.emailErrorMessage = "Obligatoire";
        this.passwordErrorMessage = "Obligatoire"
      } else {
        fetch
          .post("http://localhost:3000/api/user/signup", {
            pseudo: this.pseudo,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
          .then((response) => {
            this.$router.push("/login");
            console.log(response)
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
form {
  color: black;
  background-color: white;
  width: 400px;
  margin: auto;
}
</style>