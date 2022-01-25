import * as types from './mutation-types'

export default {
  [types.SET_EMPLOYEE]: function (state, payload) {
    state.employee = payload
    state.employeeShow = {
      name: payload.name,
      wage: payload.wage,
      role: payload.role,
      admission_date: payload.admission_date,
      email: payload.email
    }
  }
}
