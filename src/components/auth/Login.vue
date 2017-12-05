<template>
  <div class="container">
    <div class="col-md-8 col-md-offset-3 well">
      <h2 class="text-center">Ingresar al Sistema</h2>
      <br>
      <div class="alert alert-danger" role="alert" v-if="loginFailed">
        <p>Credenciales inválidas, por favor intente nuevamente.</p>
      </div>
      <form>
        <div class="form-group">
          <!-- <label for="usuario" class="form-label">Usuario:</label> -->
          <input 
            type="text" 
            class="form-control" 
            name="usuario" 
            placeholder="Usuario (email)"
            :class="{'input-invalid': $v.username.$error}"
            @blur="$v.username.$touch()"
            maxlength="255"
            v-model="username">
          <span class="help-block" v-if="$v.username.$dirty && !$v.username.required" >
            El nombre de usuario es requerido
          </span>
          <span class="help-block" v-if="$v.username.$dirty && !$v.username.email" >
            El nombre de usuario debe ser un email válido
          </span>
        </div>
        <div class="form-group">
          <!-- <label for="password" class="form-label">Contraseña:</label> -->
          <input 
            type="password" 
            class="form-control" 
            name="password" 
            placeholder="Contraseña"
            :class="{'input-invalid': $v.password.$error}"
            @blur="$v.password.$touch()"
            maxlength="255"
            v-model="password">
          <span class="help-block" v-if="$v.password.$dirty && !$v.password.required" >
            La contraseña es requerida
          </span>
        </div>
        <div class="form-group text-right">
          <img class="loading" src="../../assets/loading.gif" alt="loading_gif" v-if="isSubmitted">
          <button 
            :disabled="($v.username.$invalid || $v.password.$invalid) || isSubmitted" 
            class="btn btn-primary" 
            @click.prevent="onSubmit()">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { USER_ADMIN_ROLE_STRING } from '@/constants/global'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      username: '',
      password: '',
      isSubmitted: false,
      loginFailed: false,
      user: null
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit () {
      this.isSubmitted = true
      this.loginFailed = false

      const authData = {
        email: this.username,
        password: this.password,
        returnSecureToken: true
      }

      this.$store.dispatch('login', authData)
      .then(
        resolved => {
          // console.log(`the user ${resolved.email} has role ${resolved.role}`)
          if (resolved.role === USER_ADMIN_ROLE_STRING) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/user')
          }
        },
        rejected => {
          console.error('login rejected', rejected)
          this.isSubmitted = false
          this.loginFailed = true
        }
      )
    },
    created () {
      this.isSubmitted = true
      this.loginFailed = false
    }
  }
}
</script>

<style scoped>
.well {
  box-shadow: 3px 2px 2px black;
  margin-top: 6rem;
}
.input-invalid {
  border: 1px red solid;
}
.help-block {
  padding-left: 1.5rem;
}
img.loading {
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
}
</style>
