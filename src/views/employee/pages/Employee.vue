<template>
  <v-row>
    <v-fade-transition>
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
    </v-fade-transition>
    <v-col>
      <v-card class="elevation-2">
        <v-card-title>
          Detalhes do Funcionário(a)
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <span class="text-h6 font-weight-medium">
                <v-icon>mdi-account-tie-outline</v-icon>
                {{ roles[employeeShow.role] }}: {{ employeeShow.name }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="text-subtitle-1 font-weight-medium">
                <v-icon>mdi-email</v-icon>
                Endereço eletrônico: {{ employeeShow.email }}
              </span>
            </v-col>
          </v-row>
          <v-row>
              <v-col>
                <span class="text-subtitle-2 font-weight-medium">
                  <v-icon>mdi-file-account</v-icon>
                  Admitido em {{ employeeShow.admission_date.split('-').reverse().join('/') }}.
                  Atualmente possui o salário de
                  {{ Number(employeeShow.wage).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}
                </span>
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-dialog v-model="confirmDelete" max-width="500px">
                <v-card color="primary">
                  <v-card-title class="text-h6 white--text">
                    Deseja realmente deletar o(a) funcionário(a)
                    <strong>{{ employeeShow.name }}</strong>?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white darken-1"
                      text
                      @click="toggleConfirmDelete(false)"
                    >
                      Não
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      @click="deleteEmployee()"
                      class="white--text"
                    >
                      Sim
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                v-if="(user.subject !== employeeId) && user.role === 'admin'"
                @click="toggleConfirmDelete(true)"
                color="red"
                class="mb-4 mt-0 mr-5 white--text"
              >
                <v-icon>mdi-delete</v-icon> Deletar
              </v-btn>
              <v-snackbar
                v-model="showMessage"
                :timeout="2000"
                color="red"
                absolute
                right
                elevation="24"
                class="mb-4 mt-0 ml-5"
              >
                <span class="font-weight-bold text-4">
                  {{ messageRequest }}
                </span>
              </v-snackbar>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-divider />
    </v-col>
    <v-col>
      <form-fields-employee v-if="allowEditing"/>
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
    showMessage: false,
    messageRequest: '',
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
    ...mapActions('employee', ['ActionFindEmployee', 'ActionDeleteEmployee', 'ActionClearEmployee']),

    findEmployee: async function () {
      try {
        await this.ActionFindEmployee(this.employeeId)

        this.isLoading = false
      } catch (error) {
        console.log((error.data) ? error.data.message : error)
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

          this.confirmDelete = false
          this.showMessage = true
          this.messageRequest = 'Funcionário(a) Deletado(a)'

          setTimeout(() => {
            this.ActionClearEmployee()
            this.$router.push({ name: 'Home' })
          }, 2000)
        } catch (error) {
          console.log((error.data) ? error.data.message : error)
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
</style>
