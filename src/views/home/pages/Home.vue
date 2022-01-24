<template>
  <div>
    <h3>
      <router-link
        :to="{ name: 'CreateEmployee' }"
      >
        <a href="#">Cadastrar Funcionário</a>
      </router-link>
    </h3>
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
            <button type='button' @click="findEmployee(employee._id)">
              Ver
            </button>
            <router-link
              :to="{ name: 'EditEmployee', params: { id: employee._id } }"
              v-if="allowEditing(employee.role)"
            >
              <button type='button'>
                Editar
              </button>
            </router-link>
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
    ...mapState('auth', ['user']),
    ...mapState('home', ['employeesList'])
  },

  methods: {
    ...mapActions('home', ['ActionFindEmployees']),
    ...mapActions('employee', ['ActionFindEmployee']),

    findEmployee: async function (id) {
      this.$router.push({ name: 'FindEmployee', params: { id } })
    },
    allowEditing: function (employeeRole) {
      const role = this.user.role

      if (role === 'user') {
        return false
      }

      if (role === 'manager' && employeeRole === 'admin') {
        return false
      }

      return true
    }
  }
}
</script>
