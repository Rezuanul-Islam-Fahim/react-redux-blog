import { Routes, Route } from 'react-router'
import { PostsPage, PostDetailPage, EditPostPage } from '@/features/posts'
import MainLayout from '@/shared/layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
