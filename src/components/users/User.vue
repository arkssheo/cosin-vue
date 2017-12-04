<template>
  <div class="col-md-12">
    <h2 class="text-center text-primary">Bienvenido, usuario!</h2>
    <hr>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th># Archivo</th>
          <th>Nombre</th>
          <th>Fecha Subida</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>{{ file.id }}</td>
          <td>{{ file.fileName }}</td>
          <td>{{ file.uploadedDate }}</td>
          <td>
            <button class="btn btn-xs btn-info" title="Descargar">
              <i class="fa fa-download"></i>
            </button>
            &nbsp;
            <button class="btn btn-xs btn-danger" title="Eliminar">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: [
        { id: 12345, fileName: 'Utilidades_2017.pdf', uploadedDate: 'Dic 25, 2017' },
        { id: 12348, fileName: 'Utilidades_2016.pdf', uploadedDate: 'Dic 25, 2016' },
        { id: 15345, fileName: 'Finiquito_Maria.pdf', uploadedDate: 'Ene 2, 2014' }
      ]
    }
  }
}
</script>

<style scoped>
table {
  background-color: skyblue;
  border: solid 1.5px black;
}
thead {
  border-bottom: solid 1.5px black;
}
fa {
  font-size: 1.5rem;
}
btn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
