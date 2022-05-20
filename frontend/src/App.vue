<template>
  <div id="container">
    <img alt="logo Groupomania" src="./assets/icon.png" id="logo" />
    <HelloWorld msg="Groupomania" />
    <div id="form">
      
      <router-link to="/signup">Inscription</router-link>
      <SignUp />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import SignUp from "@/views/SignUp";

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
