<template>
  <div class="container">
    
    <router-view />

    <FooterPage />
  </div>
</template>

<script>
import FooterPage from "./components/FooterPage.vue";

export default {
  name: "App",
  components: {
    FooterPage,
  }
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
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: auto;
}
</style>