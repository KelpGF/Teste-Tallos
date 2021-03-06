<template>
  <v-card class="elevation-2">
    <v-toolbar dark color="primary" v-if="!employeeId">
      <v-toolbar-title>
        <v-icon>mdi-account-plus</v-icon> Cadastro de Funcionário
      </v-toolbar-title>
    </v-toolbar>
    <v-card-title v-if="employeeId">
      Atualizar Dados
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        class="mt-2"
        v-model="valid"
        lazy-validation
        @submit.prevent="submitForm()"
      >
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="mdi-account-edit"
              v-model="employee.name"
              :rules="nameRules"
              label="Nome"
              required
              outlined
              shaped
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="mdi-cash-multiple"
              v-model="employee.wage"
              :rules="[v => !!v || 'Obrigatório']"
              label="Salário"
              type="number"
              required
              outlined
              shaped
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              prepend-icon="mdi-account-cog"
              v-model="employee.role"
              :items="roles"
              :rules="[v => !!v || 'Obrigatório']"
              label="Cargo"
              item-text="label"
              item-value="value"
              required
              outlined
              shaped
            ></v-select>
          </v-col>
          <v-col>
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Data de admissão"
                  prepend-icon="mdi-calendar"
                  outlined
                  shaped
                  required
                  :value="employeeAdmissionDate"
                  :rules="dateRules"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="pt-br"
                v-model="employee.admission_date"
                no-title
                @input="fromDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="7">
            <v-text-field
              prepend-icon="mdi-email"
              v-model="employee.email"
              :rules="emailRules"
              label="Email"
              required
              outlined
              shaped
            ></v-text-field>
          </v-col>
          <v-col
            v-if="!employeeId"
          >
            <v-text-field
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              label="Senha"
              class="input-group--focused"
              @click:append="showPassword = !showPassword"
              v-model='employee.password'
              outlined
              shaped
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-scroll-y-transition>
          <v-row v-if="showMessageFail">
            <v-col
              :key="idx"
              v-for="(message, idx) in errorMessages"
            >
              <v-alert
                outlined
                text
                dense
                type="error"
                icon="mdi-cloud-alert"
              >
                {{ message }}
              </v-alert>
            </v-col>
          </v-row>
        </v-scroll-y-transition>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mb-4 mt-0 mr-5"
          >
            <v-icon class="mr-1">
              mdi-account-check
            </v-icon>
            Salvar
          </v-btn>
          <v-snackbar
            v-model="showMessage"
            :timeout="3000"
            color="primary"
            absolute
            shaped
            left
            class="mb-4 mt-0 ml-5"
          >
            <span class="font-weight-bold text-4">
              {{ messageRequest }}
            </span>
            <template v-slot:action="{ attrs }">
              <v-btn
                text
                v-bind="attrs"
                @click="showMessage = false"
              >
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import io from 'socket.io-client'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FormFieldsEmployee',

  data: () => ({
    showPassword: false,
    showMessage: false,
    messageRequest: '',
    fromDateMenu: false,
    valid: true,
    emailRules: [
      v => !!v || 'Obrigatório',
      v => /.+@.+\..+/.test(v) || 'Email inválido'
    ],
    dateRules: [
      v => !!v || 'Obrigatório',
      v => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(v) || 'Data de admissão inválida'
    ],
    nameRules: [
      v => !!v || 'Obrigatório',
      v => (v && v.length >= 5) || 'O Nome deve ter pelo menos 5 letras'
    ],
    passwordRules: [
      v => !!v || 'Obrigatório',
      v => (v && v.length >= 3) || 'A senha deve ter pelo menos 3 caracteres'
    ],
    errorMessages: [],
    showMessageFail: true,
    socket: io('localhost:3000')
  }),

  created: function () {
    if (!this.employeeId) {
      this.ActionClearEmployee()
    }
  },

  watch: {
    employee: {
      deep: true,
      handler: function () {
        this.showMessageFail = false
      }
    }
  },

  computed: {
    ...mapState('employee', ['employee', 'employeeShow']),
    ...mapState('auth', ['user']),

    employeeId: function () {
      return this.$route.params.id
    },
    roles: function () {
      const roles = [
        {
          value: 'user',
          label: 'Usuário'
        },
        {
          value: 'manager',
          label: 'Gerente'
        }
      ]

      if (this.user.role === 'admin') {
        roles.push(
          {
            value: 'admin',
            label: 'Administrador'
          }
        )
      }

      return roles
    },
    employeeAdmissionDate: function () {
      return this.employee.admission_date.split('-').reverse().join('/')
    }
  },

  methods: {
    ...mapActions('employee', [
      'ActionCreateEmployee',
      'ActionEditEmployee',
      'ActionClearEmployee'
    ]),
    ...mapActions('auth', ['ActionSetUser']),

    validate () {
      return this.$refs.form.validate()
    },
    submitForm: async function () {
      try {
        if (this.validate()) {
          this.$set(this.employee, 'wage', Number(this.employee.wage))

          if (this.employee._id) {
            const role = this.employeeShow.role
            await this.ActionEditEmployee(this.employee)

            if (this.employee._id === this.user.subject) {
              this.ActionSetUser({
                subject: this.employee._id,
                name: this.employee.name,
                email: this.employee.email,
                exp: this.user.exp,
                iat: this.user.iat,
                role: this.employee.role
              })
            }
            if (this.employee.role !== role) {
              this.socket.emit('EDIT_EMPLOYEE')
            }
          } else {
            const employeeCreate = { ...this.employee }
            delete employeeCreate._id

            await this.ActionCreateEmployee(employeeCreate)
            this.$refs.form.reset()
            this.socket.emit('CREATE_DELETE_EMPLOYEE', { type: 'create' })
          }
          this.showMessage = true
          this.messageRequest = (this.employee._id) ? 'Funcionário(a) Atualizado(a)' : 'Funcionário(a) Cadastrado'
        }
      } catch (error) {
        const messages = (error.data) ? error.data.message : error

        if (Array.isArray(messages)) {
          this.errorMessages = messages
        } else {
          this.errorMessages = [messages]
        }

        this.showMessageFail = true
      }
    }
  }
}
</script>
