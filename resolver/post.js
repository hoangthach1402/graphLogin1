const Post = require('../models/Post')

const postResolver = {
  Query: {
    getPosts: async () => await Post.find(),
  },
}

module.exports = postResolver
