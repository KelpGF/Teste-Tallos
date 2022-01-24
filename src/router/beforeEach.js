import store from '../store'

export default async (to, from, next) => {
  const sufixTitle = ' - Controle de Funcionários'

  if (to.name !== 'Login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken')

      document.title = to.name + sufixTitle

      next({ path: to.path })
    } catch (error) {
      document.title = 'teste' + sufixTitle

      next({ name: 'Login' })
    }
  } else {
    if (to.name === 'Login' && store.getters['auth/hasToken']) {
      document.title = 'Home' + sufixTitle

      next({ name: 'Home' })
    } else {
      document.title = to.name + sufixTitle
      next()
    }
  }
}
