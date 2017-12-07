<template>
<div>
  <div class="col-md-12">
    <h2 class="text-center">Menú Principal</h2>
    <hr>
    <div class="col-md-3 text-center btn btn-primary menu-icon" @click="$router.push('/user/finiquito')">
      <p><i class="fa fa-university" aria-hidden="true"></i></p>
      <p><strong>Cálculo de finiquito</strong></p>
      <p class="menu-description">Calcular la cantidad a liquidar basada en una serie de datos del empleado. Puede contener nueces.</p>
    </div>
    <div class="col-md-3 text-center btn btn-primary menu-icon" @click="$router.push('/user/archivos')">
      <p><i class="fa fa-file" aria-hidden="true"></i></p>
      <p><strong>Mis Archivos</strong></p>
      <p class="menu-description">Ver los archivos que han sido compartidos conmigo, subir, bajar o administrar la lista de archivos. Puede contener nueces.</p>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
}
</script>


<style scoped>
  .fa {
    font-size: 6rem;
  }
  .menu-icon {
    height: 25rem;
    white-space: normal;
    padding: 3rem;
    margin: 1.5rem 5rem;
  }
  .menu-description {
    text-align: justify;
  }
</style>
