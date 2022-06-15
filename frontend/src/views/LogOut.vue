<template>
<div id="logout-card">
    <p>Déconnection !</p>
    <p><router-link :to="{name: 'LogIn'}">cliquez pour vous reconnectez</router-link></p>
</div>
    
</template>

<script>

export default {
  name: "LogOut",
  
};
</script>

<style>
#logout_card {
  background-color: white;
  color: black;
  border-radius: 20px;
  border: 2px solid red;
  text-align: center;
  margin: auto;
}
</style>
