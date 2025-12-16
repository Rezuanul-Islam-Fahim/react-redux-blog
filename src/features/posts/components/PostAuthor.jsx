import { useSelector } from 'react-redux'
import { selectUserById } from '@/features/users'

const PostAuthor = ({ userId, showPrefix = true }) => {
  const user = useSelector(state => selectUserById(state, userId))

  return (
    <span>
      {showPrefix ? 'by ' : null}
      {user?.name ?? 'Undefined'}
    </span>
  )
}

export default PostAuthor
