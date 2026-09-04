import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'

const Home = lazy(() => import('./pages/Home/Home.jsx'))
const PostDetail = lazy(() => import('./pages/PostDetail/PostDetail.jsx'))
const About = lazy(() => import('./pages/About/About.jsx'))
const Login = lazy(() => import('./pages/Login/Login.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
