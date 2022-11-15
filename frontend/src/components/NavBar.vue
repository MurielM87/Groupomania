<template>
  <div id="navbar">
    <header>
      <div v-if="isLoggedIn">
        <router-link :to="{ name: 'MainPage' }"
          ><img alt="logo Groupomania" src="../assets/icon.png" class="logo"
        /></router-link>
      </div>
      <div v-else>
        <img alt="logo Groupomania" src="../assets/icon.png" class="logo" />
      </div>

      <div v-if="isLoggedIn">
        <router-link :to="{ name: 'MainPage' }"
          ><h1>Groupomania</h1></router-link
        >
      </div>
      <h1 v-else>Groupomania</h1>

      <div id="barre">
        <li v-if="isLoggedIn" class="menu">
          <ul>
            <router-link
              :to="{ name: 'ProfilUser', params: { id: this.userId } }"
              ><i class="fas fa-user-circle"
                ><span class="text_desktop"> Mon profil</span></i
              ></router-link
            >
          </ul>
          <ul>
            <router-link :to="{ name: 'LogIn' }" @click="this.logOut"
              ><i class="fas fa-sign-out-alt"
                ><span class="text_desktop"> Déconnexion</span></i
              ></router-link
            >
          </ul>
        </li>
        <li v-else class="menu">
          <ul>
            <router-link :to="{ name: 'LogIn' }"
              ><i class="fas fa-sign-in-alt"
                ><span class="text_desktop"> Connexion</span></i
              ></router-link
            >
          </ul>
          <ul>
            <router-link :to="{ name: 'SignUp' }"
              ><i class="fas fa-user-plus"
                ><span class="text_desktop"> Inscription</span></i
              ></router-link
            >
          </ul>
        </li>
      </div>
    </header>
    <div class="barre_color"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    isLoggedIn: Boolean,
    userId: String,
  },

  computed() {
    return this.isLoggedIn;
  },

  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push({ name: "LogIn" });
    },
  },
};
</script>

<style lang="scss">
#navbar {
  width: 100%;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 100px;
  margin: auto;
  color: black;
  background-color: #fffefe;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  color: black;
  font-size: 35px;
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-left: 175px;
  @media (min-width: 480px) and (max-width: 992px) {
    margin-left: 0px;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
}

.logo {
  width: 100px;
  display: flex;
  flex-direction: flex-start;
  margin-left: 100px;
  @media (min-width: 480px) and (max-width: 992px) {
    margin-left: 0px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 15%;
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
  margin: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
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
  font-family: "Lato", sans-serif;
  color: black;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.fa-sign-in-alt,
.fa-user-plus,
.fa-sign-out-alt,
.fa-user-circle {
  color: black;
  font-size: 20px;
  &:hover {
    background: linear-gradient(
        217deg,
        rgba(255, 0, 0, 0.8),
        rgba(255, 0, 0, 0) 70.71%
      ),
      linear-gradient(
        127deg,
        rgba(209, 166, 14, 0.8),
        rgba(0, 255, 0, 0) 70.71%
      ),
      linear-gradient(
        336deg,
        rgba(233, 193, 134, 0.8),
        rgba(0, 0, 255, 0) 70.71%
      );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 20px;
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
