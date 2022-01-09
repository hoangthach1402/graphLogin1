const express = require('express')
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { gql } = require('graphql-tag')
const dotenv = require('dotenv')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./resolver')
mongoose.connect(
  'mongodb+srv://hoangthach1402:hoangthach123@cluster0.odp9m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {},
  console.log('mongoose is connected')
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.listen(5000, () => {
  console.log('server running ')
})
