import * as types from './mutation-types'

export default {
  [types.SET_EMPLOYEE]: function (state, payload) {
    state.employee = payload
  }
}
