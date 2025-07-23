import { useSelector } from 'react-redux'

const PostList = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <>
      <h3 className="text-4xl font-semibold mb-3 mt-10">Posts</h3>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-300  border-solid p-5 rounded-lg my-4"
        >
          <h4 className="text-2xl font-semibold mb-3">{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  )
}

export default PostList
