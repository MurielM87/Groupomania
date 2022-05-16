<template>
<div id="main">
  <h2>Connection</h2>

    <form action='' id='log_in_form'>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text'
                name='email'
                id='email'    
                required      
            />           
            <br />
            <label htmlFor='password'>Mot de Passe</label>
            <br />
            <input type='password'
                name='password'
                id='password'  
                required              
            />
            <br />
            <button id="btn_login" type="submit">Se connecter</button>
        </form>
</div>
    
</template>

<script>
export default {
  name: 'LogIn',
  props: {
    msg: String
  },
  data: function() {
    return {
      mode: 'login',
    }
  },
  methods : function() {

  }
}
</script>

<style>
h2 {
  font-size: 22px;
  color: black;
  text-align: left;
  padding-left: 15px;
}

#main {
  width: 350px;
  height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
  padding-bottom: 30px;
  background-color: peru;
}

#email, #password {
  margin: 10px;
  padding: 0px 10px;
}

#btn_login {
  background-color: red;
  border-radius: 5px;
  padding: 10px;
  font-size: 15px;
  margin: 10px 0px;
}

#log_in_form{
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}
</style>