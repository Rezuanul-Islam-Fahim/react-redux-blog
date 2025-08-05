import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoaderIcon } from 'lucide-react'
import {
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from '../postsSlice'
import PostItem from './PostItem'

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

  if (postsStatus === 'pending') {
    content = <LoaderIcon className="animate-spin size-10 mx-auto my-10" />
  } else if (postsStatus === 'succeeded') {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = (
      <>
        {sortedPosts.map(post => (
          <PostItem key={post.id} post={post} />
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
