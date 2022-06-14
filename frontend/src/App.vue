<template>
  <div id="container">  
    <NavBar />
   
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