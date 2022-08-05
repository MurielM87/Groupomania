<template>
  <header>
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
            ><i class="fas fa-portrait"><span class="text_desktop"> Mon profil</span></i></router-link
          >
        </ul>
        <ul>
          <router-link :to="{ name: 'LogIn' }" @click="this.logOut"
            ><i class="fas fa-sign-out-alt"><span class="text_desktop"> Déconnexion</span></i></router-link
          >
        </ul>
      </li>
      <li v-else class="menu">
        <ul>
          <router-link :to="{ name: 'LogIn' }"
            ><i class="fas fa-sign-in-alt"><span class="text_desktop"> Connexion</span></i></router-link
          >
        </ul>
        <ul>
          <router-link :to="{ name: 'SignUp' }"
            ><i class="fas fa-user-plus"><span class="text_desktop"> Inscription</span></i></router-link
          >
        </ul>
      </li>
    </div>
  </header>
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
    const userId = localStorage.getItem('userId')
    if (token !== null && userId !== null) {
      this.isLoggedIn = true
    } else {
      this.$router.push({name: "LogIn"})
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push({name : "LogIn"});
    },
  },
}
</script>

<style lang="scss">
header {
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
  margin-left: 150px;
  @media screen and (max-width: 992px) {
    margin-left: 0px;
  }
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  padding-right: 150px;
  @media (min-width: 768px) and (max-width: 992px) {
    padding-right: 0px;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    padding-right: 0px;
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
    font-size: 15px
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
}
.barre_color {
  width: 100%;
  border-bottom: 2px solid #4e5166;
  margin-bottom: 20px;
}
</style>
