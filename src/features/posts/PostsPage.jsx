import PostList from './components/PostList'

const PostsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h3 className="text-4xl font-semibold mb-3">Posts</h3>
        <PostList />
      </div>
    </div>
  )
}

export default PostsPage
