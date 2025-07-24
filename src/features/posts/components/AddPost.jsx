import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from '../postsSlice'
import { fetchAllUsers } from '@/features/users'

const AddPost = () => {
  const users = useSelector(fetchAllUsers)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.title.value
    const content = elements.content.value
    const userId = elements.user.value

    dispatch(postAdded(title, content, userId))

    e.currentTarget.reset()
  }

  return (
    <>
      <h3 className="text-4xl font-semibold mb-3">Add Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            name="title"
            type="text"
            className="input input-bordered"
            placeholder="Post Title"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="content"
            className="textarea textarea-bordered h-32"
            placeholder="Write you description here..."
            required
          />
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">User</span>
          </label>
          <select
            defaultValue=""
            name="user"
            className="select select-bordered w-full max-w-xs"
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
        <div className="card-actions">
          <button className="btn btn-primary" type="submit">
            Create Post
          </button>
        </div>
      </form>
    </>
  )
}

export default AddPost
