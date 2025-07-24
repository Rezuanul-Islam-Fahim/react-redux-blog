import { useDispatch, useSelector } from 'react-redux'
import { reactionAdded, selectPostById } from '../postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = ({ postId }) => {
  const dispatch = useDispatch()
  const post = useSelector(state => selectPostById(state, postId))

  const handleReaction = emojiStr => {
    dispatch(
      reactionAdded({
        postId: postId,
        emojiName: emojiStr,
      })
    )
  }

  return (
    <div className="flex mt-5 gap-3">
      {Object.entries(reactionEmoji).map(([emojiStr, emoji]) => (
        <button
          key={emojiStr}
          onClick={() => handleReaction(emojiStr)}
          className="btn btn-sm"
        >
          {emoji} {post.reactions[emojiStr]}
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
