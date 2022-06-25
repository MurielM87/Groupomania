<template v-if="!token">
<div id="logout_card">
    <h2>A bientôt !</h2>
    <p><router-link :to="{name: 'LogIn'}">cliquez ici pour vous reconnecter</router-link></p>
</div>
    
</template>

<script>

export default {
  name: "LogOut",
  
};
</script>

<style lang="scss">
#logout_card {
  width: 30%;
  background-color: #FFD7D7;
  color: black;
  border-radius: 20px;
  border: 2px solid red;
  text-align: center;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 100px;
  padding: 50px;
  @media screen and (max-width: 992px) {
    width: 70%;
  }
}
</style>
