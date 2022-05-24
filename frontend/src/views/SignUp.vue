<template>
  <form id="signup" class="card">
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
      <label for="password">Mot de passe</label>
      <br />
      <input
        v-model="password"
        ref="password"
        class="form-row_input"
        type="password"
        name="password"
      />
      <div v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="form-row">
      <button @click="signUp" type="submit" class="button">Inscription</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/api/";

export default {
  name: "SignUp",

  setup() {
    const SignUp = () => {
      return {
        pseudo: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordError: "",
      };
    };
    console.log("signUp", SignUp);
    return { SignUp },
    //SignUp: axios.get(url + 'signup/'),
          
  SignUp(credentials) = {
    if (
  pseudo= this.pseudo,
  email= this.email,
  firstname= this.firstname,
  lastname= this.lastname,
  password= this.password
) {
  return axios
      .post(url + "sign-up/", credentials)
      .then((response) => response.data)
}
    
  }
  },
  

  /*
  data() {
    return {
      pseudo: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      passwordError: "",
    }; 
  }, 
  created: function () {
    this.submitForm();
  },
  methods: {
    signUp() {
      console.log('form submitted')
      //validate password
      this.passwordError = this.password.length > 5 ? '' : "Le mot de passe doit contenir au moins 6 caractères"

      if(!this.passwordError) {
        console.log('pseudo', this.pseudo)
        console.log('email', this.email)
        console.log('firstname', this.firstname)
        console.log('lastname', this.lastname)
        console.log('password', this.password)
      }
    },

    axios.get('localhost:3000')
  .then(function (response) {
    console.log(response.data)
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.config)
  })
   
   
    async submitForm() {
      
      try {
        const response = await axios.get(
          "http://localhost:3000/signup"
        );
        this.pseudo = response.data.pseudo;
        this.email = response.data.email;
        this.lastname = response.data.lastname;
        this.firstname = response.data.firstname;
        this.password = response.data.password;
      } catch (err) {
        console.log(err);
      }
    },
  },*/
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