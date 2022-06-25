<template>
  <form id="profil_form">
    <h2>Modifier votre profil</h2>
    <div id="photo_icone">
      <img
        src="../assets/avatar_default.png"
        alt="avatar par defaut"
        id="photo_profil"
      />
      <label for="file-input" @click="modifyImg"
        ><i class="fas fa-images"></i
      ></label>
      <input type="file" id="file-input" placeholder="value" />
    </div>
    <div>
      <label>Pseudo</label>
      <br />
      <input
        type="text"
        v-model="pseudo"
        placeholder="{{ user.pseudo }}"
        required
      />
    </div>
    <div>
      <label>Prénom</label>
      <br />
      <input
        type="text"
        v-model="firstname"
        placeholder="{{ user.firstname }}"
        required
      />
    </div>
    <div>
      <label>Nom</label>
      <br />
      <input
        type="text"
        v-model="lastname"
        placeholder="{{ user.lastname }}"
        required
      />
    </div>
    <button v-on:click.prevent="editProfil" id="btn_save" class="btn">
      <i class="fas fa-save"
        ><span class="text_desktop">Enregistrer les modifications</span></i
      >
    </button>
    <button v-on:click.prevent="deleteProfil" id="btn_delete" class="btn">
      <i class="fas fa-trash-alt"
        ><span class="text_desktop">Supprimer le profil</span></i
      >
    </button>
  </form>
</template>

<script>
export default {
  name: "ProfilUser",
  data() {
    return {
      pseudo: this.pseudo,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },
  methods: {
    modifyImg() {
      let userPicture = document.getElementById("new-picture");
      console.log(userPicture.files[0]);
      if (userPicture.files[0] == undefined) {
        return;
      }
      let userData = JSON.parse(localStorage.getItem("user"));
      let formData = new FormData();
      formData.append("image", userPicture.files[0]);
      formData.append("user", userData);
      console.log(formData);
      let res = fetch(
        `http://localhost:3000/api/auth/image/${userData.userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      if (!res.ok) {
        let data = res.json();
        if (data == "Request not authorized" || data == "User ID invalid") {
          localStorage.removeItem("user");
          window.location.href = "http://localhost:8080/login";
        }
        throw new Error();
      }
      let data = res.json();
      console.log(data);
      let resGet = fetch(`http://localhost:3000/api/auth/${userData.userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (!resGet.ok) {
        throw new Error();
      }
      let dataGet = resGet.json();
      console.log(dataGet);
      document.getElementById("profile-image").src = dataGet.picture;
    },

    editProfil() {
      console.log("editProfil");
      if (this.pseudo === "" || this.firstname === "" || this.lastname === "") {
        console.log("error");
      } else {
        fetch("http://localhost:3000/api/user/:id", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.pseudo,
            firstname: this.firstname,
            lastname: this.lastname,
          }),
        })
          .then((response) => {
            this.$router.push("/profil");
            console.log(response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    deleteProfil() {
      console.log("deleteProfil");
      fetch("http://localhost:3000/api/user/:id", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo: this.pseudo,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => {
          this.$router.push("/login");
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style lang="scss">
#profil_form {
  color: black;
}
#photo_icone {
  position: relative;
}
.fa-images {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 50%;
  position: absolute;
  bottom: 10%;
  right: 10%;
  &:hover {
    background: #ffd7d7;
    color: red;
  }
  @media screen and (max-width: 768px) {
    right: 18%;
  }
}
#file-input {
  display: none;
}
</style>