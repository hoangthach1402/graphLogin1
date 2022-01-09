const userResolver = require('./user')
const postResolver = require('./post')

const resolvers = {
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
}

module.exports = resolvers
