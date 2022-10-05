<template>
  <div class="container">
    <NavBar :isLoggedIn="isLoggedIn" :userId="userId" />
    <router-view  />

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
  @media screen and (max-width: 992px) {
    width: 95%;
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
</style>