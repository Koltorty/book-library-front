import { Layout as AntLayout, Menu, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'

const menuItems = [
  { key: '/', label: 'Книги' },
  { key: '/authors', label: 'Авторы' },
  { key: '/categories', label: 'Категории' },
  { key: '/publishers', label: 'Издатели' },
  { key: '/series', label: 'Серии' },
]

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout.Sider>
        <Typography.Title level={4} style={{ color: '#fff', textAlign: 'center', margin: '16px 0' }}>
          📚 BookLibrary
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </AntLayout.Sider>
      <AntLayout>
        <AntLayout.Content style={{ padding: 24 }}>
          <Outlet />
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  )
}
