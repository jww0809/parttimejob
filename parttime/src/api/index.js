import fetch from 'utils/fetch'

export default {
  login(params) {
    return fetch('/login', params)
  },
  logout(params) {
    return fetch('/logout', params)
  },
  getMenus(params) {
    return fetch('/user/menus', params)
  },
  getUserInfo(params) {
    return fetch('/user/info', params)
  },
  // 获取APP初始化信息，包含权限等内容
  getInitState(params) {
    return fetch('/base/initState', params, { method: 'get' })
  },
  // 用户角色
  getUserRole(params) {
    return fetch('/user/role/list', params)
  },
  addRole(params) {
    return fetch('/user/role/add', params, { method: 'post' })
  },
  // 角色组
  getUserRoleGroup(params) {
    return fetch('/user/role/group', params)
  },
  // 添加角色组
  addRoleGroup(params) {
    return fetch('/user/role/group/add', params, { method: 'post' })
  },
  // 用户权限
  getUserAuth(params) {
    return fetch('/user/auth/list', params)
  },
  // 获取所有用户信息
  getUserList(params) {
    return fetch('/user/list', params)
  }
}
