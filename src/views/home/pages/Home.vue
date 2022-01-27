<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
    :loading="isLoading"
    loading-text="Carregando..."
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="info--text">
          Funcionários
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-spacer></v-spacer>

        <router-link
          v-if="user.role !== 'user'"
          :to="{ name: 'CreateEmployee' }"
        >
          <v-btn
            color="primary"
            dark
            class="mb-2"
          >
            <v-icon class="mr-2">
              mdi-account-plus
            </v-icon>
            Cadastrar Funcionário
          </v-btn>
        </router-link>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-alert
        class="mt-2"
        border="top"
        colored-border
        type="info"
        elevation="2"
      >
        Nenhum funcionário encontrado
      </v-alert>
    </template>
    <template v-slot:[`item.role`]="{ item }">
      {{ roleEmployee(item.role) }}
    </template>
    <template v-slot:[`item.name`]="{ item }">
      {{ nameFormat(item.name) }}
    </template>
    <template v-slot:[`item.admission_date`]="{ item }">
      {{ item.admission_date.split('T')[0].split('-').reverse().join('/') }}
    </template>
    <template v-slot:[`item.wage`]="{ item }">
      {{ Number(item.wage).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        title="Detalhes do Funcionário"
        class="mr-2 info--text"
        @click="redirectEmployee(item._id)"
      >
        mdi-account-eye
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Home',

  data: () => ({
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Cargo', value: 'role' },
      { text: 'Salário', value: 'wage' },
      { text: 'Data de Admissão', value: 'admission_date' },
      { text: '', value: 'actions', sortable: false }
    ],
    isLoading: true,
    socket: io('localhost:3000')
  }),

  created: function () {
    this.socket.on('connect', () => {
      this.socket.on('UPDATE_EMPLOYEE_LIST', () => {
        this.findEmployees()
      })
    })
  },

  mounted: function () {
    this.findEmployees()
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('home', ['employeesList']),

    items: function () {
      return this.employeesList
    }
  },

  methods: {
    ...mapActions('home', ['ActionFindEmployees']),
    ...mapActions('employee', ['ActionFindEmployee']),

    redirectEmployee: function (id) {
      this.$router.push({ name: 'FindEmployee', params: { id } })
    },
    findEmployees: async function () {
      try {
        await this.ActionFindEmployees()
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    nameFormat: function (nomeCompleto) {
      if (nomeCompleto.length === 0) {
        return ''
      }

      const nomeQuebrado = (nomeCompleto.trim()).split(' ')

      if (nomeQuebrado.length < 3) {
        return nomeCompleto
      }

      if (nomeQuebrado[1].length < 4) {
        return nomeQuebrado[0] + ' ' + nomeQuebrado[1] + ' ' + nomeQuebrado[2]
      }

      return nomeQuebrado[0] + ' ' + nomeQuebrado[1]
    },
    roleEmployee: function (role) {
      const roles = {
        user: 'Usuário',
        manager: 'Gerente',
        admin: 'Administrador'
      }

      return roles[role]
    }
  }
}
</script>
