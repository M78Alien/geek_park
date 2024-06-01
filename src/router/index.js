import { createBrowserRouter } from "react-router-dom";

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import App from '@/App'
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout></Layout></AuthRoute>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'article',
        element: <Article></Article>
      },
      {
        path: 'publish',
        element: <Publish></Publish>
      }
    ]
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