import './index.scss'
import { Layout, Menu, Popconfirm, message } from 'antd'
import { 
  LogoutOutlined, 
  HomeOutlined,
  DiffOutlined,
  EditOutlined
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const { Header, Sider, Content } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  }
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const menuClick = (route) => {
    navigate(route.key)
  }
  const location = useLocation()
  const selectedKey = location.pathname

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const name = useSelector(state => state.user.userInfo.name)

  const confirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
    message.success('退出成功')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logoHeader"></div>
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm 
              placement="bottomRight"
              title="退出登录" 
              description="确定要退出账号吗？"
              okText="退出" 
              onConfirm={confirm}
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width="15%">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClick}
          >
          </Menu>
        </Sider>
        <Content><Outlet /></Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout