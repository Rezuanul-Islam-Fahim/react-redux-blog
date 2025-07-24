import { useSelector } from 'react-redux'
import { fetchUserById } from '@/features/users'

const PostAuthor = ({ userId }) => {
  const user = useSelector(state => fetchUserById(state, userId))

  return <span>By {user?.name ?? 'Undefined'}</span>
}

export default PostAuthor
