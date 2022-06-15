<template>
    <div id="profil_form">
        <h2>Profil</h2>
        <img src="../assets/avatar_default.png" alt="avatar par defaut" id="profil_photo" />
        <form action="post">
            <div>
                <label>Pseudo</label>
                <br />
                <input type="text" placeholder="{{ user.pseudo }}"/>
            </div>
            <div>
                <label>Prénom</label>
                <br />
                <input type="text" placeholder="{{ user.firstname }}"/>
            </div>
            <div>
                <label>Nom</label>
                <br />
                <input type="text" placeholder="{{ user.lastname }}"/>
            </div>
            <div>
                <div>Articles publiés</div>
                <div>liste</div>
            </div>
            
        </form>
    </div>
</template>

<script>
export default {
  name: "ProfilUser",
  
};
</script>

<style>
#profil_form {
    color: black;
}

#profil_photo {
    width: 300px;
    object-fit: contain;
    text-align: center;
}
</style>