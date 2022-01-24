<template>
  <div>
    <form @submit.prevent='submitForm()'>
      <input type='text' v-model='formLogin.email'>
      <input type='password' v-model='formLogin.password'>
      <button type="submit">
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    formLogin: {
      email: 'k@g.c',
      password: '123'
    }
  }),

  methods: {
    ...mapActions('auth', ['ActionLogin']),

    submitForm: async function () {
      try {
        await this.ActionLogin(this.formLogin)

        this.$router.push({ path: '/' })
      } catch (error) {
        alert(error.data ? error.data.message : 'Não foi possível realizar o login!')
      }
    }
  }
}
</script>
