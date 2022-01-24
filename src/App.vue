<template>
  <div id="app">
    <nav-bar v-if="$route.name !== 'Login'"/>

    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/layout/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
