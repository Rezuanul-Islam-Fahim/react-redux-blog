import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../usersSlice'

const UserListPage = () => {
  const users = useSelector(selectAllUsers)

  return (
    <section className="text-center py-20">
      <h3 className="text-4xl font-semibold mb-8">All User</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`} className="link-primary">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UserListPage
