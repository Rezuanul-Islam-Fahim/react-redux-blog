import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router'
import { fetchUserById } from '../usersSlice'
import { selectPostsByUser } from '@/features/posts'

const UserPage = () => {
  const { id } = useParams()
  const user = useSelector(state => fetchUserById(state, id))
  const posts = useSelector(state => selectPostsByUser(state, id))

  if (!user) {
    return (
      <section className="text-center py-20">
        <h2 className="text-4xl font-semibold mb-8">User not found</h2>
      </section>
    )
  }

  return (
    <section className="text-center py-20">
      <h3 className="text-3xl font-semibold mb-8">{user.name}</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="link-primary">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UserPage
