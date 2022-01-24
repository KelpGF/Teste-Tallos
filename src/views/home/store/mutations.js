import * as types from './mutation-types'

export default {
  [types.SET_EMPLOYEES_LIST]: function (state, payload) {
    state.employeesList = payload
  }
}
