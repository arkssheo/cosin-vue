import Role from './Role'

class User {
  constructor (
    email,
    password = '',
    roleId = -1,
    role = new Role(),
    firstName = '',
    lastName = ''
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.email = email
    this.role = role
    this.roleId = roleId
  }
}

export default User
