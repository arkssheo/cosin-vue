<template>
<div>
  <div class="col-md-12">
    <h2 class="text-center">Panel de Control del Administrador</h2>
    <hr>
    <div class="col-md-3 text-center btn btn-primary menu-icon" @click="createUser()">
      <p><i class="fa fa-user-o" aria-hidden="true"></i></p>
      <p><strong>Crear Nuevo Usuario</strong></p>
      <p class="menu-description">Ir a la forma para crear un nuevo usuario para cualquier rol. Puede contener rastros de luciernagas.</p>
    </div>
    <div class="col-md-3 text-center btn btn-primary menu-icon" disabled>
      <p><i class="fa fa-calculator" aria-hidden="true"></i></p>
      <p><strong>Cotización</strong></p>
      <p class="menu-description">
        Curabitur lobortis odio eget orci vulputate ultrices. Nullam fringilla luctus nibh et faucibus. Nunc scelerisque blandit vulputate.
      </p>
    </div>
    <div class="col-md-3 text-center btn btn-primary menu-icon" disabled>
      <p><i class="fa fa-calendar" aria-hidden="true"></i></p>
      <p><strong>Bitácora del Día</strong></p>
      <p class="menu-description">
        Aqui puede ingresar sus actividades del día. Morbi maximus arcu libero, vitae dignissim purus rutrum quis.
      </p>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  methods: {
    createUser () {
      this.$router.push('/admin/newuser')
    }
  }
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
