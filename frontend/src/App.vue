<template>
  <div id="container">
    <img alt="logo Groupomania" src="./assets/icon.png" id="logo" />
    <HelloWorld msg="Groupomania" />
    <div id="form">
      <router-link to="/login">Connection</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: red;
  margin-top: 60px;
}

#logo {
  width: 200px;
}
</style>
