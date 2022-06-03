<template>
  <div id="navbar">
    <img alt="logo Groupomania" src="../assets/icon.png" id="logo" />
    <h1>{{ msg }}</h1>
    <div id="barre">
      <li class="menu">
        <ul>Connexion</ul>
        <ul>Inscription</ul>
      </li>
      <li class="menu">
        <ul>Bonjour</ul>
        <ul>Profil</ul>
        <ul>Déconnexion</ul>
      </li>
    </div>
      

    
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

<style lang="sass">
#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  margin: auto;
}

#logo {
    width: 150px;
    display: flex;
    flex-direction: flex-start;
    margin-left: 10px;
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
  color: #b97242;
}
</style>
