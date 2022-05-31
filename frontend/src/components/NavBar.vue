<template>
  <div class="navbar">
    <img alt="logo Groupomania" src="../assets/icon.png" id="logo" />
    <h1>{{ msg }}</h1>
    <li>
      <ul><router-link :to="{ name: 'SignUp' }">Inscription</router-link></ul>
      <ul><router-link :to="{ name: 'LogIn' }">Connexion</router-link></ul>
    </li>
    <li>
      <ul>Profil</ul>
      <ul>Déconnexion</ul>
    </li>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
};
</script>

<style>
#navbar {
  display: flex;
  flex-direction: row;
}

#logo {
    width: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 0 10px;
}
a {
  color: #b97242;
}
</style>
