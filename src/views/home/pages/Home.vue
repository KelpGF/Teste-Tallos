<template>
  <div class="home">
    <h1>
      Home |
      <a href="#" @click='ActionSignOut()'>Sair</a>
    </h1>
    <table>
      <thead>
        <th>Nome</th>
        <th>Nível</th>
        <th>Salário</th>
        <th>Data de Admissão</th>
        <th></th>
      </thead>
      <tbody>
        <tr
          :key='idx'
          v-for='(employee, idx) in employeesList'
        >
          <td>{{ employee.name }}</td>
          <td>{{ employee.role }}</td>
          <td>{{ employee.wage }}</td>
          <td>{{ employee.admission_date }}</td>
          <td>{{ employee.admission_date }}</td>
          <td>
            <button
              type='button'
              @click='findEmployee(employee._id)'
            >
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',

  mounted: function () {
    this.ActionFindEmployees()
  },

  computed: {
    ...mapState('home', ['employeesList'])
  },

  methods: {
    ...mapActions('auth', ['ActionSignOut']),
    ...mapActions('home', ['ActionFindEmployees']),

    findEmployee: function (id) {
      console.log(id)
    }
  }
}
</script>
