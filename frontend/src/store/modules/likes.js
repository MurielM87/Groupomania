const state = {    
    like: 0,
    likes: [],
    activeLike: false,
    dislike: 0,
    dislikes: [],
    activeDislike: false,
};

const getters = {
    likes: (state) => state.likes,
    dislikes: (state) => state.dislikes
};

const actions = {
    //add a like
    async addLike({ commit }, postId) {
        console.log(postId)
        
      //  const userId = localStorage.getItem("userId");
      //  console.log("PostCard||addLike||postId", postId);
      //  console.log("PostCard||addLike||userId", userId);
        await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            commit('newLike', res)
        //    this.like = res;
        //    console.log(this.userId);
        //    const userLike = JSON.parse(JSON.stringify(this.postLike));
        //    console.log(this.userId == userLike.Likes[0].userId);
        //    if(this.userId == userLike.Likes[0].userId) {            
        //    this.activeLike = true;
        //    }
          })
          .catch((err) => console.error(err));
      },

    //add a dislike

   
};

const mutations = {
    //add a like
    newLike: (state, like) => {
        state.likes.unshift(like)
    },

    //add a dislike
    newDislike: (state, dislike) => {
        state.likes.unshift(dislike)
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}