import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../postsSlice'
import { selectLoggedUserId } from '@/features/auth'

const AddPost = () => {
  const [requestStatus, setRequestStatus] = useState('idle')
  const dispatch = useDispatch()
  const userId = useSelector(selectLoggedUserId)

  const handleSubmit = async e => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.title.value
    const content = elements.content.value

    try {
      setRequestStatus('pending')
      await dispatch(createPost({ title, content, user: userId })).unwrap()
      e.target.reset()
    } catch (error) {
      console.log('Error occurred', error)
    } finally {
      setRequestStatus('idle')
    }
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
        <div className="card-actions">
          <button
            disabled={requestStatus === 'pending'}
            className="btn btn-primary"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </>
  )
}

export default AddPost
