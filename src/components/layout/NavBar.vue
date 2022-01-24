<template>
  <v-app-bar
    absolute
    color="primary"
    dark
    app
  >
    <router-link :to="{ name: 'Home' }" >
      <v-toolbar-title class="white--text">
        Home
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    {{ user.name }}

    <v-btn icon @click='ActionSignOut()'>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])
  },

  methods: {
    ...mapActions('auth', ['ActionSignOut'])
  }
}
</script>
