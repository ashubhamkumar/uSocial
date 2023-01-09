// models
const Post = require("../../models/Post.js");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_,{postId}){
      try {
        const existingPost = await Post.findById(postId);
        if (existingPost) {
          
        }
        
      } catch (error) {
        
      }
    }
  },
};
