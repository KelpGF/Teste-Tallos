import { routes as auth } from '../modules/auth'
import { routes as home } from '../views/home'
import { routes as employee } from '../views/employee'

export default [
  ...auth,
  ...home,
  ...employee
]
