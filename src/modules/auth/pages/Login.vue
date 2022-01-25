<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 mt-16">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              <v-icon>mdi-home-import-outline</v-icon> Bem vindo!
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-form
              v-model="valid"
              lazy-validation
              @submit.prevent='submitForm()'
            >
              <v-row>
                <v-col>
                  <v-text-field
                    prepend-icon="mdi-email"
                    v-model="formLogin.email"
                    label="Email"
                    :rules="emailRules"
                    outlined
                    shaped
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[v => !!v || 'Informe a senha']"
                    label="Senha"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                    v-model='formLogin.password'
                    outlined
                    shaped
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-expand-transition>
                <v-row v-show="showMessageFail">
                  <v-col>
                    <v-alert
                      dense
                      border="left"
                      type="error"
                    >
                      {{ messageFail }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-expand-transition>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="primary"
                  class="mb-4 mt-0 mr-5"
                >
                  <v-icon>mdi-login</v-icon> Entrar
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    formLogin: {
      email: 'k@g.c',
      password: '123'
    },
    emailRules: [
      v => !!v || 'Informe o email',
      v => /.+@.+\..+/.test(v) || 'Email inválido'
    ],
    messageFail: '',
    showMessageFail: false
  }),

  watch: {
    formLogin: {
      deep: true,
      handler: function () {
        this.showMessageFail = false
      }
    }
  },

  methods: {
    ...mapActions('auth', ['ActionLogin']),

    submitForm: async function () {
      this.valid = false

      try {
        await this.ActionLogin(this.formLogin)

        this.$router.push({ path: '/' })
      } catch (error) {
        this.messageFail = error.data ? error.data.message : 'Não foi possível realizar o login!'
        this.showMessageFail = true
      } finally {
        this.valid = true
      }
    }
  }
}
</script>
