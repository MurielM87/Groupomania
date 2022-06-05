<template>
<div>
    <p>Vous êtes déconnecté !</p>
    <p><router-link :to="{name: 'LogIn'}">cliquez pour vous reconnectez-vous</router-link></p>
</div>
    
</template>

<script>

export default {
  name: "LogOut",
  
};
</script>

<style lang="scss">

</style>
