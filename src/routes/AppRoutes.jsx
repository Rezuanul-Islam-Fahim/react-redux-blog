import { Routes, Route } from 'react-router'
import PostsPage from '@/features/posts'
import MainLayout from '@/shared/layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<PostsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
