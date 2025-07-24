import { Routes, Route } from 'react-router'
import { PostsPage } from '@/features/posts'
import { PostDetailPage } from '@/features/posts'
import MainLayout from '@/shared/layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
