export default [
  {
    path: '/cadastrar-funcionario',
    name: 'CreateEmployee',
    component: () => import(/* webpackChunkName: 'CreateEmployee' */ './pages/FormEmployee')
  },
  {
    path: '/funcionario/:id',
    name: 'FindEmployee',
    component: () => import(/* webpackChunkName: 'FindEmployee' */ './pages/Employee')
  },
  {
    path: '/editar-funcionario/:id',
    name: 'EditEmployee',
    component: () => import(/* webpackChunkName: 'FormEmployee' */ './pages/FormEmployee')
  }
]
