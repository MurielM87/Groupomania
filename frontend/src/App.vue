<template>
  <div id="container">  
    <NavBar msg="Groupomania" />
    <div id="form">
      <router-link :to="{name: 'LogIn'}">Connexion</router-link>
      <router-link :to="{name : 'SignUp' }">Inscription</router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";


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
</style>