<template>
  <!-- add like to the post-->
  <div class="post_like">
    <div class="like_thumbs">
      <div class="tooltip">
        <i
          class="far fa-thumbs-up"
          :class="{ like: activeLike }"
          @click.prevent="addLike(post.id)"
        >
          <div v-if="post.Likes.length">{{ post.Likes.length }}</div> </i
        ><span class="tooltiptext">J'aime</span>
      </div>

      <div class="tooltip">
        <i
          class="far fa-thumbs-down"
          :class="{ dislike: activeDislike }"
          @click.prevent="addDislike(post.id)"
        >
          <div v-if="post.Dislikes.length">{{ post.Dislikes.length }}</div> </i
        ><span class="tooltiptext">Je n'aime pas</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostLike",
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      like: ref(0),
      dislike: ref(0),
      postLike: this.post,
      activeLike: false,
      postDislike: this.post,
      activeDislike: false,
      isLike: false,
    };
  },
  props: ["post"],

  methods: {
    //add a like
    ...mapActions(["addLike", "addDislike"]),

    addLike() {
      this.$store.dispatch("addLike", {
        postId: this.post.id,
        userId: this.userId,
      });
      console.log("postId", this.post.id);
      console.log("userId", this.userId);
      this.activeLike = !this.activeLike;
    },

    addDislike() {
      this.$store.dispatch("addDislike", {
        postId: this.post.id,
        userId: this.userId,
      });
      console.log("postId", this.post.id);
      console.log("userId", this.userId);
      this.activeDislike = !this.activeDislike;
    },
  },

  computed: mapGetters(["posts"]),
};
</script>

<style lang="scss">
#like_post {
  text-align: right;
  padding: 10px;
  margin-right: 25px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  //Position the tooltip
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.like_thumbs {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.fa-thumbs-up,
.fa-thumbs-down {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
}

.like {
  color: green;
}
.dislike {
  color: red;
}
</style>