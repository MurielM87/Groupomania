<template>
  <form id="profil_form">
    <h2>Profil de {{ user.pseudo }}</h2>

    <!--user profile image -->
    <div id="photo_icone">
      <img
        v-if="!this.user.imageUrl"
        :src="require('../assets/avatar.png')"
        alt="avatar"
        class="profil_image"
      />
      <img
        v-else
        class="profil_image"
        alt="avatar"
        title="mon avatar"
        :src="`http://localhost:3000/images/${this.user.imageUrl}`"
        crossorigin="anonymous"
      />
      <router-link v-if="userId === userId && token === token" :to="`/profil/${this.userId}/edit`"
        ><i class="fas fa-pencil-alt"></i
      ></router-link>
    </div>

    <!--user information -->
    <div id="name_card">
      <div>{{ user.firstname }} {{ user.lastname }}</div>
      <div>{{ user.email }}</div>
    </div>

    <div id="separation_barre"></div>

    <h3>{{posts.length}} Message{{posts.lenght > 1 ? 's' : ""}} publié{{posts.lenght > 1 ? 's' : ""}}</h3>
    <div id="card" v-for="post in posts" :key="post" :post="post">
      <h3>On retente {{posts.length}} Message{{posts.lenght > 1 ? 's' : ""}} publié{{posts.lenght > 1 ? 's' : ""}}</h3>
      <div>titre: {{ post.title }}</div>
      <div>contenu: {{ post.content }}</div>
      <img
        v-if="post.imageUrl"
        :src="`http://localhost:3000/images/${post.imageUrl}`"
        crossorigin="anonymous"
      />
      <div>publié le {{ post.createdAt }}</div>
      <div v-if="post.updatedAt"> - modifié le {{ post.updatedAt }}</div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ProfilUser",
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      user: ref({
        pseudo: "",
        firstname: "",
        lastname: "",
        email: "",
        imageUrl: "",
      }),
      posts: ref([]),
    };
  },

  beforeCreate() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("profil||beforeCreate||userId", userId);
    if (token == null && userId == null) {
      this.$router.push({ name: "LogIn" });
    }
  },

  //get all the informations about the user
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ProfilUser||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
  },

    //get all posts from a user
    async mounted() {
      await fetch(`http://localhost:3000/api/posts/user/${this.UserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.posts = data;
          console.log("ProfilUser||posts||data", data);
        })
        .catch((err) => {
          console.log("err", err);
        });
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
  width: 35px;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  right: 30%;
  top: 55%;
  &:hover {
    color: red;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    right: 36%;
  }
  @media screen and (max-width: 768px) {
    top: 35%;
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