<template>
  <div>
    <h1>Detalhes do Funcionário</h1>
    <p>Nome: {{ employee.name }} </p>
    <p>Salário R$ {{ employee.wage }} </p>
    <p>Cargo: {{ employee.role }} </p>
    <p>Data de admissão: {{ admissionDateFormat }} </p>
    <p>Email {{ employee.email }} </p>
    <router-link
      v-if="allowEditing"
      :to="{ name: 'EditEmployee', params: { id: employee._id } }"
    >
      <button type='button'>
        Editar
      </button>
    </router-link>
    <button
      v-if="(user.subject !== employeeId) && user.role === 'admin'"
      type="button"
      @click="toggleConfirmDelete(true)"
    >
      Deletar
    </button>
    <div v-if="confirmDelete">
      Deseja realmente deletar esse funcionário?
      <button @click="deleteEmployee()">
        Sim
      </button>
      <button @click="toggleConfirmDelete(false)">
        Não
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    confirmDelete: false
  }),

  mounted: function () {
    this.findEmployee()
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('employee', ['employee']),

    employeeId: function () {
      return this.$route.params.id
    },
    allowEditing: function () {
      const role = this.user.role

      if (role === 'user') {
        return false
      }

      if (role === 'manager' && this.employee.role === 'admin') {
        return false
      }

      return true
    },
    admissionDateFormat: function () {
      return this.employee.admission_date.split('-').reverse().join('/')
    }
  },

  methods: {
    ...mapActions('employee', ['ActionFindEmployee', 'ActionDeleteEmployee']),

    findEmployee: async function () {
      try {
        await this.ActionFindEmployee(this.employeeId)
      } catch (error) {
        alert((error.data) ? error.data.message : error)
        this.$router.push({ name: 'Home' })
      }
    },
    toggleConfirmDelete: function (confirm) {
      this.confirmDelete = confirm
    },
    deleteEmployee: async function () {
      if (this.confirmDelete) {
        try {
          await this.ActionDeleteEmployee(this.employeeId)

          alert('Funcionário deletado!')
          this.$router.push({ name: 'Home' })
        } catch (error) {
          alert((error.data) ? error.data.message : error)
        }
      }
    }
  }
}
</script>
