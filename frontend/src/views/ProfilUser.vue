<template>
  <form id="profil_form">
    <h2>Profil de {{ user.pseudo }}</h2>
    
    <!--user profile image -->
    <div id="photo_icone">
      <img
        src="../assets/avatar.png"
        alt="avatar par defaut"
        class="profil_image"
        v-if="!user.imageUrl"
      />
      <img
        v-else
        class="profil_image"
        alt="avatar"
        title="mon avatar"
        :src="`http://localhost:3000/users/profil/${user.imageUrl}`"
      />
      <router-link to="/edit-profil" v-if="userId"
        ><i class="fas fa-pencil-alt"></i
      ></router-link>
    </div>

    <!--user information -->
    <div id="name_card">
      <div>Prénom : {{ user.firstname }} Nom : {{ user.lastname }}</div>
      <div>Email : {{ user.email }}</div>
    </div>

    <div id="separation_barre"></div>
    
    <h3>Messages publiés</h3>
    <div id="posts_card" v-for="post in posts" :key="post">
      <PostCard />
    </div>
  </form>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  name: "ProfilUser",
  components: {
    PostCard,
  },
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
  beforeCreate() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("profil||user", userId);
    if (token == null && userId == null) {
      this.$router.push({ name: "LogIn" });
    }
  },
  methods: {
    //get all the informations about the user
    getUserProfil() {
      console.log(this.userId)
      //const userId = localStorage.getItem("userId", userId);
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

    getAllPosts() {
      fetch(`http://localhost:3000/api/posts/${this.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          console.log("res", res);
          this.posts = res.data;
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
  position: relative;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 80%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}

.profil_image {
  text-align: center;
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
  width: 25px;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  right: 30%;
  bottom: 40%;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 768px) {
    bottom: 44%;
  }
}
.fa-pencil-alt:hover {
  background: #ffd7d7;
}
#name_card {
  font-size: 22px;
  line-height: 35px;
  margin-bottom: 20px;
  text-align: center;
}
#separation_barre {
  border: 1px solid #455166;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
}
</style>