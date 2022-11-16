<template>
  <div id="card_post">
    <PostModify
      :revele="revele"
      :toggleModale="toggleModale"
      :modifyPost="post"
    />
    <article>
      <!--informations from the author of the post-->
      <router-link :to="`/profil/${post.User.id}`">
        <div id="post_author">
          <div id="author_img">
            <img
              v-if="!post.User.imageUrl"
              :src="require('../assets/avatar.png')"
              alt="avatar"
              class="author_avatar"
            />
            <img
              v-else
              class="author_avatar"
              alt="avatar"
              :src="`http://localhost:3000/images/${post.User.imageUrl}`"
              crossorigin="anonymous"
            />
          </div>
          <div class="author_name">
            <h4>{{ post.User.pseudo }}</h4>
          </div>
        </div>
      </router-link>
      <!--content from the writing post -->
      <div class="post_content">
        <div class="post_description">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <img
            v-if="post.imageUrl"
            :src="`http://localhost:3000/images/${post.imageUrl}`"
            crossorigin="anonymous"
            class="post_img"
          />
        </div>
        <!--add the datetime -->
        <div class="post_date">
          <p>publié le {{ datePost(post.createdAt) }}</p>
          <p v-if="this.post.updatedAt !== this.post.createdAt">
            modifié le {{ datePost(post.updatedAt) }}
          </p>
        </div>
      </div>
      <br />

      <!--add the buttons 'modify' and 'delete' to the published post-->
      <div v-if="user.id == post.User.id || post.User.isAdmin == true">
        <button
          id="post_modify"
          class="form_btn"
          title="modifier le message"
          @click.prevent="toggleModale(post.id)"
        >
          <i class="far fa-edit"></i>
          <span class="btn_modify">Modifier</span>
        </button>
        <button
          id="post_delete"
          class="form_btn"
          title="supprimer le message"
          @click.prevent="deletePost(post.id)"
        >
          <i class="far fa-trash-alt"></i>
          <span>Supprimer</span>
        </button>
      </div>

      <div class="separate_barre"></div>

      <!-- add like to the post-->
      <PostLike 
      :post="post" />

      <!--add a comment to the post -->
      <CommentCard     
      :post="post" />
    </article>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import PostModify from "./PostModify.vue";
import PostLike from "./PostLike.vue";
import CommentCard from "./CommentCard.vue";

export default {
  name: "PostCard",
  props: ["post", "comment", "user"],
  components: {
    PostModify,
    PostLike,
    CommentCard,
  },
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      revele: false,
      like: ref(0),
      dislike: ref(0),
      postId: this.post.id,
    };
  },

  methods: {
    //date of the post
    datePost(date) {
      const event = new Date(date);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },

    //modify a post
    toggleModale(postId) {
      this.revele = !this.revele;
      console.log("PostCard||toggleModale||postId", postId);
    },

    //delete a post
    ...mapActions(["deletePost"]),

  },

  computed: mapGetters(["posts"]),
};
</script>

<style lang="scss">
#card_post {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 47%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  border: 2px solid #fd2d01;
  padding: 10px 10px 0px 10px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
}
#post_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  &:hover {
    background-color: #ffd7d7;
    color: #fd2d01;
  }
}

.author_avatar {
  width: 50px;
  margin: 10px;
  border-radius: 50%;
}
h4 {
  margin: 25px;
}

#card_post h3,
#card_post p {
  margin: 0;
  padding-bottom: 5px;
  padding-left: 10px;
}

#card_post p {
  text-align: justify;
}
.post_img {
  max-height: 250px;
}
.post_date {
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px;
}

.fa-comments,
.fa-feather-alt {
  font-size: 40px;
  margin: 2px;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(209, 166, 14, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(236, 147, 14, 0.8), rgba(0, 0, 255, 0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>