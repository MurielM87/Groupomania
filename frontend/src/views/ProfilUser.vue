<template>
  <form id="profil_form">
    <h2>Profil</h2>
    <div id="photo_icone">
      <img
        src="../assets/avatar_default.png"
        alt="avatar par defaut"
        id="photo_profil"
      />
      <a href="/edit-profil" v-if="user"><i class="fas fa-pencil-alt"></i></a>
    </div>
    <div id="name_card">
      <div>Pseudo : user.pseudo</div>
      <div>Prénom : user.firstname</div>
      <div>Nom : user.lastname</div>
      <div>Email : user.email</div>
    </div>   
    <div id="separation_barre"></div> 
    <h3>Messages publiés</h3>
    <div id="posts_card" v-for="post in posts" :key="post">
      <PostCard />
    </div>
  </form>
</template>

<script>
import PostCard from '@/components/PostCard.vue';
export default {
    name: "ProfilUser",
    components: { 
      PostCard 
    },
    //  beforeCreate() {
//    const token = localStorage.getItem('token')
//    if(token == null) {
//        this.$router.push('/login')
//    }
//  },
  mounted(){
    fetch('http://localhost:3000/api/user', {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.pseudo,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
          })
    })
        .then((res) => res.json())
        .then((res) => {
            this.posts = res
            console.log('this.user', this.user)
        })
        .catch((err) => console.log('err:', err))
  },
  data(){
    return {
        user: []
    }
  }
};
</script>

<style lang="scss">
#profil_form {
  width: 50%;
  color: black;
  border: 1px solid #FD2D01;
  border-radius: 30px;
  margin-bottom: 20px;
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
  @media screen and (max-width:768px) {
    width: 200px;
  }
}
#file-input {
  display: none;
}
.fa-pencil-alt {
  background : #F5F5F5;
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
  background : #FFD7D7;
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