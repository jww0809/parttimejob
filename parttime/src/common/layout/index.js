import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import Menus from './Menus'
import api from 'api'
import storage from 'utils/storage'
import config from 'config'
import Breadcrumb from './Breadcrumb'
import NotFound from 'common/error/404'
import { topMenus } from '../../menus'
import logo from 'images/logo.svg'
import style from './index.pcss'

const { Sider, Content } = Layout
const MenuItems = Menu.Item
const userInfo = storage.getUser() || {}

class MainLayOut extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: userInfo.userName || '', collapsed: false }
  }

  // 设置是否可收起
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  // 侧边菜单
  sidebarMenu() {
    return <Menus match={this.props.match}
      selectedMenu={this.props.selectedMenu}
      collapsed={this.state.collapsed}/>
  }

  // 顶部菜单
  topMenu() {
    return topMenus && topMenus.length
      ? <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode='horizontal'
        className={style.topMenu}>
        {
          topMenus.map(item => {
            return (<Menu.Item key={item.key}>
              <Link to={item.url}>
                <Icon type={item.icon}>{item.value}</Icon>
              </Link>
            </Menu.Item>)
          })
        }
      </Menu> : null
  }

  // 退出登陆
  logout = async (item) => {
    // 退出登陆接口调用
    if (item.key === 'logout') {
      const userInfo = storage.getUser()
      const res = await api.user.logout(userInfo)
      if (res.code === 0 && res.data) {
        storage.setUser('')
        window.location.href = config.loginRoute
      }
    }
    if (item.key === 'detail') {
      alert('detail')
    }
  }

  render() {
    const { routes } = this.props
    const { collapsed, userName } = this.state
    return (<Layout className={style.layout}>
      <Sider className={style.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <div className={style.logo}>
          <Link className={style.toHome} to='/'>
            <img src={logo} alt='logo'/>
            {collapsed ? null : <div className={style.txt}>{config.appName}
              <div className={style.sub}>{config.subName}</div>
            </div>}
          </Link>
        </div>
        <div className={style.menuContainer}>{this.sidebarMenu()}</div>
      </Sider>

      <Layout className={collapsed ? style.mainContentCollapsed : style.mainContent}>
        {(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
          ? '' : <Alert message='请使用google chrome浏览器' banner closable/>)}
        <div className={style.header}>
          <div className={style.headerButton} onClick={this.toggle}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
          </div>
          <div className={style.leftWrapper}>{this.topMenu()}</div>
          <div className={style.rightWrapper}>
            <Dropdown placement='bottomCenter' overlay={<Menu onClick={this.logout}>
              <MenuItems key='detail'>详情</MenuItems>
              <MenuItems key='logout'>退出登录</MenuItems>
            </Menu>}>
              <span><Icon type='user'/>{userName}</span>
            </Dropdown>
          </div>
        </div>
        <Layout style={{ margin: '5px', padding: '5px', backgroundColor: '#FFFFFF' }}>
          <Switch>
            {
              routes.map((route, index) => {
                return (<Route key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(match) => {
                    return (route.path === '/' && route.path !== config.homeRoute)
                      ? <Redirect to={config.homeRoute}/>
                      : <div>
                        <Breadcrumb match={match} routes={routes}/>
                        <Content>
                          <route.component match={match}/>
                        </Content>
                      </div>
                  }}
                />)
              })
            }
            <Route path='*' component={NotFound}/>
          </Switch>
        </Layout>
      </Layout>
    </Layout>)
  }
}

export default MainLayOut
