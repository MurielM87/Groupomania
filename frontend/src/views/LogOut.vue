<template>
<div>
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

</style>
