<template>
  <PostModify :revele="revele" :toggleModale="toggleModale" :modifyPost="post" :key="componentKey" />
  <article id="card">
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
        />
      </div>
      <!--add the datetime -->
      <div class="post_date">
        <p>publié le {{ datePost(post.createdAt) }}</p>
        <p v-if="this.post.updatedAt !== this.post.createdAt">- modifié le {{ datePost(post.updatedAt) }}</p>
      </div>
    </div>
    <br />

    <!--add the buttons 'modify' and 'delete' to the published post-->
    <div v-if="post.User.id == userId || userId == 1">
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
    <div class="post_like" :userId="userId">
      <div class="like_thumbs">
        <i class="far fa-thumbs-up" @click.prevent="addLike(post.id)">{{ post.Likes.length }}</i>
        <i class="far fa-thumbs-down" @click.prevent="addDislike(post.id)"></i>
      </div>
      <p>likes: {{ post.Likes.length }}</p>
    </div>

    <!--add a comment to the post -->
    <div class="post_comments">
      <h3>Commentaires <i class="far fa-comment-alt"></i></h3>

      <!--write a comment -->
      <div>
        <textarea
          type="text"
          class="comment_input"
          v-model="content"
          placeholder="laissez un commentaire"
          rows="3"
          required
        ></textarea>
        <button type="submit" @click.prevent="submitComment(post.id)">
          <span>Publier </span> <i class="far fa-edit"></i>
        </button>
      </div>

      <div class="separate_barre"></div>

      <!--get all comments -->
      <p class="comment_title">{{post.Comments.length}} commentaire{{post.Comments.length > 1 ? 's' : ""}} publié{{post.Comments.length > 1 ? 's' : ""}}</p>
      <div
        class="comments_card"
        v-for="comment in post.Comments"
        :key="comment.id"
        :user="userId"
        :post="postId"
        :comment="comment"
      >
        <router-link :to="{ name: 'ProfilUser', params: { id: comment.User.id } }"> 
          <div class="comment_author">
            <img
              v-if="comment.User.imageUrl"
              :src="`http://localhost:3000/images/${comment.User.imageUrl}`"
              alt="avatar"
              crossorigin="anonymous"
            />
            <img v-else :src="require('../assets/avatar.png')" alt="avatar par default" />
            <span class="comment_author_pseudo"> 
              {{ comment.User.pseudo }}
            </span>
          </div>
        </router-link> 

        <div class="comment_content">
          <p class="comment_text">  
            {{ comment.content }}
          </p>
          <br />
          <!--add the datetime -->
          <div class="post_date">
            <p>publié le {{ dateComment(comment.createdAt) }}</p>
          </div>
        </div>

        <div>
          <button v-if="comment.User.id == userId || userId == 1"
            id="comment-delete"
            class="form_btn"
            title="Supprimer le commentaire"
            @click.prevent="deleteComment(comment.id)"
          >
            <span>Supprimer </span><i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { ref } from "vue";
import PostModify from "./PostModify.vue";

export default {
  name: "PostCard",
  props: ["post", "comment", "postId"],
  components: {
    PostModify,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      content: ref(""),
      user: ref({}),
      users: ref([]),
      comments: ref([]),
      revele: false,
      likes: ref(0),
      dislike: ref(0),
      componentKey: 0,
    };
  },

  async created() {    
  //  console.log("post", this.post)
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
      //  console.log("PostCard||users||data", data);
        this.users = data;
      })
      .catch((err) => console.log(err));
  },

  async mounted() {
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
      //  console.log("PostCard||user||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    forceRerender() {
      this.componentKey ++;
    },

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
    //date of the comment
    dateComment(date) {
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
      console.log("PostCard||toggleModale||postId", postId)
    },

    //delete a post
    deletePost(postId) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      console.log("PostCard||deletePost", postId);
      if (userId === userId && token === token) {
        fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.status === 200) {
            this.posts = this.posts.splice((post) => {
            console.log("deletePost || postId", postId);
            return post.id != postId;
            })
            this.$router.go()	// Refresh page
          }          
        })
        .catch((err)=> console.error(err));
      }
    },
    
    //add a like
    addLike(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addLike||postId", postId);
      console.log("PostCard||addLike||userId", userId)
      fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",    
          "Authorization": `Bearer ${this.token}`,
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log({res})
        this.like = res.data;
        this.componentKey ++;
    //    if(this.like == 1) {
    //      this.like -= 1
    //    } else {
    //      this.like += 1
    //    }
    //    this.$router.go() //refresh page
      })
      .catch((err) => console.error(err));  
    },

    submitComment(postId) {
      console.log("PostCard||submitComment||postId", postId);
      fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",    
          "Authorization": `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          content: this.content
        }),
      })
      .then((res) => res.json())
      .then((data) => {     
        console.log("CardForm||data", data);
        this.content = data;
        this.$router.go()	// Refresh page
        //window.location.reload();
        //$router.go();
      })
      .catch((err) => console.error(err));  
    },
    
    //delete a comment from a post
    deleteComment(commentId) {
    //  console.log("PostCard||deleteComment||postId", postId);
      console.log("PostCard||deleteComment||commentId", commentId);
      fetch(`http://localhost:3000/api/posts/comment/${commentId}`, {
        method: "DELETE",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      })
      .then((res) => res.json())
      .then(() => {
        console.log("commentId", commentId)
          this.comments = this.comments.splice((comment) => {
            console.log("deleteComment || commentId", commentId);
            return comment.id != this.commentId;
          });
          this.$router.go()	// Refresh page
        })
      .catch((err) => console.log(err));  
    },
  },
};
</script>

<style lang="scss">
#post_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
}

.author_avatar {
  width: 50px;
  margin: 10px;
  border-radius: 50%;
}
h4 {
  margin: 25px;
}

#card h3,
#card p {
  margin: 0;
  padding-bottom: 5px;
  padding-left: 10px;
}

#card p {
  text-align: justify;
}

.post_date {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
}

#like_post {
  text-align: right;
  padding: 10px;
  margin-right: 25px;
}

.like_thumbs {
  display: flex;
  justify-content: flex-end;
}
.fa-thumbs-up {
  font-size: 25px;
  color: black;
  &:hover, &:active, &:link {
    color: green;
  }
}
.fa-thumbs-down {
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover, &:active, &:link {
    color: red;
  }
}
.comment_title {
  display: flex;
  justify-content: flex-end;
}
.comments_card {
  width: 80%;
  background-color: #ffd7d7;
  border: 1px solid #4E5166;
  margin-bottom: 10px;
  margin-left: auto;
  border-radius: 10px;
  padding: 10px;
}

.comment_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid #4E5166;
  border-radius: 10px;
}
.comment_author_pseudo {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.comment_author img {
  width: 50px;
  padding: 5px;
  border-radius: 50%;
  margin: 0;
}
textarea {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>