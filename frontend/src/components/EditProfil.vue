<template>
<NavBar/>
  <form id="profil_form" enctype="multipart/form-data">
    <h2>Modifier votre profil</h2>
    
    <div class="img">
      <i class="far fa-user-circle"></i>
      <div class="photo_icone">
        <img :src="image" class="profil_image" />
        <input
          @change="uploadFile"
          type="file"
          name="avatar de {{user.pseudo}}"
          id="profil_image"
          accept=".jpeg, .jpg, .png, .webp, .gif"
          ref="file"
        />
      </div>
    </div>

    <div id="separate_barre"></div>

    <div class="profil_informations">
      <div class="form-profil">
        <div class="form_group">
          <label for="pseudo">Pseudo : </label>
          <input
            type="text"
            v-model="user.pseudo"
            placeholder="votre pseudo"
            name="pseudo"
            id="pseudo"
            class="form_input"
            required
          />
        </div>
        <div class="form_group">
          <label for="firstname">Prénom : </label>
          <input
            type="text"
            v-model="user.firstname"
            placeholder="votre prénom"
            name="firstname"
            id="firstname"
            class="form_input"
            required
          />
        </div>
        <div class="form_group">
          <label for="lastname">Nom : </label>
          <input
            type="text"
            v-model="user.lastname"
            placeholder="votre nom"
            name="lastname"
            id="lastname"
            class="form_input"
            required
          />
        </div><br />
        <button
          @click.prevent="updateProfil"
          class="form_btn"
          title="enregistrer les modifications"
        ><i class="fas fa-save"></i> Enregistrer les modifications </button>
        <button @click="$router.go(-1)" class="form_btn">
          <i class="fas fa-times-circle"></i> Annuler les modifications </button
        ><br />

        <button
          class="delete_btn"
          @click="deleteUser"
          title="supprimer le compte"
        >
          <i class="fas fa-trash-alt"></i>
          Supprimer le compte
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import NavBar from "./NavBar.vue";

export default {
  name: "ProfilUser",
  components: { NavBar },
  emit: ["input"],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      user: ref({
        pseudo: "",
        firstname: "",
        lastname: "",
        imageUrl: "",
      }),
      image: this.imageUrl,
    };
  },
  
  //get all the informations about the user
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
    console.log("EditProfil||data", data);
    this.user = data;
    })
    .catch((err) => console.log(err));
  },

  methods: {
    //upload profil image
    uploadFile(e) {
      const imageUrl = e.target.files[0];
      //preview image
      this.image = URL.createObjectURL(imageUrl);
      this.$emit("input", e.target.files[0]);
      console.log("ProfilEdit||file", imageUrl);
    },
      
    //modify profil
    updateProfil() {
      const user = {
        pseudo: this.user.pseudo,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        imageUrl: this.image,
      };
      console.log("ProfilEdit||userProfil", user);
      console.log("ProfilEdit||pseudo", user.pseudo);
      console.log("ProfilEdit||firstname", user.firstname);
      console.log("ProfilEdit||lastname", user.lastname);
      console.log("ProfilEdit||image", this.image);
      console.log("ProfilEdit||imageUrl", user.imageUrl)
      
      const fd = new FormData();
      fd.append("image", this.image);
      fd.append("pseudo", user.pseudo);
      fd.append("firstname", user.firstname);
      fd.append("lastname", user.lastname);
      
      fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
        method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: fd,
        })
        .then(() => {
          alert("profil modifié");
          console.log("edit-profil||user", this.user);
          this.$router.push("/profil/${this.userId}")
        })
        .catch((error) => {
          console.error(error)
          console.warn("ProfilEdit||FormData", fd);
        });

    },
       

    //delete user
    deleteUser() {
      if (window.confirm("vous allez supprimer votre compte. Êtes-vous certain de votre choix?"))
        fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            user: this.user,
          }),
        })
        .then((res) => {
          console.log("res", res);
          this.$emit("deleteUser");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          this.$router.push({ name: "SignUp" });
        })
        .catch((err) => {
          console.log(err);
        });
      },
  },
};
</script>

<style lang="scss">
.photo_icone {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#separate_barre {
  border: 1px solid #455166;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}

.form_btn {
  margin-right: 10px;
}

.delete_btn {
  margin-top : 10px;
}

</style>