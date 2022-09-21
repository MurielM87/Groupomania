<template :key="componentKey">
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
          <router-link :to="{name: 'ProfilUser', params: {id: this.userId} }" 
            ><i class="fas fa-user-circle"><span class="text_desktop"> Mon profil</span></i></router-link
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
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      isLoggedIn: false,
      componentKey: 0,
    }
  },

  async created() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    console.log("NavBar||created", userId)
    console.log("NavBar||created", token)
    if (token && userId) {
      this.$emit('userId')
      this.isLoggedIn = true
      console.log("NavBar||created||userId", userId)
    } else {
      this.$router.push({name: "LogIn"})
    }
  },
  
  methods: {
    forceRerender() {
      this.componentKey +1;
    },
    
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push({name : "LogIn"});
      this.isLoggedIn = false;
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
  color: black;
  font-size: 35px;
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-left: 175px;
  @media screen and (max-width: 992px) {
    margin-left: 0px;
  }
}

.logo {
  width: 100px;
  display: flex;
  flex-direction: flex-start;
  margin-left: 100px;
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
     background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(209, 166, 14, 0.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(233, 193, 134, 0.8), rgba(0,0,255,0) 70.71%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 20px
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
