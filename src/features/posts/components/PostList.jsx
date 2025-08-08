import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoaderIcon } from 'lucide-react'
import {
  fetchPosts,
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from '../postsSlice'
import PostItem from './PostItem'

const PostList = () => {
  const dispatch = useDispatch()
  const postsStatus = useSelector(selectPostsStatus)
  const postsError = useSelector(selectPostsError)
  const orderedPostIds = useSelector(selectPostIds)
  let content = null

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  if (postsStatus === 'pending') {
    content = <LoaderIcon className="animate-spin size-10 mx-auto my-10" />
  } else if (postsStatus === 'succeeded') {
    content = (
      <>
        {orderedPostIds.map(id => (
          <PostItem key={id} postId={id} />
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
