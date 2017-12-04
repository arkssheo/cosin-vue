<template>
  <div class="container">
    <!-- {{ pwd }} : {{ role }} -->
    <div class="col-md-8 col-md-offset-4 well">
      <h2 class="text-center">Nuevo Usuario</h2>
      <br>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" name="firstName" placeholder="Nombre(s)" v-model="firstName">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="lastName" placeholder="Apellido Paterno" v-model="lastName">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" name="email" placeholder="Correo Electronico" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Contraseña" v-model="password">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Confirmar Contraseña">
        </div>
        <div class="form-group">
          <select name="roles" id="select" class="form-control" v-model="role">
            <option v-for="role in roles" :key="role.id" :value="role.value">{{ role.value }}</option>
          </select>
        </div>
        <div class="form-group text-right">
          <button class="btn btn-primary" @click.prevent="onSubmit()">Ingresar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { NEW_USER_SECRET } from '@/constants/global.js'
export default {
  data () {
    return {
      roles: [],
      pwd: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'Usuario'
    }
  },
  methods: {
    onSubmit () {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: this.role
      }

      this.$store.dispatch('signup', userData)
    }
  },
  created () {
    this.roles = this.$store.getters.getRoles

    this.pwd = this.$route.params['pwd']
    if (!this.pwd || this.pwd !== NEW_USER_SECRET) {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.well {
  box-shadow: 3px 2px 2px black;
  margin-top: 6rem;
}
</style>
