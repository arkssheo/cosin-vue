import Role from './Role'

class User {
  constructor (
    email,
    password = '',
    role = new Role(),
    firstName = '',
    lastName = ''
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.email = email
    this.role = role
  }
}

export default User
