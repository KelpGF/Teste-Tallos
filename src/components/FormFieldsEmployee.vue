<template>
  <form @submit.prevent="submitForm()">
    <input type="text" v-model="employee.name" placeholder="Nome" required>
    <input type="number" v-model="employee.wage" placeholder="Salário" required>
    Cargo:
    <select v-model="employee.role" required>
      <option
        :value="role.value"
        :key="idx"
        v-for="(role, idx) in roles"
      >
        {{ role.label }}
      </option>
    </select>
    <br>
    Data de admissão: <input type="date" v-model="employee.admission_date" required>
    <input type="email" v-model="employee.email" placeholder="Email" required>
    <input v-if="!employeeId" type="password" v-model="employee.password" placeholder="Senha" required>
    <br>
    <button>
      Enviar
    </button>
  </form>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'FormFieldsEmployee',

  created: function () {
    if (this.employeeId) {
      this.findEmployee()
    } else {
      this.ActionClearEmployee()
    }
  },

  computed: {
    ...mapState('employee', ['employee']),
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
    allowEditing: function () {
      const role = this.user.role

      if (role === 'user') {
        return false
      }

      if (role === 'manager' && this.employee.role === 'admin') {
        return false
      }

      return true
    }
  },

  methods: {
    ...mapActions('employee', [
      'ActionFindEmployee',
      'ActionCreateEmployee',
      'ActionEditEmployee',
      'ActionClearEmployee'
    ]),

    findEmployee: async function () {
      try {
        await this.ActionFindEmployee(this.employeeId)

        if (!this.allowEditing) {
          this.$router.push({ name: 'Home' })
        }
      } catch (error) {
        alert((error.data) ? error.data.message : error)
        this.$router.push({ name: 'Home' })
      }
    },
    submitForm: async function () {
      try {
        if (this.employee._id) {
          await this.ActionEditEmployee(this.employee)
        } else {
          const employeeCreate = { ...this.employee }
          delete employeeCreate._id

          await this.ActionCreateEmployee(employeeCreate)
        }
        alert('Sucesso')
      } catch (error) {
        alert((error.data) ? error.data.message : error)
      }
    }
  }
}
</script>
