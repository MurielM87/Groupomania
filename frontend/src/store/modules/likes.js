const state = {    
    like: 0,
    likes: [],
    activeLike: false,
    dislike: 0,
    dislikes: [],
    activeDislike: false,
};

const getters = {
    allLikes: (state) => state.likes,
    allDislikes: (state) => state.dislikes
};

const actions = {

   
};

const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
}