<template>
    <div>
        <h2>Profil</h2>
        <img src="../assets/avatar_default.png" alt="avatar par defaut" />
        <form action="post">
            <div>
                <label>Pseudo</label>
                <input type="text" placeholder="{{ user.pseudo }}"/>
            </div>
            <div>
                <label>Prénom</label>
                <input type="text" placeholder="{{ user.firstname }}"/>
            </div>
            <div>
                <label>Nom</label>
                <input type="text" placeholder="{{ user.lastname }}"/>
            </div>
            <div>
                <label>Département</label>
                <input/>
            </div>
            
        </form>
    </div>
</template>

<script>
export default {
  name: "ProfilUser",
  
};
</script>

<style lang="scss">

</style>