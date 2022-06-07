<template>
  <div id="navbar">
    <img alt="logo Groupomania" src="../assets/icon.png" class="logo" />
    
    <h1>Groupomania</h1>

    <div id="barre">
      <div v-if="user">
        <router-link :to="{ name: 'MainPage' }">Page d'accueil</router-link>
        <p>Bonjour {{ user.pseudo }}</p>
        <li class="menu">
          <ul>
            <router-link :to="{ name: 'ProfilUser' }">Profil</router-link>
          </ul>
          <ul>
            <router-link :to="{ name: 'LogOut' }">Déconnexion</router-link>
          </ul>
        </li>
      </div>
      <li class="menu" v-if="!user">
        <ul>
          <router-link :to="{ name: 'LogIn' }">Connexion</router-link>
        </ul>
        <ul>
          <router-link :to="{ name: 'SignUp' }">Inscription</router-link>
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["user"],
  methods: {
    handleClick() {
      localStorage.removeItem("token");
      this.$router.push("/logout");
    },
  },
};
</script>

<style>
#navbar {
  width: 80%;
  height: 100px;
  margin: auto;
  color: black;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  display: flex;
  flex-direction: flex-start;
  margin-left: 100px;
}

#barre {
  display: flex;
  flex-direction: column;
}

.menu {
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px;
}
ul {
  list-style-type: none;
  padding: 20px;
}

a {
  color: red;
}
</style>
