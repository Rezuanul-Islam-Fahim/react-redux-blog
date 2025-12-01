import PostList from '../components/PostList'
import AddPost from '../components/AddPost'

const PostsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <AddPost />
        <PostList />
      </div>
    </div>
  )
}

export default PostsPage
