import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialReactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialPosts = [
  {
    id: '0',
    title: 'Post 1',
    content: 'This is post 1',
    userId: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactions,
  },
  {
    id: '1',
    title: 'Post 2',
    content: 'This is post 2',
    userId: '0',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactions,
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingItem = state.find(e => e.id === id)

      if (existingItem) {
        existingItem.title = title
        existingItem.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, emojiName } = action.payload
      const post = state.find(e => e.id === postId)

      if (post) {
        post.reactions[emojiName]++
      }
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = state => state.posts
export const selectPostById = (state, id) => state.posts.find(e => e.id === id)
