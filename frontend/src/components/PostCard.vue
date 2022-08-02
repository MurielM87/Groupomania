<template>
  <article id="card">
    <div class="post_author">
      <router-link :to="{ name: 'ProfilUser' }">
        <img
          v-if="post.image"
          :src="`http://localhost:3000/api/users/${this.imageUrl}`"
          title="Avatar de l'auteur"
          class="post-header-pic-round"
        />
        <i v-else id="post-pic-default" class="fas fa-user-circle"></i>
        <div class="author_name">
          <p>{{ user.pseudo }}</p>
        </div>
      </router-link>
    </div>

    <div class="post_content">
      <div class="post_description">
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
        <p>{{ post.imageUrl }}</p>
      </div>
      <div class="post_img">
        <img
          :src="`http://localhost:3000/api/posts/${post.imageUrl}`"
          title="Image du post"
          class="img_post_add"
          v-if="post.image"
        />
      </div>
      <div class="post_date">
        <p>{{ datePost(post.updateAt) }}</p>
      </div>
    </div>

    <div class="post_btn" v-if="post.editable">
      <button
        @click="menuActive = !menuActive"
        v-click-outside="clickOutside"
        class="btn_menu"
        title="options"
      >
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div v-if="menuActive" id="post_modify">
        <button
          id="post_modify"
          title="modifier le message"
          @click="updatePost(postId)"
        >
          <i class="far fa-edit"></i>
          <span class="btn_modify">Modifier</span>
        </button>
        <button
          id="post_delete"
          title="supprimer le message"
          @click="deletePost(postId)"
        >
          <i class="far fa-trash-alt"></i>
          <span>Supprimer</span>
        </button>
      </div>
    </div>

    <div id="separate_barre"></div>

    <div class="post_like">
      <i class="far fa-thumbs-up" id="icon-like"></i>
      <p>{{ post.likes }}</p>
    </div>

    <div class="post_action">
      <div class="post_action_like" @click="addLike(postId)" title="j'aime">
        <i class="far fa-thumbs-up" id="icon-like"></i>
        <span>J'aime</span>
      </div>
      <div
        class="post_action_comment"
        @click="showComment(postId)"
        title="comment"
      >
        <i class="far fa-comment-alt" id="icon-comment"></i>
        <span>Commentaires</span>
      </div>
    </div>

    <div id="separate_barre"></div>

    <div class="comment" v-if="releveComment">
      <div class="comment_author" v-for="comment in comments" :key="comment.id">
        <img
          v-if="comment.image"
          :src="`http://localhost:3000/api/posts/:id/comment/${comment.imageUrl}`"
          width="40"
          class="comment-pic-round"
        /><i v-else id="comment-pic-default" class="fas fa-user-circle"></i>
        <div class="comment_user">
          <router-link :to="{ name: 'ProfilUser' }"
            ><span class="comment_user_pseudo">{{
              user.pseudo
            }}</span></router-link
          >
          <p class="comment-text">{{ comment.content }}</p>
        </div>

        <div class="edit_comment" v-if="comment.editable">
          <!-- ecriture du commentaire -->
          <form class="comment-input" @submit.prevent="submitComment">
            <input
              type="text"
              class="com-input"
              v-model="comment.content"
              placeholder="Écrivez un commentaire ici..."
              required
            />
          </form>
          <button
            :data-id="commentId"
            @click="
              menuActiveComments = {
                ...menuActiveComments,
                [commentId]: !menuActiveComments[commentId],
              }
            "
            v-click-outside="clickOutsideComment"
            class="dropdown-btn-comments"
            title="Option"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div
            v-if="menuActiveComments[commentId]"
            id="myDropdownComments"
            class="dropdown-content-comments"
          >
            <button
              id="comment-delete"
              title="Supprimer le commentaire"
              @click="deleteComment(postId, commentId)"
            >
              <i class="far fa-trash-alt"></i>
              <span class="dropdown-options-comments">Supprimer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: Object,
    deletePost: Function,
    addLike: Function,
    addComment: Function,
    loadComment: Function,
    comment: Array,
    deleteComment: Function,
  },
  data() {
    return {
      menuActive: false,
      menuActiveComments: {},
      scTimer: 0,
      scY: 0,
      commentData: {
        content: "",
      },
      releveComment: false,
    };
  },
  methods: {
    // Fonction fermant automatiquement la partie option de post dès lors que l'utilisateur click au delà des boutons modifier et supprimer
    clickOutside() {
      this.menuActive = false;
    },
    // Fonction fermant automatiquement la partie option du commentaire avec le click du bouton supprimer
    clickOutsideComment(event, el) {
      const id = el.dataset["id"];
      this.menuActiveComments = { ...this.menuActiveComments, [id]: false };
    },
    // Mise en forme de la date d'ajout du post sur un standard français
    datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
    // Redirection vers la page dédiée à la modification de post
    updatePost() {
      this.$router.push({ name: "ModifyPost", params: { id: this.postId } });
    },
    // Bouton permettant d'afficher la partie commentaires
    showComment(postId) {
      this.releveComment = true;
      this.loadComments(postId);
    },
    //function d'ajout de commentaire
    submitComment() {
      this.addComment(this.postId, this.commentData.content);
      this.commentData.content = "";
    },
  },
};
</script>

<style lang="scss">
#card {
  background-color: white;
  width: 25rem;
  border-radius: 20px;
  border: 1px solid #fd2f01;
  padding: 20px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
}
#comment_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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