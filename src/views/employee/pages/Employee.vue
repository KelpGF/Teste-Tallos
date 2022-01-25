<template>
  <v-row>
    <transition name="fade">
      <div
        class="box-pre-loader"
        v-if="isLoading"
      >
          <v-progress-circular
            :size="100"
            :width="10"
            color="white"
            indeterminate
            style="margin-top: 15%;"
          ></v-progress-circular>
      </div>
    </transition>
    <v-col>
      <v-card class="elevation-2">
        <v-card-title>
          Detalhes do Funcionário
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>Nome: {{ employeeShow.name }} </v-col>
            <v-col>Salário {{ Number(employeeShow.wage).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }} </v-col>
            <v-col>Cargo: {{ roles[employeeShow.role] }} </v-col>
            <v-col>Data de admissão: {{ employeeShow.admission_date.split('-').reverse().join('/') }} </v-col>
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
    confirmDelete: false,
    roles: {
      user: 'Usuário',
      manager: 'Gerente',
      admin: 'Administrador'
    },
    isLoading: true
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
    }
  },

  methods: {
    ...mapActions('employee', ['ActionFindEmployee', 'ActionDeleteEmployee']),

    findEmployee: async function () {
      try {
        await this.ActionFindEmployee(this.employeeId)

        this.isLoading = false
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

<style scoped>
  .box-pre-loader {
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: #1976d2;
    text-align: center;
    align-content: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    opacity: 0;
  }
</style>
