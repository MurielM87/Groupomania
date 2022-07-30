<template>
  <form id="profil_form">
    <h2>Profil de {{ user.pseudo }}</h2>    
    
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
      <router-link to="/edit-profil" v-if="user"><i class="fas fa-pencil-alt"></i></router-link>
    </div>
      
    <div id="name_card">
      <div>Pseudo : {{user.pseudo}}</div>
      <div>Prénom : {{user.firstname}}</div>
      <div>Nom : {{user.lastname}}</div>
      <div>Email : {{user.email}}</div>
    </div>
    <div id="separation_barre"></div>
    <h3>Messages publiés</h3>
    <div id="posts_card" v-for="post in posts" :key="post">
      <PostCard />
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
}
#profil_avatar_icon {
  width: 300px;
  margin: auto;
  position: relative;
  text-align: center;
}
#profil_avatar_icon {
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