<template>
  <v-app>
    <nav-bar v-if="$route.name !== 'Login'"/>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/layout/NavBar'
import io from 'socket.io-client'
import { mapActions } from 'vuex'

export default {
  data: () => ({
    socket: io('localhost:3000')
  }),

  components: {
    NavBar
  },

  created: function () {
    this.socket.on('connect', () => {
      this.socket.on('UPDATE_CURRENT_USER', () => {
        this.ActionLoadSession()
      })
      this.socket.on('UPDATE_EMPLOYEE_LIST', (data) => {
        if (data.type === 'delete') {
          this.ActionLoadSession()
        }
      })
    })
  },

  methods: {
    ...mapActions('auth', ['ActionLoadSession'])
  }
}
</script>
