<template>
  <v-row>
    <v-col>
      <v-card class="elevation-2">
        <v-card-title>
          Detalhes do Funcionário
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>Nome: {{ employeeShow.name }} </v-col>
            <v-col>Salário R$ {{ employeeShow.wage }} </v-col>
            <v-col>Cargo: {{ employeeShow.role }} </v-col>
            <v-col>Data de admissão: {{ admissionDateFormat }} </v-col>
            <v-col>Email {{ employeeShow.email }} </v-col>
            <v-col>
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
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-divider />
    </v-col>
    <v-col>
      <form-fields-employee/>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormFieldsEmployee from '../../../components/FormFieldsEmployee.vue'

export default {
  components: {
    FormFieldsEmployee
  },

  data: () => ({
    confirmDelete: false
  }),

  mounted: function () {
    this.findEmployee()
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('employee', ['employeeShow']),

    employeeId: function () {
      return this.$route.params.id
    },
    allowEditing: function () {
      const role = this.user.role

      if (role === 'user') {
        return false
      }

      if (role === 'manager' && this.employeeShow.role === 'admin') {
        return false
      }

      return true
    },
    admissionDateFormat: function () {
      return this.employeeShow.admission_date.split('-').reverse().join('/')
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
