<template>
  <div class="container-fluid">
    <div class="row text-center">
      <h1>CORPORATIVO DE SERVICIOS INTEGRALES</h1>
    </div>
    <hr>
    <div class="col-md-12 alert alert-warning" role="alert">
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      &nbsp;<span class="alert-text">
        <strong>Nota!</strong> Sitio en construcción. Algunas funcionalidades pueden no estar completas y el contenido podrìa estar incompleto.
      </span>
    </div>
    <article class="col-md-12">
      <div class="col-md-8">
        <h2>Soluciones para tu negocio</h2>
        <p class="text-primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id feugiat velit. Donec vel risus non tellus vulputate tempus. In metus nunc, rhoncus id facilisis bibendum, ornare a felis. Curabitur quis porta odio. Phasellus mi neque, pharetra eu nisi sed, condimentum dapibus tortor. Vivamus fringilla metus et eleifend lacinia. Donec sit amet bibendum justo. Etiam tempor eget mauris sit amet varius. Vivamus in tristique lacus.
        </p>
      </div>
      <div class="col-md-4 img-container">
        <img src="../assets/carousel/3.jpg" class="img-md" alt="img1">
      </div>
    </article>
    <hr>
    
  </div>
  
</template>

<script>
export default {

}
</script>


<style scoped>
.text-primary {
  font-size: 2.3rem;
  margin: 5rem 3rem 1.5rem 3rem;
  text-align: justify;
  font-style: italic;
}
article {
  padding: 5rem;
  background-color: rgba(93, 107, 160, 0.6)
  
}
.img-md {
  width: 100%;
  margin: 1.5rem;
}
.alert-warning {
  padding: 1.5rem;
  font-size: 2.5rem;
}
.alert-text {
  padding: auto 1.8rem;
  font-size: 2rem;
}
</style>
