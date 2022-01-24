import services from '@/http'
import * as types from './mutation-types'

export const ActionFindEmployee = ({ commit }, payload) => {
  return services.employee.findEmployee({ id: payload }).then(res => {
    res.data.admission_date = res.data.admission_date.split('T')[0]

    commit(types.SET_EMPLOYEE, res.data)
  })
}

export const ActionDeleteEmployee = ({ dispatch }, payload) => {
  return services.employee.deleteEmployee({ id: payload }).then(() => {
    dispatch('ActionClearEmployee')
  })
}

export const ActionCreateEmployee = ({ dispatch }, payload) => {
  return services.employee.createEmployee(payload).then(() => {
    dispatch('ActionClearEmployee')
  })
}

export const ActionEditEmployee = ({ commit }, payload) => {
  return services.employee.editEmployee({ id: payload._id }, payload)
}

export const ActionClearEmployee = ({ commit }) => {
  commit(types.SET_EMPLOYEE, {
    _id: '',
    name: '',
    wage: '',
    role: 'user',
    admission_date: '',
    email: '',
    password: ''
  })
}
