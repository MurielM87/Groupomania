<template>
  <form id="profil_form">
    <h2>Modifier votre profil</h2>

    <div class="img" enctype="multipart/form-data">
      <div id="photo_icone">
        <img
          default-src="../assets/avatar.png"
          alt="avatar par defaut"
          class="profil_image"
          v-if="!user.imageUrl"
        />
      </div>
      <input @change="onFileSelected" type="file" name="avatar" id="profil_image" accept=".jpeg, .jpg, .png, .webp, .gif" ref="fileInput" />
   <!--   <button @click="onUpload()">Télécharger</button> -->
    <button
        type="button"
        @click="browse()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      ></button>
      <button
        type="button"
        v-if="value"
        @click="remove()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      ></button>
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
          <div class="form-err"></div>
        </div>
        <div class="form_group">
          <label for="firstname">Prénom : </label>
          <input
            type="text"
            v-model.lazy="user.firstname"
            placeholder={{user.firstname}}
            name="firstname"
            id="firstname"
            class="form_input"
            required
          />
          <div class="form-err"></div>
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
          <div class="form-err"></div>
        </div>
        <button @click="updateProfil(userId)" class="form_btn" title="enregistrer les modifications"><i class="fas fa-save"></i>
          enregistrer les modifications
        </button>

        <button
          class="delete_btn"
          @click="deleteUser(userId)"
          title="supprimer le compte"
        ><i class="fas fa-trash-alt"></i>
          supprimer le compte
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProfilUser",
  data() {
    return {
      user: {
        pseudo: "",
        firstname: "",
        lastname: "",
        imageUrl: "",
      },
      selectedFile: null,
    };
  },
  created() {
    this.token = localStorage.getItem("token");
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
          "Authorization": `Bearer ${this.token}`,
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
  browse() {
      this.$refs.file.click();
    },
    remove() {
      this.$emit("input", null);
    },
    onFileSelected(e) {
      this.$emit("input", e.target.files[0]);
    },
  //  onFileSelected(e) {
  //    console.log(e)
  //    //this.selectedFile = event.target.files[0]
  //    this.$emit("input", e.target.files[0]);
  //  },
  //  onUpload(){
  //    const fd = new FormData();
  //    this.$refs.file.click();
  //    //fd.append('image', this.selectedFile, this.selectedFile.name)
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

    //modify userProfil
   computed:{
    updateProfil(userId) {
      fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
        method: "PUT",
        data: this.user,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
        body: JSON.stringify({
            user: this.user,
            selectedFile: this.selectedFile,
          }),
      }).then(() => {
        alert("profil modifié");
        console.log("userId", userId); 
        console.log("this.userId", this.userId);
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("edit-profil||user", user)
        //this.$router.push({ name: "ProfilUser"})
      })
      .catch(err => {console.log("err", err)});
    },

   }, 
    //delete user
    deleteUser(userId) {
      if (
        window.confirm(
          "vous allez supprimer votre compte. Êtes-vous certain de votre choix?"
        )
      )
        fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            user: this.user
          }),
        })
          .then((res) => {
            if (res) {
              console.log("userId", userId);
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              this.$router.push({ name: "SignUp" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
</script>

<style lang="scss">
#separate_barre {
  border: 1px solid #455166;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>