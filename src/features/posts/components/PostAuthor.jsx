import { useSelector } from 'react-redux'
import { fetchUserById } from '@/features/users'

const PostAuthor = ({ userId, showPrefix = true }) => {
  const user = useSelector(state => fetchUserById(state, userId))

  return (
    <span>
      {showPrefix ? 'by ' : null}
      {user?.name ?? 'Undefined'}
    </span>
  )
}

export default PostAuthor
