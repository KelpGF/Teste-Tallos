<template>
  <div class="home">
    <h1>
      Home |
      <a href="#" @click='ActionSignOut()'>Sair</a>
    </h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',

  methods: {
    ...mapActions('auth', ['ActionSignOut'])
  }
}
</script>
