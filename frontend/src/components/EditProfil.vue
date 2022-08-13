<template>
  <form id="profil_form">
    <h2>Modifier votre profil</h2>

    <div class="img" enctype="multipart/form-data">
      <div id="photo_icone">
        <img :src="image" alt="Avatar" class="profil_image" />
        <input
          @change="onFileSelected"
          type="file"
          name="avatar"
          id="profil_image"
          accept=".jpeg, .jpg, .png, .webp, .gif"
          ref="fileInput"
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
            v-model.lazy="user.pseudo"
            placeholder="{{user.pseudo}}"
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
            v-model.lazy="user.firstname"
            placeholder="{{user.firstname}}"
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
            v-model.lazy="user.lastname"
            placeholder="{{user.lastname}}"
            name="lastname"
            id="lastname"
            class="form_input"
            required
          />
        </div>
        <button
          @click="updateProfil"
          class="form_btn"
          title="enregistrer les modifications"
        ><i class="fas fa-save"></i> Enregistrer les modifications </button>
        <button @click="cancelProfil" class="form_btn">
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

export default {
  name: "ProfilUser",
  props: ["userId", "token"],
  data() {
    return {
      user: ref({
        pseudo: "",
        firstname: "",
        lastname: "",
        imageUrl: "",
      }),
      image: this.imageUrl,
    };
  },
  created() {
  //  this.token = localStorage.getItem("token");
    this.getUserProfil;
  },
  methods: {
    //get all the informations about the user
    getUserProfil() {
      const userId = localStorage.getItem("userId", userId);
      fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          console.log("res", res);
          this.user = res.data;
        })
        .catch(() => {
          this.$router.push({ name: "Login" });
        });
    },
    //upload profil image
    onFileSelected(e) {
      const imageUrl = e.target.files[0];
      //preview image
      this.image = URL.createObjectURL(imageUrl);
      this.$emit("input", e.target.files[0]);
      console.log("ProfilEdit||file", imageUrl)
    },

    updateProfil() {
      const user = {
        pseudo: this.pseudo,
        firstname: this.firstname,
        lastname: this.lastname,
        image: this.imageUrl,
      }
      console.log("ProfilEdit||userProfil", user);
      console.log("ProfilEdit||pseudo", this.pseudo);
      console.log("ProfilEdit||firstname", this.firstname);
      console.log("ProfilEdit||lastname", this.lastname);
      console.log("ProfilEdit||imageUrl", this.imageUrl);
      const fd = new FormData();
      console.log("ProfilEdit||FormData", fd);
    //  this.$refs.file();
    },
    //  onUpload(){
    //    
    //    fd.append('image', this.selectedFile, this.selectedFile.name)
    //    fetch(`http://localhost:3000/api/users/profil/${this.userId}`, fd, {
    //      method: "POST",
    //      headers: {
    //        "Content-Type": "multipart/form-data",
    //        "Accept": "application/json",
    //        "Authorization": `Bearer ${this.token}`
    //      },
    //      body: FormData,
    //    })
    //    .then(res => {
    //      console.log(res)
    //    })
    //  },

    /*//modify userProfil
    computed: {
      updateProfil(userId) {
        fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
          method: "PUT",
          data: this.user,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            user: this.user,
            selectedFile: this.selectedFile,
          }),
        })
          .then(() => {
            alert("profil modifié");
            console.log("userId", userId);
            console.log("this.userId", this.userId);
            let user = JSON.parse(localStorage.getItem("user"));
            console.log("edit-profil||user", user);
            //this.$router.push({ name: "ProfilUser"})
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
    },*/

    //delete user
    deleteUser() {
      if (
        window.confirm(
          "vous allez supprimer votre compte. Êtes-vous certain de votre choix?"
        )
      )
        fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            user: this.$user,
          }),
        })
          .then((res) => {            
              console.log("res", res)
              this.$emit('deleteUser')
              //localStorage.removeItem("token");
              //localStorage.removeItem("userId");
              //this.$router.push({ name: "SignUp" });
            
          })
          .catch((err) => {
            console.log(err);
          });
    },

    //cancel the modifications
    cancelProfil(){
      this.$router.push("/profil/${this.userId}")    
    }
  },
};
</script>

<style lang="scss">
#photo_icone {
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

</style>