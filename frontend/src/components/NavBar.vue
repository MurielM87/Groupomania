<template>
  <div id="navbar">
    <div v-if="this.isLoggedIn">
      <router-link :to="{ name: 'MainPage' }"
        ><img alt="logo Groupomania" src="../assets/icon.png" class="logo"
      /></router-link>
    </div>
    <div v-else>
      <img alt="logo Groupomania" src="../assets/icon.png" class="logo" />
    </div>

    <div v-if="this.isLoggedIn">
      <router-link :to="{ name: 'MainPage' }"><h1>Groupomania</h1></router-link>
    </div>
    <h1 v-else>Groupomania</h1>

    <div id="barre">
      <li v-if="this.isLoggedIn" class="menu">
        <ul>
          <router-link :to="{ name: 'ProfilUser' }"
            ><span class="text_desktop"><i class="fas fa-portrait">Profil</i></span></router-link
          >
        </ul>
        <ul>
          <router-link :to="{ name: 'LogOut' }" @click="this.logOut"
            ><span class="text_desktop"><i class="fas fa-sign-out-alt">Déconnexion</i></span></router-link
          >
        </ul>
      </li>
      <li v-else class="menu">
        <ul>
          <router-link :to="{ name: 'LogIn' }"
            ><i class="fas fa-sign-in-alt"><span class="text_desktop">Connexion</span></i></router-link
          >
        </ul>
        <ul>
          <router-link :to="{ name: 'SignUp' }"
            ><span class="text_desktop"><i class="fas fa-user-plus">Inscription</i></span></router-link
          >
        </ul>
      </li>
    </div>
  </div>
  <div class="barre_color"></div>
</template>

<script>
export default {
  name: "NavBar",
    data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token !== null) {
      this.isLoggedIn = true
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push({name : "LogOut"});
    },
  },
}
</script>

<style lang="scss">
#navbar {
  width: 100%;
  height: 100px;
  margin: auto;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.logo {
  width: 100px;
  display: flex;
  flex-direction: flex-start;
  margin-left: 180px;
  @media screen and (max-width: 992px) {
    margin-left: 0px;
  }
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
  @media (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    align-content: center;
  }
}
ul {
  list-style-type: none;
  padding: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    padding: 10px;
    margin-right: 10px;
  }
}
.text_desktop {
  color: black;
  text-decoration: none;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.fa-sign-in-alt,
.fa-user-plus,
.fa-sign-out-alt,
.fa-portrait {
  color: black;
  &:hover {
    color: red;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    display: none;
  }
}
.barre_color {
  width: 100%;
  border-bottom: 2px solid #4e5166;
  margin-bottom: 20px;
}
</style>
