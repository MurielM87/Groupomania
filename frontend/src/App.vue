<template>
  <div class="container">
    <NavBar />
    <img src="./assets/icon.svg" alt="logo" id="logo_background" />
    <router-view :user="isLoggedIn" />

    <FooterPage />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterPage from "./components/FooterPage.vue";


export default {
  name: "App",
  components: {
    NavBar,
    FooterPage,
  },
  setup(){
     class isLoggedIn {
      constructor(user) {
        fetch("http://localhost:3000/api/user/", {
          method: "GET",
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            this.user=res.user;
            console.log(res.user);
          })
          .catch((err) => console.log(err));

        console.log(user);
      }
    }

    return {
      isLoggedIn,
    
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 1394px;
  margin: 0px auto;
  @media screen and (max-width: 992px) {
    width: 95%;
  }
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: auto;
}
#logo_background {
  width: 600px;
  position: absolute;
  left: 33%;
  top: -100px;
  z-index: -1;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 400px;
    top: 10px;
    left: 25%;
  }
  @media screen and (max-width: 768px) {
    width: 400px;
    position: absolute;
    top: 15px;
    left: 125px;
  }
}
</style>