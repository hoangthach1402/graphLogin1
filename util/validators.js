const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'email must not be empty'
  } else {
    const regEx =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }
  if (password.trim() === '') {
    errors.password = 'password must not be empty'
  } else if (password !== confirmPassword) {
    errors.password = 'Passwords must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
module.exports = validateRegisterInput
