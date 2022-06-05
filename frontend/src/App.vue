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
import axios from 'axios';

export default {
  name: 'App',
  components: {
    NavBar, 
  },
  data() {
            return {
                user: null
            }
        },
        async created() {
            const response = await axios.get('user', {
              headers: {
                Authorization: 'Bearer' + localStorage.getItem('token')
              }
            });
            console.log(response);
            this.user = response.data;
        }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: red;
  margin-top: 60px;
}
</style>