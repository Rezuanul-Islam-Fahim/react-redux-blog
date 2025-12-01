import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { selectLoggedUserId } from '@/features/auth'

const ProtectedRoutes = ({ children }) => {
  const user = useSelector(selectLoggedUserId)

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoutes
