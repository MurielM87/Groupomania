<template>
  <div id="container">  
    <NavBar />
    <div id="form">
      <router-link :to="{name: 'LogIn'}">Connexion</router-link>
      <router-link :to="{name : 'SignUp' }">Inscription</router-link>
    </div>
    <router-view :user='user' />
   
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';


export default {
  name: 'App',
  components: {
    NavBar, 
  },
  
}

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