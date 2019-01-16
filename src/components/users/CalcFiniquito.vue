<template>
  <div class="col-md-12">
    <h2>Calculo de Finiquito</h2>
    <hr>
    <div class="col-md-4 col-md-offset-2 calc-container">
      <div class="form-group">
        <label for="startDate" class="form-label">Fecha Inicio de Labores </label>
        <datepicker input-class="form-control" language="es" v-model="startDate" name="startDate"></datepicker>
      </div>
      <div class="form-group">
        <label for="endDate" class="form-label">Fecha Fin de Labores </label>
        <datepicker input-class="form-control" language="es" v-model="endDate" name="endDate"></datepicker>
      </div>
      <div class="form-group">
        <label class="form-label">Total de Días Laborados: {{laborDays}}</label>
      </div>
      <div class="form-group">
        <label class="form-label">Días del año: <input class="year-days text-right" type="number" v-model="yearDays"></label>
      </div>
    </div>
    <div class="col-md-4 calc-container">
      <div class="form-group">
        <label for="salary" class="form-label">Salario (MXN) $</label><br>
        <input type="number" class="form-control" name="salary" v-model="salary">
      </div>
      <div class="form-group">
        <label for="periodicity" class="form-label">Periodicidad del Pago (Dias) </label><br>
        <input type="number" class="form-control" name="periodicity" v-model="periodicity">
      </div>
      <div class="form-group">
        <label for="endDate" class="form-label">Salario Diario: ${{ dailySalary }}</label>
      </div>
      <button class="btn btn-primary" @click="calculate()">Calcular</button>
    </div>
    <div class="col-md-12">
      <div class="alert alert-danger" role="alert" v-if="invalidData">
        <p>Error en el cálculo, por favor revise la información provista.</p>
      </div>
    </div>
    <hr>
    <div class="col-md-12" v-if="showTable">
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
            <td><input type="number" min="1" v-model="lawDays.prima"></td>
            <td> {{ dailyFactors[0] }}</td>
            <td>{{ laborDays }}</td>
            <td>{{ totalFactors[0] }} </td>
            <td>${{ dailySalary }}</td>
            <td><strong>${{ totalPayment[0] }}</strong></td>
          </tr>
          <tr>
            <td>Aguinaldo</td>
            <td><input type="number" min="1" v-model="lawDays.aguinaldo"></td>
            <td> {{ dailyFactors[1] }}</td>
            <td>{{ laborDays }}</td>
            <td>{{ totalFactors[1] }} </td>
            <td>${{ dailySalary }}</td>
            <td><strong>${{ totalPayment[1] }}</strong></td>
          </tr>
          <tr>
            <td>Vacaciones</td>
            <td><input type="number" min="1" v-model="lawDays.vacaciones"></td>
            <td> {{ dailyFactors[2] }}</td>
            <td>{{ laborDays }}</td>
            <td>{{ totalFactors[2] }} </td>
            <td>${{ dailySalary }}</td>
            <td><strong>${{ totalPayment[2] }}</strong></td>
          </tr>
          <tr>
            <td>Prima Vacacional</td>
            <td><input type="number" min="1" v-model="vacationsPrime"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>${{ primePayment }}</strong></td>
          </tr>
        </tbody>
      </table>
      <p class="text-right grand-total">A Pagar: ${{ this.grandTotal.toFixed(2) }}</p>
      <div class="text-center">
        <button class="btn btn-lg btn-primary btn-print" @click="onPrint()">Imprimir</button>
      </div>
      
    </div>
    <div class="col-md-12" style="margin-bottom: 26px;">
      <button class="btn btn-info" @click="goBack()">Regresar</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  data () {
    return {
      startDate: null,
      endDate: null,
      salary: 0,
      periodicity: 0,
      yearDays: 365,
      lawDays: {
        prima: 12,
        aguinaldo: 15,
        vacaciones: 6
      },
      dailyFactors: [],
      totalFactors: [],
      totalPayment: [],
      vacationsPrime: 25,
      grandTotal: 0,
      showTable: false,
      invalidData: false
    }
  },
  components: {
    Datepicker
  },
  methods: {
    calculate () {
      if (this.dailySalary <= 0 || this.laborDays <= 0) {
        this.invalidData = true
        return false
      }

      this.invalidData = false
      if (!this.showTable) {
        this.showTable = true
      }

      this.dailyFactors = [
        Number(this.lawDays.prima / this.yearDays).toFixed(2),
        Number(this.lawDays.aguinaldo / this.yearDays).toFixed(2),
        Number(this.lawDays.vacaciones / this.yearDays).toFixed(2)
      ]

      this.totalFactors = [
        Number(this.dailyFactors[0] * this.laborDays).toFixed(2),
        Number(this.dailyFactors[1] * this.laborDays).toFixed(2),
        Number(this.dailyFactors[2] * this.laborDays).toFixed(2)
      ]

      this.totalPayment = [
        Number(this.totalFactors[0] * this.dailySalary).toFixed(2),
        Number(this.totalFactors[1] * this.dailySalary).toFixed(2),
        Number(this.totalFactors[2] * this.dailySalary).toFixed(2)
      ]

      this.grandTotal = 0
      this.totalPayment.map(payment => {
        this.grandTotal += Number(payment)
      })

      this.grandTotal += Number(this.primePayment)

      console.log(this.dailyFactors, this.totalFactors, this.totalPayment, Number(this.primePayment), this.grandTotal)
    },
    onPrint () {
      const table = {
        f1: this.dailyFactors,
        f2: this.totalFactors,
        t1: this.totalPayment,
        d1: this.lawDays,
        salary: this.dailySalary,
        days: this.laborDays,
        total: this.grandTotal,
        prima: this.vacationsPrime,
        payPrima: this.primePayment
      }
      this.$store.dispatch('setHtmlToPrint', table)
      console.log(table)
      this.$router.push('/finiquito/printpreview')
    },
    goBack () {
      this.$router.push('/user')
    }
  },
  computed: {
    laborDays () {
      if (!this.startDate || !this.endDate) {
        return -1
      }
      if (this.startDate >= this.endDate) {
        return -1
      }

      // stackoverflow answer. works, don't move anything
      var date1 = new Date(this.startDate)
      var date2 = new Date(this.endDate)
      var timeDiff = Math.abs(date2.getTime() - date1.getTime())
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

      return diffDays
    },
    dailySalary () {
      if (this.salary <= 0 || this.periodicity <= 0) {
        return -1
      }
      return (this.salary / this.periodicity).toFixed(2)
    },
    primePayment () {
      return (this.totalPayment[2] * (this.vacationsPrime / 100)).toFixed(2)
    }
  }
}
</script>

<style scoped>
.year-days {
  width: 8rem;
  margin-left: 2rem;
}
.calc-container {
  border: 1px solid black;
  box-shadow: .5rem .5rem 1rem black;
  margin: 1rem inherit;
  margin-right: 1rem;
  padding: .8rem 1rem;
  background-color: rgba(230, 230, 255, 0.4);
}
.alert, table {
  width: 80%;
  margin: 3rem auto;
}

table {
  border: 1px solid black;
  box-shadow: .5rem .5rem 1rem black;
  background-color: rgba(230, 230, 255, 0.4);
}
.grand-total {
  width: 85%;
  font-weight: 700;
  font-size: 3rem;
}
.btn-print {
  margin-left: 6rem;
}
</style>
