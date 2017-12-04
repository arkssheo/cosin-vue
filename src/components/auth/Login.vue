<template>
  <div class="container">
    <div class="col-md-8 col-md-offset-3 well">
      <h2 class="text-center">Ingresar al Sistema</h2>
      <br>
      <div class="alert alert-danger" role="alert" v-if="!isValid">
        <p>Credenciales inválidas, por favor intente nuevamente.</p>
      </div>
      <form>
        <div class="form-group">
          <!-- <label for="usuario" class="form-label">Usuario:</label> -->
          <input type="text" class="form-control" name="usuario" placeholder="Usuario (email)" v-model="username">
        </div>
        <div class="form-group">
          <!-- <label for="password" class="form-label">Contraseña:</label> -->
          <input type="password" class="form-control" name="password" placeholder="Contraseña" v-model="password">
        </div>
        <div class="form-group text-right">
          <button class="btn btn-primary" @click.prevent="onSubmit()">Ingresar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { USER_ADMIN_ROLE_STRING } from '@/constants/global'
export default {
  data () {
    return {
      username: '',
      password: '',
      isValid: true,
      user: null
    }
  },
  methods: {
    onSubmit () {
      this.isValid = true

      const authData = {
        email: this.username,
        password: this.password,
        returnSecureToken: true
      }

      this.$store.dispatch('login', authData)
      .then(
        resolved => {
          this.isValid = true
          console.log(`the user ${resolved.email} has role ${resolved.role}`)
          if (resolved.role === USER_ADMIN_ROLE_STRING) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/user')
          }
        },
        rejected => {
          console.error('login rejected', rejected)
          this.isValid = false
        }
      )
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
