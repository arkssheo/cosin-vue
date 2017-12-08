<template>
  <div class="col-md-12">
    <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Días de Ley</th>
            <th>Factor Diario</th>
            <th>Días Laborados</th>
            <th>Factor Total</th>
            <th>Salario Diario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prima de Antiguedad</td>
            <td>{{ htmlToPrint.d1.prima}}</td>
            <td> {{ htmlToPrint.f1[0] }}</td>
            <td>{{ htmlToPrint.days }}</td>
            <td>{{ htmlToPrint.f2[0] }} </td>
            <td>{{ htmlToPrint.salary }}</td>
            <td><strong>{{ htmlToPrint.t1[0] }}</strong></td>
          </tr>
          <tr>
            <td>Aguinaldo</td>
            <td>{{ htmlToPrint.d1.aguinaldo}}</td>
            <td> {{ htmlToPrint.f1[1] }}</td>
            <td>{{ htmlToPrint.days }}</td>
            <td>{{ htmlToPrint.f2[1] }} </td>
            <td>{{ htmlToPrint.salary }}</td>
            <td><strong>{{ htmlToPrint.t1[1] }}</strong></td>
          </tr>
          <tr>
            <td>Vacaciones</td>
            <td>{{ htmlToPrint.d1.vacaciones }}</td>
            <td> {{ htmlToPrint.f1[2] }}</td>
            <td>{{ htmlToPrint.days }}</td>
            <td>{{ htmlToPrint.f2[2] }} </td>
            <td>{{ htmlToPrint.salary }}</td>
            <td><strong>{{ htmlToPrint.t1[2] }}</strong></td>
          </tr>
          <tr>
            <td>Prima Vacacional</td>
            <td>{{ this.htmlToPrint.prima }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>{{ this.htmlToPrint.payPrima }}</strong></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      htmlToPrint: {}
    }
  },
  created () {
    this.htmlToPrint = this.$store.getters.getHtmlToPrint
    console.log('html to print: ', this.htmlToPrint)
  },
  mounted () {
    window.print()
  }
}
</script>
<style scoped>
table {
  border: 1px solid black;
  box-shadow: .5rem .5rem 1rem black;
  background-color: rgba(230, 230, 255, 0.4);
}
</style>
