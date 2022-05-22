<template>
  <form id="login" class="card">
    <h2 class="card_title">Connexion</h2>

    <label for="email">Email</label>
    <br />
    <input
      v-model="email"
      ref="email"
      class="form-row_input"
      type="text"
      name="email"
    />
    <br />
    <label for="password">Mot de passe</label>
    <br />
    <input
      v-model="password"
      ref="password"
      class="form-row_input"
      type="password"
      name="password"
    />
    <br />
    <button @click="submitForm" type="submit" class="button">Connexion</button>
  </form>
</template>

<script>
export default {
  setup() {
    
  },
}
</script>

<style>

</style>