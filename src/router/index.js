import { createBrowserRouter } from "react-router-dom";

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import App from '@/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/test',
    element: <App></App>
  }
])

export default router