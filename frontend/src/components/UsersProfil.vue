<template>
  <h2>{{users.length}} Membre{{users.length > 1 ? 's' : ""}} inscrit{{users.length > 1 ? 's' : ""}}</h2>
  <div id="profil_users" v-for="user in users" :key="user">
    <router-link :to="`/profil/${user.id}`"> 
      <div id="user">        
        <div id="author_img">
          <img
            v-if="!user.imageUrl"
            :src="require('../assets/avatar.png')"
            alt="avatar"
            class="author_avatar"
          />
          <img
            v-else
            class="author_avatar"
            alt="avatar"
            :src="`http://localhost:3000/images/${user.imageUrl}`"
            crossorigin="anonymous"
          />          
        </div>
       <div class="user_name">
          <p>{{ user.pseudo }}</p>
          <p>{{user.firstname}} {{user.lastname}}</p>
          <p>{{user.email}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "UsersProfil",
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
            users: ref([]),
        };
    },
    async created() {
        await fetch(`http://localhost:3000/api/users/`, {
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
            console.log("UsersProfil||users||data", data);
            this.users = data;
        })
            .catch((err) => console.log(err));
    },
};
</script>

<style lang="scss">
#profil_users {
    width: 100%;
    padding: 10px;
}

#user {
    display: flex;
    flex-direction: row;
    border: 1px solid #4E5166;
    border-radius: 20px;
    background-color: #FFD7D7;
    align-items: center;
    color: #FD2D01;
    &:hover {
      color: #4E5166;
      background-color: #FD2D01;
      border: 1px solid  #FFD7D7;
  }
}

.user_name {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex-wrap: nowrap;
    overflow: hidden;
    padding-right: 5px;
}

a {
  color: black;
  text-decoration: none;
}

</style>