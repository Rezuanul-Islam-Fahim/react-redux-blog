import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { postUpdated } from './postsSlice'

const EditPostPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = useSelector(state => state.posts.find(e => e.id === id))

  if (!post) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-semibold mb-3 text-center">
            No Post Found
          </h3>
        </div>
      </div>
    )
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.title.value
    const content = elements.content.value

    if (title && content) {
      dispatch(postUpdated({ id: id, title, content }))
      navigate(`/posts/${id}`)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="border border-gray-300 max-w-3xl mx-auto border-solid p-5 rounded-lg">
        <h3 className="text-4xl font-semibold mb-3">Edit Post</h3>
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
              defaultValue={post.title}
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
              defaultValue={post.content}
              required
            />
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" type="submit">
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostPage
