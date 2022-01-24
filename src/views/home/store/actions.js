import services from '@/http'
import * as types from './mutation-types'

export const ActionFindEmployees = ({ commit }) => {
  return services.home.findEmployees().then(res => {
    commit(types.SET_EMPLOYEES_LIST, res.data)
  })
}
