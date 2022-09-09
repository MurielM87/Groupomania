<template>
  <article id="card">
    <!--informations from the author of the post-->
    <router-link :to="{name: 'ProfilUser', params: {id: this.userId} }">
      <div id="post_author">
        <div id="author_img">
          <img
            v-if="user.image"
            :src="`http://localhost:3000/images/${this.imageUrl}`"  crossorigin="anonymous"
            title="Avatar"
            class="author_avatar"
          />
          <img
            v-else
            src="../assets/avatar.png"
            title="Avatar"
            class="author_avatar"
          />
        </div>
        <div class="author_name">
          <h4>Pseudo : {{ post.User.pseudo }}</h4>
        </div>
      </div>
    </router-link>
    <!--content from the writing post -->
    <div
      class="post_content"
      
    >
      <div class="post_description">
        <h3>titre : {{ post.title }}</h3>
        <p>contenu : {{ post.content }}</p>
        <img v-if="post.imageUrl" :src="`http://localhost:3000/images/${post.imageUrl}`" crossorigin="anonymous"/>
      </div>
      <!--add the datetime -->
      <div class="post_date">
        <p>publié le {{ datePost(post.createdAt) }}</p>
        <p v-if="post.updatedAt"> - modifié le {{ datePost(post.updatedAt) }}</p>
      </div>
    </div>
    <br />

    <!--add the buttons 'modify' and 'delete' to the published post-->
    <div class="post_btn">
      <button
        id="post_modify"
        class="form_btn"
        title="modifier le message"
        @click="updatePost"
      >
        <i class="far fa-edit"></i>
        <span class="btn_modify">Modifier</span>
      </button>
      <button
        id="post_delete"
        class="form_btn"
        title="supprimer le message"
        @click="deletePost"
      >
        <i class="far fa-trash-alt"></i>
        <span>Supprimer</span>
      </button>
    </div> 

    <div class="separate_barre"></div>

    <!-- add like to the post-->
    <div @click="addLike" class="post_like" :userId="userId">
      <div class="like_thumbs">        
        <i class="far fa-thumbs-up"></i>
        <i class="far fa-thumbs-down"></i>
      </div>
      <p>likes : {{ post.likes }}</p>
    </div>


    <!--add a comment to the post -->
    <div class="post_comments">
      <h3>Commentaires <i class="far fa-comment-alt"></i></h3> 

      <!--write a comment -->     
      <div>
        <textarea
        type="text"
        class="comment_input"
        v-model="comment"
        placeholder="laissez un commentaire"
        rows="3"
        required
        ></textarea>
      <button type="submit" @click="submitComment">
        <span>Publier</span> <i class="far fa-edit"></i>
      </button>
    </div>


      <!--get all comments -->
<!--      <div class="comments_card" 
        v-for="comment in comments" 
        :key="comment.id" 
        :comment="comment"
      >
        <router-link :to="{name: 'ProfilUser', params: {id: this.comment.userId}}">
          <div class="comment_author">
            <img
              v-if="user.imageUrl"
              :src="`http://localhost:3000/api/users/${this.comment.imageUrl}`"
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
          <br /> -->
          <!--add the datetime -->
<!--          <div class="post_date">
            <p>publié le {{ dateComment(comment.createdAt) }}</p>
          </div>
        </div>
        <br />

        <div v-if="comment.userId" :token="token">
          <button
            id="comment-delete"
            class="form_btn"
            title="Supprimer le commentaire"
            @click="deleteComment"
          >
            <span>Supprimer</span><i class="far fa-trash-alt"></i>
          </button>
        </div> 
        
      </div> -->
    </div> 
  </article>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PostCard",
  props: ["post"],
  data() {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      user: ref({}),
      comments: ref([]),
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
          credentials: "include",
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
          console.log("updatePost || postId", postId);
          return postId != postId;
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
          credentials: "include",
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
      fetch(`http://localhost:3000/api/posts/${this.postId}/like`, {
        method: "POST",
        credentials: "include",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      }).then((res) => {
        for (let post in this.posts) {
          if (this.posts[post].id == postId) {
            if (res.status == 204) {
              this.posts[post].likes -= 1;
            }
            console.log("addLike||posts", post);
            if (res.status == 201) {
              this.posts[post].likes += 1;
            }
          }
        }
      });
    },

    submitComment(postId) {
      fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then(
          function (res) {
            if (res.status != 201) {
              this.fetchError = res.status;
            } else {
              res.json().then(
                function (data) {
                  this.fetchResponse = data;
                }.bind(this)
              );
            }
          }.bind(this)
        )
        .catch((err) => {
          console.log("err", err);
        });
    },


/*
    //add a comment
    addComment(postId, content) {
      console.log("PostCard||addContent||postId, content", postId, content);
      //  fetch(`http://localhost:3000/api/posts/${this.postId}/comment`, {
      //    method: "POST",
      //    credentials: "include",
      //    data: { postId, content },
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then(() => this.loadcomments(postId));
    },

    //get all comments from a post
    loadComments(postId) {
      //  fetch(`http://localhost:3000/api/posts/comments/${this.postId}`, {
      //    method: "GET",
      //    credentials: "include",
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
      //    data:
      //    credentials: "include", { postId, commentId },
      //    headers: {
      //      "Content-Type": "application/json",
      //      "Authorization": `Bearer ${this.token}`,
      //    },
      //  }).then(() => this.loadComments(postId));
    },*/

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

.like_thumbs {
  display: flex;
  justify-content: flex-end;
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