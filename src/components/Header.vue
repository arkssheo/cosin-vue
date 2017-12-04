<template>
<div>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand" exact>COSIN</router-link>
      </div>
      <ul class="nav navbar-nav">
        <router-link active-class="active" to="/" tag="li" exact><a>Inicio</a></router-link>
        <router-link active-class="active" to="/user" tag="li"><a>Panel Usuario</a></router-link>
        <router-link active-class="active" to="/admin" tag="li"><a>Panel Admin</a></router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="currentUser">
        <p class="navbar-text">{{ currentUser.email }}</p>
        <li>
          <img 
            src="../assets/anon-user.png" 
            class="img-avatar" 
            alt="image-avatar" 
            title="Mi Perfil" @click="toggleProfileClick()"
          >
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-else>
        <router-link class="navbar-link" to="/login" tag="li"><a>Ingresar</a></router-link>
      </ul>
    </div>
  </nav>
  <div class="profile-dialog" v-if="isProfileVisible" @click="hideProfileDialog()">
    <div class="col-md-12 text-center">    
      <p class="text-right close-dialog">&times;</p>
      <img src="../assets/anon-user.png" class="img-avatar-profile" alt="image-avatar">  
      <p>{{currentUser.email}}</p>
      <p>{{currentUser.role}}</p>
      <p><a @click="goToDashboard()" class="btn btn-success">Mi Panel</a></p>
      <p><a @click="onLogout()" class="btn btn-danger">Cerrar Sesión</a></p>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  // data () {
  //   return {
  //     showProfile: false
  //   }
  // },
  methods: {
    toggleProfileClick () {
      let visibility = !this.isProfileVisible
      this.$store.dispatch('setProfileDialogVisibility', visibility)
    },
    goToDashboard () {

    },
    hideProfileDialog () {
      this.$store.dispatch('setProfileDialogVisibility', false)
    },
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
      this.hideProfileDialog()
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.getUser
    },
    isProfileVisible () {
      return this.$store.getters.isProfileDialogVisible
    }
  }
}
</script>
<style scoped>
  .img-avatar {
    height: 4rem;
    width: 4rem;
    border-radius: 5rem;
    cursor: pointer;
    margin: .8rem 1rem;
  }
  .img-avatar-profile {
    height: 8rem;
    width: 8rem;
    border-radius: 5rem;
    margin: 1.5rem auto;
  }
  .profile-dialog {
    position: absolute;
    top: 6rem;
    right: 2px;
    width: 20rem;
    /* height: 25rem; */
    border: .5px solid black;
    box-shadow: 5px 5px 3px black;
    border-radius: .5rem;
    z-index: 20;
    background-color: aliceblue;
  }
  .header-link {
    padding-top: 15px;
  }
  .close-dialog {
    font-size: 2rem;
    cursor: pointer;
  }
  .navbar-right {
    padding-right: 1.5rem;
  }
</style>
