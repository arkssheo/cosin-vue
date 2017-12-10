export class User {
  constructor (
    firstName,
    lastName,
    password,
    email,
    role,
    isAdmin
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.email = email
    this.role = role
    this.isAdmin = isAdmin
  }
}
