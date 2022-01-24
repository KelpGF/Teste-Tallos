<template>
  <div>
    <h1>
      <router-link :to="{ name: 'Home' }" >
        <a href="#">Home</a>
      </router-link>
      |
      <a href="#" @click='ActionSignOut()'>Sair</a>
    </h1>
    <h2>
      Olá, {{ user.name }}
    </h2>
  </div>
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
