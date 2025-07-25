import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { selectAllPosts } from '../postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from '@/features/posts/components/TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostList = () => {
  const posts = useSelector(selectAllPosts)

  const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const getPostContentStr = s => {
    const subStr = s.substring(0, 180)

    return subStr.length < s.length ? subStr + '...' : s
  }

  return (
    <>
      <h3 className="text-4xl font-semibold mb-3 mt-10">Posts</h3>
      {sortedPosts.map(post => (
        <div
          key={post.id}
          className="border border-gray-300  border-solid p-5 rounded-lg my-4"
        >
          <Link to={`/posts/${post.id}`}>
            <h4 className="text-2xl font-semibold link link-primary link-hover">
              {post.title}
            </h4>
          </Link>
          <div className="flex flex-row mb-4">
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="text-lg">{getPostContentStr(post.content)}</p>
          <ReactionButtons postId={post.id} />
        </div>
      ))}
    </>
  )
}

export default PostList
