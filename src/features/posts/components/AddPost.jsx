const AddPost = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const elem = e.currentTarget
    console.log(elem.title.value)
    console.log(elem.content.value)

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
