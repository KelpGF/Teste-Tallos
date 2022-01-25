import store from '../store'

export default async (to, from, next) => {
  if (to.name !== 'Login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken')

      next({ path: to.path })
    } catch (error) {
      next({ name: 'Login' })
    }
  } else {
    if (to.name === 'Login' && store.getters['auth/hasToken']) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
}
