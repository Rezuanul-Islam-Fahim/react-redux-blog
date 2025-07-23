import { Routes, Route } from 'react-router'
import PostsPage from '@/features/posts'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<PostsPage />} />
    </Routes>
  )
}

export default AppRoutes
