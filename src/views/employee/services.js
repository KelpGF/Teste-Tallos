export default {
  findEmployee: { method: 'get', url: 'employees{/id}' },
  deleteEmployee: { method: 'delete', url: 'employees{/id}' },
  editEmployee: { method: 'patch', url: 'employees{/id}' },
  createEmployee: { method: 'post', url: 'employees' }
}
