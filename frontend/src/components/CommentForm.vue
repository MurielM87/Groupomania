<template>
  <div class="btn_publish_comment">
    <textarea
      v-model="content"
      type="text"
      class="comment_input"
      placeholder="laissez un commentaire"
      rows="2"
      required
    />
    <button
      type="submit"
      @click.prevent="newComment(post.id)"
    >
      <span>Publier </span><i class="far fa-edit" />
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CommentForm",
  emit: ["input"],
  props: ["post"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      content: ref(""),
    };
  },

  computed: mapGetters(["posts"]),

  mounted() {
    this.getAllPosts;
  },
  
  methods: {
    ...mapActions(["addComment"]),

    newComment () {
      console.log("content", this.content)
      console.log("postId", this.post.id)
      this.$store.dispatch("addComment", {
        postId : this.post.id,
        content: this.content
      })
    }
  },

};
</script>

<style lang="scss">
.btn_publish_comment {
  margin-bottom: 5px;
}
</style>