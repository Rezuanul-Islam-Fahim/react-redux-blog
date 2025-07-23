import { useSelector } from 'react-redux'

const PostList = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-400  border-solid p-5 rounded-lg my-4"
        >
          <h4 className="text-2xl font-semibold mb-3">{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  )
}

export default PostList
