import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import AuthRoute from "@/components/AuthRoute";

const Publish = lazy(() => import('@/pages/Publish'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout></Layout></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback={'加载中'}><Home></Home></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article></Article></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish></Publish></Suspense>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  }
])

export default router