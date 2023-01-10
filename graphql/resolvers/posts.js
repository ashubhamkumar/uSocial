// models
const Post = require("../../models/Post.js");
const checkAuth = require("../../utils/check-auth.js");
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
    async getPost(_, { postId }) {
      try {
        const existingPost = await Post.findById(postId);
        if (existingPost) {
          return existingPost;
        } else {
          throw new Error("Post Not Found!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      try {
        const user = checkAuth(context);
        const newPost = new Post({
          body,
          user: user.indexOf,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    async deletePost(_, { postId }, context) {
      try {
        const user = checkAuth(context);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
