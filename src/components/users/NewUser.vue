<template>
  <div class="container">
    <div class="col-md-8 col-md-offset-4 back-btn">
      <router-link class="btn btn-link" tag="a" to="/admin"><i class="fa fa-angle-double-left" aria-hidden="true"></i> Back</router-link>
    </div>
    <div class="col-md-8 col-md-offset-4 well">
      <h2 class="text-center">Nuevo Usuario</h2>
      <br>
      <div class="alert alert-danger" role="alert" v-if="loginFailed">
        <p>{{ customErrorMessage }}</p>
      </div>
      <div class="alert alert-success" role="alert" v-if="userAdded">
        <p>Usuario {{ this.email }} agregado exitosamente!</p>
      </div>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" name="firstName" placeholder="Nombre(s)" v-model="firstName">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="lastName" placeholder="Apellido Paterno" v-model="lastName">
        </div>
        <div class="form-group">
          <input 
            type="email" 
            class="form-control" 
            name="email" 
            placeholder="Correo Electronico"
            :class="{'input-invalid': $v.email.$error}"
            @blur="$v.email.$touch()"
            maxlength="255"
            v-model="email">
          <span class="help-block" v-if="$v.email.$dirty && !$v.email.required" >
            El nombre de usuario es requerido
          </span>
          <span class="help-block" v-if="$v.email.$dirty && !$v.email.email" >
            El nombre de usuario debe ser un email válido
          </span>
        </div>
        <div class="form-group">
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
        <div class="form-group">
          <input type="password" class="form-control" name="password" v-model="passwordConfirm" placeholder="Confirmar Contraseña">
        </div>
        <div class="form-group">
          <select name="roles" id="select" class="form-control" v-model="role">
            <option v-for="role in roles" :key="role.id" :value="role">{{ role.name }}</option>
          </select>
        </div>
        <div class="form-group text-right">
          <img class="loading" src="../../assets/loading.gif" alt="loading_gif" v-if="isSubmitted">
          <button class="btn btn-warning" type="button" @click="clearForm()">
            Limpiar
          </button>
          <button 
            class="btn btn-info"
            :disabled="($v.email.$invalid || $v.password.$invalid) || isSubmitted"
            type="submit"
            @click.prevent="onSubmit()">
            Agregar Usuario
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { NEW_USER_SECRET } from '@/constants/global.js'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      roles: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: null,
      isSubmitted: false,
      userAdded: false,
      loginFailed: false,
      customErrorMessage: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      console.log('enter submit')
      this.isSubmitted = true
      this.userAdded = false
      this.loginFailed = false
      this.customErrorMessage = ''

      if (this.password !== this.passwordConfirm) {
        console.log('password mismatch')
        this.customErrorMessage = 'Las contraseñas no coinciden.'
        this.loginFailed = true
        this.isSubmitted = false
        return false
      }

      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: this.role.id,
        isAdmin: this.role.isAdmin
      }

      this.$store.dispatch('createUser', userData)
      .then(
        resolved => {
          console.log('enter resolved')
          this.clearForm()
          this.userAdded = true
          this.isSubmitted = false
        },
        reject => {
          this.loginFailed = true
          this.userAdded = false
          this.isSubmitted = false
          this.customErrorMessage = 'Ocurrió un error al intentar registrar al usuario, por favor intente nuevamente.'
          console.error(reject.message)
        }
      )
    },
    clearForm () {
      this.isSubmitted = false
      this.userAdded = false
      this.loginFailed = false
      this.customErrorMessage = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
      this.$v.$reset()
    }
  },
  created () {
    this.$store.dispatch('fetchRoles')
    .then(resolved => {
      this.roles = resolved
      this.role = this.roles[0]
    }, error => {
      console.error(error)
    })
    if (!this.roles) {
      this.roles = this.$store.getters.getRoles
    }

    let pwd = this.$route.params['pwd']
    let user = this.$store.getters.getUser

    if (!user && (!pwd || pwd !== NEW_USER_SECRET)) {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.well {
  box-shadow: 3px 2px 2px black;
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
.back-btn {
  margin-top: 4rem;
}
.fa {
  font-size: 1.5rem;
}
</style>
