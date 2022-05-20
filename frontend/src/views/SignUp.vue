<template>
  <div id="card">
    <h2 class="card_title">Inscription</h2>
    <div class="form-row">
      <label for="pseudo">Choississez votre pseudo</label>
      <br/>
      <input v-model="pseudo" class="form-row_input" type="text" name="pseudo" />
      <br />
    </div>
    <div class="form-row">
      <label for="email">Email</label>
      <br/>
      <input v-model="email" class="form-row_input" type="text" name="email" />
    </div>
    <div class="form-row">
      <label for="firstname">Prénom</label>
      <br/>
      <input v-model="firstname" class="form-row_input" type="text" name="firstname" />
      <br />
      <label for="lastname">Nom</label>
      <br/>
      <input v-model="lastname" class="form-row_input" type="text" name="lastname" />
    </div>
    <div class="form-row">
      <label for="password">Mot de passe</label>
      <br/>
      <input v-model="password" class="form-row_input" type="password" name="password" />
    </div>
    <div class="form-row">
      <button @click="color = color === 'red' ? 'green' : 'red'" type="submit" class="button">Inscription</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const color = ref('red');


</script>

<style scoped>
#card {
  color: black;
}

.button {
  background-color: v-bind(color);
}
</style>