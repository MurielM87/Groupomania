<template>
  <div class="container">
    <NavBar :isLoggedIn="isLoggedIn" :userId="userId" />
    <router-view :key="$route.fullPath" />

    <FooterPage />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterPage from "./components/FooterPage.vue";
import { ref } from "vue"

export default {
  name: "App",
  components: {
    NavBar,
    FooterPage,
  },
  data() {
    return {
      isLoggedIn: ref(false),
      userId: localStorage.getItem('userId')
    }
  },

  computed(){
    return this.isLoggedIn
  },

  watch: {
    $route:'refreshData',    
  },
  
  methods: {
    refreshData() {
      const token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      if (token && userId) {
        this.isLoggedIn = true
        this.userId = userId
      } else {
        this.isLoggedIn = false
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 1394px;
  margin: 0px auto;
  background: linear-gradient(217deg, rgba(255,214,214,.8), rgba(255,0,0,0) 20.71%),
              linear-gradient(127deg, rgba(253, 45, 1, 0.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(78, 81, 102, 0.8), rgba(0,0,255,0) 70.71%);
  @media screen and (max-width: 992px) {
    width: 100%;
  }
}
#app {
  position: relative;
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: auto;
}

input, button, textarea {
  font-family: "Lato", sans-serif;
}
</style>