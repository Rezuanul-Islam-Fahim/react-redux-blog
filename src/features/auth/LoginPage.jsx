import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { selectAllUsers } from '@/features/users'
import { login } from './authSlice'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const handleLogin = async e => {
    e.preventDefault()

    const userId = e.currentTarget.elements.user.value
    await dispatch(login(userId)).unwrap()
    navigate('/posts')
  }

  return (
    <div className="container max-w-sm mx-auto text-center justify-center py-10">
      <form onSubmit={handleLogin} className="flex flex-col mx-auto">
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Select user to login:</span>
          </label>
          <select
            defaultValue=""
            name="user"
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
