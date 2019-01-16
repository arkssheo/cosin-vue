<template>
  <div id="app">
    <app-header></app-header>
    <img class="bgimage" src="./assets/account.png" alt="bgimage">
    <section class="content router-view">
      <router-view/>
    </section>
    
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
    .then(res => {
      this.$router.push('/')
    })
    .catch(err => {
      console.error(err)
    })
  }
}
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

#app {
  position: relative;
}

img.bgimage {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  opacity: 0.2;
  z-index: -999;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
}

.router-view {
  margin-top: 60px;
  height: 100%;
  width: 100%;
  margin-bottom: 25px;
}
</style>
