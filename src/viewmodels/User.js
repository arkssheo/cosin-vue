class User {
  constructor (
    email,
    password = '',
    role = '',
    isAdmin = false,
    firstName = '',
    lastName = ''
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.email = email
    this.role = role
    this.isAdmin = isAdmin
  }
}

export default User
