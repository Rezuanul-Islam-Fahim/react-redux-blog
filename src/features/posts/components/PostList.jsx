import { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { LoaderIcon } from 'lucide-react'
import TimeAgo from '@/features/posts/components/TimeAgo'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import {
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from '../postsSlice'

const PostList = () => {
  const dispatch = useDispatch()
  const postsStatus = useSelector(selectPostsStatus)
  const postsError = useSelector(selectPostsError)
  const posts = useSelector(selectAllPosts)
  let content = null

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  const getPostContentStr = s => {
    const subStr = s.substring(0, 180)

    return subStr.length < s.length ? subStr + '...' : s
  }

  if (postsStatus === 'pending') {
    content = <LoaderIcon className="animate-spin size-10 mx-auto my-10" />
  } else if (postsStatus === 'succeeded') {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = (
      <>
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
              <PostAuthor userId={post.user} />
              <TimeAgo timestamp={post.date} />
            </div>
            <p className="text-lg">{getPostContentStr(post.content)}</p>
            <ReactionButtons postId={post.id} />
          </div>
        ))}
      </>
    )
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <section>
      <h3 className="text-4xl font-semibold mb-3 mt-10">Posts</h3>
      {content}
    </section>
  )
}

export default PostList
