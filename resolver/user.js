const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')
const validateRegisterInput = require('../util/validators')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')
const userResolver = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const user = await User.findOne({ username })
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      if (user) {
        throw new UserInputError('User name is taken', {
          errors: {
            username: `This username is taken`,
          },
        })
      }
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createAt: new Date().toISOString(),
      })
      const res = await newUser.save()

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.email,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      )
      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}

module.exports = userResolver
