import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const EditPostPage = () => {
  const { id } = useParams()
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

  const handleSubmit = () => {}

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
