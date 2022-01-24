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

export default {
  components: {
    NavBar
  }
}
</script>
