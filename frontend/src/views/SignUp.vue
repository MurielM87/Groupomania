<template>
  <div id="signup_container">
    <form method="post" id="signup" class="card">
      <div class="title_card">
        <router-link :to="{ name: 'LogIn' }"><h2>Connexion</h2></router-link>
        <h2 class="card_title">Inscription</h2>
      </div>
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
          v-on:input="checkfirstname"
          ref="firstname"
          class="form-row_input"
          type="text"
          name="firstname"
          contenteditable
          spellcheck="false"
          required
        />
        <br />
        <p class="error__message">{{ firstnameErrorMessage }}</p>
        <br />
        <label for="lastname">Nom</label>
        <br />
        <input
          v-model="lastname"
          v-on:input="checklastname"
          ref="lastname"
          class="form-row_input"
          type="text"
          name="lastname"
          contenteditable
          spellcheck="false"
          required
        />
        <br />
        <p class="error__message">{{ lastnameErrorMessage }}</p>
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
          ref="password"
          class="form-row_input"
          name="password"
          type="password"
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
          @click.prevent="signUp"
          type="submit"
          class="button"
          value="Inscription"
        />
      </div>
    </form>
  </div>
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
      firstnameErrorMessage: "",
      lastnameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    checkPseudo() {
      const pseudoRegex = /^([a-zA-Z0-9-_]{2,36})$/gi;
      if (this.pseudo.match(pseudoRegex)) {
        this.pseudoErrorMessage = "";
      } else {
        this.pseudoErrorMessage = "Choississez un autre pseudo";
      }
    },
    checkfirstname() {
      const usernameRegex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
      if (this.firstname.match(usernameRegex)) {
        this.firstnameErrorMessage = "";
      } else {
        this.firstnameErrorMessage = `Vous ne pouvez utiliser que des lettres, espaces, - et ' "`;
      }
    },
    checklastname() {
      const usernameRegex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
      if (this.lastname.match(usernameRegex)) {
        this.lastnameErrorMessage = "";
      } else {
        this.lastnameErrorMessage = `Vous ne pouvez utiliser que des lettres, espaces, - et ' "`;
      }
    },
    checkEmail() {
      const mailRegex = /^[a-z0-9-._]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
      if (this.email.match(mailRegex)) {
        this.emailErrorMessage = "";
      } else {
        this.emailErrorMessage = "Format incorrect";
      }
    },
    checkPassword() {
      const passwordRegex =
        /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (this.password.match(passwordRegex)) {
        this.passwordErrorMessage = "";
      } else {
        this.passwordErrorMessage =
          "Utilisez au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial";
      }
    },
    signUp() {
      if (
        this.pseudo === "" ||
        this.firstname === "" ||
        this.lastname === "" ||
        this.email === "" ||
        this.password === ""
      ) {
        this.pseudoErrorMessage = "Obligatoire";
        this.firstnameErrorMessage = "Obligatoire";
        this.lastnameErrorMessage = "Obligatoire";
        this.emailErrorMessage = "Obligatoire";
        this.passwordErrorMessage = "Obligatoire";
      } else {
        fetch(`http://localhost:3000/api/users/signup`, {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.pseudo,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => {
            this.$router.push("/login");
            console.log(response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
#signup_container {
  height: 100%;
  margin-bottom: 17%;
}
form {
  color: black;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(225, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(255, 170, 0, 0.8), rgba(0, 0, 255, 0) 70.71%);
  width: 400px;
  margin: auto;
  margin-top: 40px;
  padding: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 60%;
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: auto;
  }
}

.title_card {
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

h2 {
  color: black;
}

label {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>