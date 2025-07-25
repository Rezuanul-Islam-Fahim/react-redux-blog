import { Routes, Route } from 'react-router'
import { PostsPage, PostDetailPage, EditPostPage } from '@/features/posts'
import MainLayout from '@/shared/layouts/MainLayout'
import LoginPage from '@/features/auth/LoginPage'
import ProtectedRoutes from './ProtectedRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <Routes>
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/edit-post/:id" element={<EditPostPage />} />
              </Routes>
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
