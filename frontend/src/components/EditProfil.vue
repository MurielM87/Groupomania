<template>
  <form id="profil_form">
    <h2>Modifier votre profil</h2>

    <form class="modify-img" @submit.prevent="updateUserImage($event)">
      <div id="photo_icone">
        <img
          src="../assets/avatar_default.png"
          alt="avatar par defaut"
          id="photo_profil"
          v-if="!user.imageUrl"
        />
        <img
          v-else
          id="profil_avatar_img"
          alt="Avatar"
          title="modifier mon avatar"
          :src="`http://localhost:3000/users/profil/${user.imageUrl}`"
        />
      </div>
      <input type="file" name="avatar" id="profil_image" accept="image/*" />
    </form>

    <div id="separate_barre"></div>

    <div class="profil_informations">
      <form class="form-profil" @submit.prevent="updateProfil(user.id)">
        <div class="form_group">
          <label for="pseudo">Pseudo</label>
          <input
            type="text"
            v-model.lazy="user.pseudo"
            name="pseudo"
            id="pseudo"
            class="form_input"
            required
          />
          <div class="form-err"></div>
        </div>
        <div class="form_group">
          <label for="firstname">Prénom</label>
          <input
            type="text"
            v-model.lazy="user.firstName"
            name="firstname"
            id="firstname"
            class="form_input"
            required
          />
          <div class="form-err"></div>
        </div>
        <div class="form_group">
          <label for="lastname">Nom</label>
          <input
            type="text"
            v-model.lazy="user.lastName"
            name="lastname"
            id="lastname"
            class="form_input"
            required
          />
          <div class="form-err"></div>
        </div>
        <div class="form_group">
          <label for="email">Email</label>
          <input
            type="text"
            v-model.lazy="user.email"
            name="email"
            id="email"
            class="form_input"
            required
          />
          <div class="form-err"></div>
        </div>
        <button class="form_btn" title="enregistrer les modifications">
          enregistrer les modifications
        </button>

        <div id="separation_barre"></div>

        <button
          class="delete_btn"
          @click="deleteUser(user.id)"
          title="supprimer le compte"
        >
          supprimer le compte
        </button>
      </form>
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
        email: "",
        imageUrl: "",
      },
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getUserProfil;
  },
  methods: {
    //get all the informations about the user
    getUserProfil() {
      const userId = localStorage.getItem("userId");
      fetch(`http://localhost:3000/api/users/profil/${userId}`, {
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

    //modify userProfil
    updateProfil(userId) {
      fetch(`http://localhost:3000/api/users/profil/${userId}`, {
        method: "PUT",
        data: this.user,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        alert("profil modifié");
        console.log("userId", userId);
      });
    },

    //delete user
    deleteUser(userId) {
      if (
        window.confirm(
          "vous allez supprimer votre compte. Êtes-vous certain de votre choix?"
        )
      )
        fetch(`http://localhost:3000/api/users/profil/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => {
            if (res) {
              console.log("userId", userId);
              localStorage.removeItem("token");
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
#profil_form {
  width: 50%;
  color: black;
  border: 1px solid #fd2d01;
  border-radius: 30px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 70%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
#photo_icone {
  width: 300px;
  margin: auto;
  position: relative;
  text-align: center;
}
#photo_profil {
  position: relative;
  width: 300px;
  object-fit: contain;
  border-radius: 50%;
  margin-top: 10px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 250px;
  }
  @media screen and (max-width: 768px) {
    width: 200px;
  }
}
#file-input {
  display: none;
}
.fa-pencil-alt {
  background: #f5f5f5;
  color: black;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  right: 10%;
  bottom: 10%;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 768px) {
    right: 18%;
  }
}
.fa-pencil-alt:hover {
  background: #ffd7d7;
}
#name_card {
  font-size: 22px;
  line-height: 35px;
  margin-bottom: 20px;
  text-align: left;
}
#separation_barre {
  border: 1px solid #455166;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
}
</style>