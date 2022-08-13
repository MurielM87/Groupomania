<template>
  <article id="card">
    
    <!--informations from the author of the post-->
    <router-link to="/profil/${this.userId}">
      <div id="post_author">
        <div id="author_img">
          <img
            v-if="post.image"
            :src="`http://localhost:3000/api/users/${this.imageUrl}`"
            title="Avatar de l'auteur"
            class="author_avatar"
          />
          <img
            v-else
            src="../assets/avatar.png"
            title="Avatar de l'auteur"
            class="author_avatar"
          />
        </div>
        <div class="author_name">
          <h4>Pseudo : {{ user.pseudo }}</h4>
        </div>
      </div>
    </router-link>
    <!--content from the writing post -->
    <div
      class="post_content"
      v-for="post in posts"
      :key="post.postId"
    >
      <div class="post_description">
        <h3>titre : {{ post.title }}</h3>
        <p>contenu : {{ post.content }}</p>
        <p v-if="post.imageUrl">image : {{ post.imageUrl }}</p>
      </div>
      <!--add the datetime -->
      <div class="post_date">
        <p>publié le {{ datePost(post.createdAt) }} -</p>
        <p>modifié le {{ datePost(post.updatedAt) }}</p>
      </div>
    </div>
    <br />

    <!--add the buttons 'modify' and 'delete' to the published post-->
    <div class="post_btn" v-if="post.userId" :token="token">
      <button
        id="post_modify"
        title="modifier le message"
        @click="updatePost"
      >
        <i class="far fa-edit"></i>
        <span class="btn_modify">Modifier</span>
      </button>
      <button
        id="post_delete"
        title="supprimer le message"
        @click="deletePost"
      >
        <i class="far fa-trash-alt"></i>
        <span>Supprimer</span>
      </button>
    </div>

    <div id="separate_barre"></div>

    <!-- add like to the post-->
    <div @click="addLike" class="post_like" :token="token">
      <i class="far fa-thumbs-up"></i>
      <i class="far fa-thumbs-down"></i>
      <p>post.likes : {{ post.likes }}</p>
    </div>

    <!--add a comment to the post -->
    <div class="post_comments">
      <h3><i class="far fa-comment-alt"></i> Commentaires</h3>

      <!--write a comment -->
      <CommentForm 
        :id="postId" 
        :post="post" 
        :token="token" 
        @createComment="createComment" 
      />

      <!--get all comments -->
      <div class="comments_card" v-for="comment in comments" :key="comment.id" :token="token" >
        <router-link to="/profil/{this.userId}" :token="token">
          <div class="comment_author">
            <img
              v-if="user.imageUrl"
              :src="`http://localhost:3000/api/users/${userId.imageUrl}`"
            />
            <img v-else src="../assets/avatar.png" alt="avatar de l'auteur" />
            <span class="comment_author_pseudo">
              {{ user.pseudo }}
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
        <br />

        <div v-if="comment.userId" :token="token">
          <button
            id="comment-delete"
            title="Supprimer le commentaire"
            @click="deleteComment(postId, commentId)"
          >
            <span>Supprimer</span><i class="far fa-trash-alt"></i>
          </button>
        </div>
        
      </div>
    </div>
  </article>
</template>

<script>
import { ref } from "vue";
import CommentForm from "./CommentForm.vue";

export default {
  name: "PostCard",
  component: {
    CommentForm,
  },
  props: [
    "token", "userId",
    "user.pseudo", "user.imageUrl", 
    "post.title", "post.content", "post.imageUrl"
  ],
  data() {
    return {
      post: ref([]),
      comment: ref([]),
    };
  },
  

  //get all the posts
    async created(){
      await fetch(`http://localhost:3000/api/posts/`, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        }
      })
      .then((res) => {
        console.log(res)
        this.posts = res.data
        //this.comments = res.data
        })
      .catch((err) => {
        console.log(err)
      })
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
    updatePost(postId) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      
      if(userId == userId && token == token) {
        fetch(`http://localhost:3000/api/posts/${this.postId}`, {
          method: "PUT",
          data: { postId },
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: {
            title: this.title,
            content: this.content,
            imageUrl: this.imageUrl,
          }
      }).then(() => {
          this.posts = this.posts.filter((post) => {
            console.log("updatePost || postId", postId);
            return post.id != postId;
          });
        });
        console.log("post ${postId} updated", postId);
        console.log("PostCard||updatePost", postId);
      }
    },      
        

    //delete a post
    deletePost(postId) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token"); 
      console.log("PostCard||deletePost", postId);     
      if(userId == userId && token == token) {
        fetch(`http://localhost:3000/api/posts/${this.postId}`, {
          method: "DELETE",
          data: { postId },
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
        }).then(() => {
          this.posts = this.posts.splice((post) => {
            console.log("deletePost || postId", postId);
            return post.id != postId;
          });
        });
      }
    },

    //add a like
    addLike(postId) {
      console.log("PostCard||addLike||postId", postId);
      //  fetch(`http://localhost:3000/api/posts/${this.postId}/like`, {
      //    method: "POST",
      //    data: { postId },
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then((res) => {
      //    for (let post in this.posts) {
      //      if (this.posts[post].id == postId) {
      //        if (res.status == 204) {
      //          this.posts[post].likes -= 1;
      //        }
      //        console.log("addLike||posts", post);
      //        if (res.status == 201) {
      //          this.posts[post].likes += 1;
      //        }
      //      }
      //    }
      //  });
    },

    //add a comment
    addComment(postId, content) {
      console.log("PostCard||addContent||postId, content", postId, content);
      //  fetch(`http://localhost:3000/api/posts/${this.postId}/comment`, {
      //    method: "POST",
      //    data: { postId, content },
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then(() => this.loadcomments(postId));
    },

    //get all comments from a post
    loadComments(/*postId*/) {
      //  fetch(`http://localhost:3000/api/posts/comments/${this.postId}`, {
      //    method: "GET",
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then((res) => {
      //    this.comments = {
      //      ...this.comments,
      //      [postId]: res.data,
      //    };
      //    console.log("loadComments||res.data", res.data);
      //  });
    },

    //delete a comment from a post
    deleteComment(postId, commentId) {
      console.log("PostCard||deleteComment||postId", postId);
      console.log("PostCard||deleteComment||commentId", commentId);
      //  fetch(`http://localhost:3000/api/posts/comment/${this.commentId}`, {
      //    method: "DELETE",
      //    data: { postId, commentId },
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then(() => this.loadComments(postId));
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
  padding: 10px;
}
h4 {
  margin: 20px;
}

#card h3,
#card p {
  margin: 0;
  padding-bottom: 10px;
  padding-left: 10px;
}

#card p {
  text-align: justify;
}

.post_date {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
}

#like_post {
  text-align: right;
  padding: 10px;
  margin-right: 25px;
}
.fa-thumbs-up {
  color: black;
  &:focus {
    color: green;
  }
}
.fa-thumbs-down {
  color: black;
  padding-left: 15px;
  &:focus {
    color: red;
  }
}
#comment_card {
  background-color: #ffd7d7;
  border: 1px solid #fd2d01;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 10px;
}

.comments_card{
  background-color: #8f8c8c;
}

#comment_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#comment_author img {
  width: 40px;
  padding: 10px;
}
textarea {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>