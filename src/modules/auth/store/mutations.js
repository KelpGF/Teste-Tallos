import * as types from './mutation-types'

export default {
  [types.SET_USER]: function (state, payload) {
    state.user = payload
  },

  [types.SET_TOKEN]: function (state, payload) {
    state.token = payload
  }
}
