import React from 'react'
import { Link } from 'react-router'
import TimeAgo from '@/features/posts/components/TimeAgo'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'

const getPostContentStr = s => {
  const subStr = s.substring(0, 180)

  return subStr.length < s.length ? subStr + '...' : s
}

const PostItem = React.memo(({ post }) => {
  return (
    <div className="border border-gray-300  border-solid p-5 rounded-lg my-4">
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
  )
})

export default PostItem
