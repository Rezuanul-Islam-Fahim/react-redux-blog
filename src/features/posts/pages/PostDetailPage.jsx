import { Link, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectPostById } from '../postsSlice'
import PostAuthor from '../components/PostAuthor'
import TimeAgo from '@/features/posts/components/TimeAgo'
import ReactionButtons from '../components/ReactionButtons'
import { selectLoggedUserId } from '@/features/auth'

const PostDetailPage = () => {
  const { id } = useParams()
  const post = useSelector(state => selectPostById(state, id))
  const loggedUserId = useSelector(selectLoggedUserId)

  return (
    <div className="container mx-auto py-10">
      <div className="border border-gray-300 max-w-3xl mx-auto border-solid p-5 rounded-lg my-4">
        <h4 className="text-2xl font-semibold">{post.title}</h4>
        <div className="flex flex-row mb-4">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="text-lg">{post.content}</p>
        <ReactionButtons postId={post.id} />
        {loggedUserId === post.userId && (
          <Link to={`/edit-post/${id}`} className="btn btn-neutral mt-5">
            Edit Post
          </Link>
        )}
      </div>
    </div>
  )
}

export default PostDetailPage
