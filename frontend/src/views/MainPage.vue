<template>
  <h2>Bonjour <span id="user_name">{{ user.pseudo }}</span></h2>
  <section id="posts">
    
    <div class="post_column">
      <PostForm />
      <div class="profil_column">
        <UsersProfil />
      </div>      
    </div>
    
    <div class="post_card">
      <h2>Nouvelles publications</h2>
      <div class="post_column_center">
      <PostCard 
        v-for="post in posts" 
        :key="post.id"
        :post="post"
        :comment="comment"
      />
      </div>
    </div>
    
    

    <!-- Bouton Scroll to Top-->
    <button class="toTop" @click="toTop" title="Retour en haut de page">
      <span class="fa fa-chevron-up"></span>
    </button>
  </section>
</template>

<script>
import { ref } from "vue";
import PostForm from "@/components/PostForm.vue";
import PostCard from "@/components/PostCard.vue";
import UsersProfil from "@/components/UsersProfil.vue";

export default {
  name: "MainPage",
  components: {
    PostForm,
    PostCard,
    UsersProfil
},
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      user: ref({}),
      posts: ref([]),
      comment: ref({}),
    };
  },
  props: {
    isLoggedIn: Boolean,
  },

  beforeCreate() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token == null && userId == null) {
      this.$router.push({name: 'LogIn'})
    }
  },
  
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.redirect) {
          this.$router.push({name: 'LogIn'})
        }
        console.log("MainPage||user||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
    }, 

  async mounted() {
    await fetch(`http://localhost:3000/api/posts`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MainPage||this.posts||data", data);
        this.posts = data;
      })
      .catch((err) => console.log(err));
    },
 
  methods: {  
    //button scroll top
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  
};
</script>

<style lang="scss">
#user_name {
  font-family: Niconne, 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 30px;
}
#posts {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.post_card {
  margin-top: 20px;
}
.post_column {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 80%;
}
.post_column_center {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.profil_column {
  width: 100%;
  margin: auto;
  margin-top: 15px;
  border: 1px solid #FD2D01;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
img {
  width: 250px;
  margin: auto;
}
.toTop {
  width: 20px;
  height: 20px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  background-color: #FFD7D7;
  color: #FD2D01;
  border: 1px solid #FD2D01;
}
</style>
