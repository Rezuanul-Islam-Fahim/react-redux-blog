import { Routes, Route } from 'react-router'
import { PostsPage, PostDetailPage, EditPostPage } from '@/features/posts'
import MainLayout from '@/shared/layouts/MainLayout'
import LoginPage from '@/features/auth/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
